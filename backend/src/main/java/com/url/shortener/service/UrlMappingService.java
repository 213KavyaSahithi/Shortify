package com.url.shortener.service;

import com.url.shortener.dtos.ClickEventDTO;
import com.url.shortener.dtos.UrlMappingDTO;
import com.url.shortener.models.ClickEvent;
import com.url.shortener.models.UrlMapping;
import com.url.shortener.models.User;
import com.url.shortener.repository.ClickEventRepository;
import com.url.shortener.repository.UrlMappingRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class UrlMappingService {

    private UrlMappingRepository urlMappingRepository;
    private ClickEventRepository clickEventRepository;
    
    // In-memory cache to track recent clicks and prevent duplicates
    private final Map<String, Long> recentClicksMap = new ConcurrentHashMap<>();
    private static final long DUPLICATE_WINDOW_MS = 1500; // 1.5 seconds

    public UrlMappingDTO createShortUrl(String originalUrl, User user) {
        String shortUrl = generateShortUrl();
        UrlMapping urlMapping = new UrlMapping();
        urlMapping.setOriginalUrl(originalUrl);
        urlMapping.setShortUrl(shortUrl);
        urlMapping.setUser(user);
        urlMapping.setCreatedDate(LocalDateTime.now());
        UrlMapping savedUrlMapping = urlMappingRepository.save(urlMapping);
        return convertToDto(savedUrlMapping);
    }

    private UrlMappingDTO convertToDto(UrlMapping urlMapping){
        UrlMappingDTO urlMappingDTO = new UrlMappingDTO();
        urlMappingDTO.setId(urlMapping.getId());
        urlMappingDTO.setOriginalUrl(urlMapping.getOriginalUrl());
        urlMappingDTO.setShortUrl(urlMapping.getShortUrl());
        urlMappingDTO.setClickCount(urlMapping.getClickCount());
        urlMappingDTO.setCreatedDate(urlMapping.getCreatedDate());
        urlMappingDTO.setUsername(urlMapping.getUser().getUsername());
        return urlMappingDTO;
    }

    private String generateShortUrl() {
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        Random random = new Random();
        StringBuilder shortUrl = new StringBuilder(8);

        for (int i = 0; i < 8; i++) {
            shortUrl.append(characters.charAt(random.nextInt(characters.length())));
        }
        return shortUrl.toString();
    }

    public List<UrlMappingDTO> getUrlsByUser(User user) {
        return urlMappingRepository.findByUser(user).stream()
                .map(this::convertToDto)
                .toList();
    }

    public List<ClickEventDTO> getClickEventsByDate(String shortUrl, LocalDateTime start, LocalDateTime end) {
        UrlMapping urlMapping = urlMappingRepository.findByShortUrl(shortUrl);
        if (urlMapping != null) {
            List<ClickEvent> clickEvents = clickEventRepository.findByUrlMappingAndClickDateBetween(urlMapping, start, end);
            System.out.println("ShortUrl: " + shortUrl + ", Start: " + start + ", End: " + end);
            System.out.println("Found click events: " + clickEvents.size());
            
            return clickEvents.stream()
                    .collect(Collectors.groupingBy(click -> click.getClickDate().toLocalDate(), Collectors.counting()))
                    .entrySet().stream()
                    .sorted((a, b) -> a.getKey().compareTo(b.getKey()))
                    .map(entry -> {
                        ClickEventDTO clickEventDTO = new ClickEventDTO();
                        clickEventDTO.setClickDate(entry.getKey());
                        clickEventDTO.setCount(entry.getValue());
                        return clickEventDTO;
                    })
                    .collect(Collectors.toList());
        }
        System.out.println("UrlMapping not found for short URL: " + shortUrl);
        return new ArrayList<>();
    }

    public Map<LocalDate, Long> getTotalClicksByUserAndDate(User user, LocalDate start, LocalDate end) {
        List<UrlMapping> urlMappings = urlMappingRepository.findByUser(user);
        List<ClickEvent> clickEvents = clickEventRepository.findByUrlMappingInAndClickDateBetween(urlMappings, start.atStartOfDay(), end.plusDays(1).atStartOfDay());

        // Group per day and keep order for front-end chart
        Map<LocalDate, Long> grouped = clickEvents.stream()
                .collect(Collectors.groupingBy(click -> click.getClickDate().toLocalDate(), TreeMap::new, Collectors.counting()));

        Map<LocalDate, Long> result = new LinkedHashMap<>();
        LocalDate day = start;
        while (!day.isAfter(end)) {
            result.put(day, grouped.getOrDefault(day, 0L));
            day = day.plusDays(1);
        }

        System.out.println("TotalClicksByDate for user='" + user.getUsername() + "' from " + start + " to " + end + " -> " + result);
        return result;
    }

    public UrlMapping getOriginalUrl(String shortUrl) {
        System.out.println(">>> REDIRECT REQUEST RECEIVED for: " + shortUrl + " at " + System.currentTimeMillis());
        
        UrlMapping urlMapping = urlMappingRepository.findByShortUrl(shortUrl);
        if (urlMapping != null) {
            // Synchronized block to ensure atomic click recording
            synchronized (this) {
                long currentTime = System.currentTimeMillis();
                long lastClickTime = recentClicksMap.getOrDefault(shortUrl, 0L);
                long timeSinceLastClick = currentTime - lastClickTime;
                
                System.out.println("   Current time: " + currentTime);
                System.out.println("   Last click time: " + lastClickTime);
                System.out.println("   Time since last: " + timeSinceLastClick + "ms");
                System.out.println("   Threshold: " + DUPLICATE_WINDOW_MS + "ms");
                
                // Only record a click if enough time has passed (prevents duplicate requests)
                if (timeSinceLastClick > DUPLICATE_WINDOW_MS) {
                    System.out.println("   ✓ RECORDING CLICK");
                    
                    urlMapping.setClickCount(urlMapping.getClickCount() + 1);
                    urlMappingRepository.save(urlMapping);

                    // Record Click Event
                    ClickEvent clickEvent = new ClickEvent();
                    clickEvent.setClickDate(LocalDateTime.now());
                    clickEvent.setUrlMapping(urlMapping);
                    clickEventRepository.save(clickEvent);
                    
                    // Update the recent clicks map
                    recentClicksMap.put(shortUrl, currentTime);
                    
                    System.out.println("✓ Click RECORDED for: " + shortUrl);
                } else {
                    System.out.println("   ✗ IGNORING DUPLICATE");
                    System.out.println("✗ Click IGNORED (duplicate) for: " + shortUrl);
                }
            }
        } else {
            System.out.println("⚠ URL Mapping not found: " + shortUrl);
        }

        return urlMapping;
    }
}
