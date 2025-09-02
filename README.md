<h1 align="center">
   LinkLoom - Url Shotener
</h1>

<p align="center"> 
  <img src="https://github.com/user-attachments/assets/d0211d9c-afa6-4963-93c7-89727ea06bb9" alt="Linkloom" width="400"/> 
</p>

<div align="center">  
  <img src="https://img.shields.io/badge/NextJS-444?style=for-the-badge&logo=next.js&logoColor=white" />  
  <img src="https://img.shields.io/badge/MongoDB-2e4e35?style=for-the-badge&logo=mongodb&logoColor=47A248" />  
  <img src="https://img.shields.io/badge/Mongoose-552222?style=for-the-badge&logo=mongoose&logoColor=ff6a6a" />  
  <img src="https://img.shields.io/badge/TailwindCSS-355c5b?style=for-the-badge&logo=tailwind-css&logoColor=38B2AC" />  
  <img src="https://img.shields.io/badge/React-34495e?style=for-the-badge&logo=react&logoColor=61DAFB" />  
  <img src="https://img.shields.io/badge/TypeScript-2c3e50?style=for-the-badge&logo=typescript&logoColor=3178C6" />  
  <img src="https://img.shields.io/badge/ReCharts-4a1c1c?style=for-the-badge&logo=recharts&logoColor=D00000" />  
  <img src="https://img.shields.io/badge/Grafana-3d2a1f?style=for-the-badge&logo=grafana&logoColor=F46800" />  
  <img src="https://img.shields.io/badge/Loki-555?style=for-the-badge&logo=loki&logoColor=999" />  
  <img src="https://img.shields.io/badge/Prometheus-3d1c15?style=for-the-badge&logo=prometheus&logoColor=E6522C" />  
  <img src="https://img.shields.io/badge/Docker-1b3c52?style=for-the-badge&logo=docker&logoColor=2496ED" />  
  <img src="https://img.shields.io/badge/DigitalOcean-1a2c40?style=for-the-badge&logo=digitalocean&logoColor=0080FF" />  
  <img src="https://img.shields.io/badge/Traefik-204b44?style=for-the-badge&logo=traefik&logoColor=0ED7B5" />  
  <img src="https://img.shields.io/badge/GitHub_Actions-1b2d50?style=for-the-badge&logo=github-actions&logoColor=2088FF" />  
</div>  

---

**Linkloom** is a web application for shortening URLs, generating QR codes, and collecting detailed usage statistics. Users can register, log in, and create their own shortened links, while administrators have access to a powerful dashboard to oversee all user activity, deactivate malicious URLs, and monitor system metrics.

## Table of Contents

- [Features](#features)
- [Application](#application)
- [Tools Used](#tools-used)
- [Installation](#installation)
- [Areas for Improvement](#areas-for-improvement)
- [Contributors](#contributors)
- [License](#license)
- [Contact me](#contact-me)

## Features

- **URL Shortening**: Uses Next.js App routes backed stores each original URL in **MongoDB** via **Mongoose**.

- **QR Code Generation**: When a new short link is created, the Fronted frontend (styled with **TailwindCSS**) calls a QR API to render an SVG/PNG QR code, which users can download.

- **Visit Analytics**: Every redirect request hits a middleware that emits metrics to **Prometheus** (running in Docker). Detailed logs are shipped to **Loki**, and **Grafana** dashboards visualize real-time stats. Raw click records are also stored in MongoDB and rendered in the user dashboard with **ReCharts**.

- **User Registration & Authentication**: Managed by jose using JSON Web Tokens (JWT). User credentials and profiles persist in MongoDB, and session validation occurs server-side in Next.js.

- **Short Link Management**: In their private workspace, users interact with a React/TailwindUI table that supports listing, searching, filtering, and cursor-based pagination.

- **Tech Stack & Infrastructure**  
  - **Frontend:** Next.js, React, TailwindCSS, TypeScript  
  - **Database:** MongoDB (Mongoose), Redis cache  
  - **Metrics & Logging:** Prometheus, Grafana, Loki  
  - **Charts:** ReCharts  
  - **Containerization & Routing:** Docker, Traefik (with Let’s Encrypt) on a DigitalOcean VPS  
  - **CI/CD:** GitHub Actions (build → push Docker Hub → deploy)  
