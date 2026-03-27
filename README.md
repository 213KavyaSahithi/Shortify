# Shortify (URL Shortener)

A full-stack URL shortening web application built with Spring Boot (Java) backend and React + Vite frontend.

## 🚀 Features

- User registration and login (JWT authentication)
- Create shortened URLs
- Redirect short URLs to full original URL
- Click tracking and analytics per date
- Dashboard with link list, click count, and graphs
- Duplicate click protection (server-side dedupe)
- Role-based security using Spring Security

## 📁 Project Structure

- `backend/` - Spring Boot service with REST API
  - Java 21, Spring Boot, Spring Security, Spring Data JPA, MySQL
- `frontend/` - React app using Vite
  - React, Tailwind styles, React Router, react-query, chart.js

## 🛠️ Prerequisites

- Java 21+
- Maven
- Node.js 18+
- MySQL

## 📦 Clone this repo

```bash
git clone https://github.com/213KavyaSahithi/Shortify.git
cd url-shortener-spring
```

Then follow backend and frontend setup below.

## ⚙️ Backend Setup

1. Configure your MySQL database and URL in `backend/src/main/resources/application.properties`:
```properties
spring.datasource.url={database_link}
spring.datasource.username={database_username}
spring.datasource.password={database_password}
```
2. Start the backend:
```bash
cd backend
./mvnw.cmd spring-boot:run
```

## ⚙️ Frontend Setup

1. Configure backend URL in `frontend/.env`:
```env
VITE_BACKEND_URL=http://localhost:8080
VITE_REACT_FRONT_END_URL=http://localhost:5173
```
2. Install and run:
```bash
cd frontend
npm install
npm run dev
```

## 🧪 Test APIs

Use Postman, Insomnia, or curl:

- Register: `POST /api/auth/public/register`
- Login: `POST /api/auth/public/login`
- Create short URL: `POST /api/urls/shorten` (Bearer token)
- Get URLs: `GET /api/urls/myurls` (Bearer token)
- Analytics: `GET /api/urls/analytics/{shortUrl}?startDate=yyyy-MM-dd'T'HH:mm:ss&endDate=...` (Bearer token)
- Total clicks: `GET /api/urls/totalClicks?startDate=yyyy-MM-dd&endDate=yyyy-MM-dd` (Bearer token)

## 🧾 Notes

- Most styles are in `frontend/tailwind.config.js` and `frontend/src/index.css`.
- Duplicate click detection in `backend/src/main/java/com/url/shortener/service/UrlMappingService.java`.




