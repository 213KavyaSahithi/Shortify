import { useQuery } from "react-query"
import api from "../api/api"


export const useFetchMyShortUrls = (token, onError) => {
    return useQuery("my-shortenurls",
         async () => {
            return await api.get(
                "/api/urls/myurls",
            {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: "Bearer " + token,
                },
            }
        );
    },
          {
            select: (data) => {
                const sortedData = data.data.sort(
                    (a, b) => new Date(b.createdDate) - new Date(a.createdDate)
                );
                return sortedData;
            },
            onError,
            staleTime: 5000
          }
        );
};

export const useFetchTotalClicks = (token, onError) => {
    // Generate dynamic date range - last 30 days to ensure we capture recent data
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to midnight
    const thirtyDaysAgo = new Date(today);
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const formatDate = (date) => date.toISOString().split('T')[0]; // YYYY-MM-DD format
    
    const startDate = formatDate(thirtyDaysAgo);
    const endDate = formatDate(today);
    
    return useQuery("url-totalclick",
         async () => {
            const response = await api.get(
                `/api/urls/totalClicks?startDate=${startDate}&endDate=${endDate}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: "Bearer " + token,
                },
            }
        );
        console.log("Total Clicks Response:", response.data);
        return response;
    },
          {
            select: (data) => {
                // Handle both empty {} and null responses
                if (!data.data || Object.keys(data.data).length === 0) {
                    console.log("No click data found");
                    return [];
                }

                const responseData = data.data;
                const allKeys = Object.keys(responseData).sort();

                // Build a date range from first key to last key to ensure gaps are shown
                const start = new Date(allKeys[0]);
                const end = new Date(allKeys[allKeys.length - 1]);

                const days = [];
                for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
                    const iso = d.toISOString().split("T")[0];
                    days.push(iso);
                }

                const convertToArray = days.map((key) => ({
                    clickDate: key,
                    count: responseData[key] ? responseData[key] : 0,
                }));

                console.log("Converted Click Data:", convertToArray);
                return convertToArray;
            },
            onError,
            staleTime: 5000
          }
        );
};