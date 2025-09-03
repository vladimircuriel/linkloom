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

## Application

https://github.com/user-attachments/assets/701c0fa4-eb61-4af8-809f-43de3f253d9c

A more extensive showcase is available in [my portfolio](https://vladimircuriel.com/posts/1_linkloom/)!

## Tools Used

- ![Next.js](https://img.shields.io/badge/NextJS-000000?logo=next.js&logoColor=white&style=flat-square) **Next.js**: Framework for server-rendered React pages, routing, and APP routes powering both the frontend UI and backend logic.

- ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white&style=flat-square) **MongoDB**: NoSQL database for storing short-link records, user profiles, and raw click events with flexible schema.

- ![Mongoose](https://img.shields.io/badge/Mongoose-880000?logo=mongoose&logoColor=white&style=flat-square) **Mongoose**: ODM layer that defines schemas, validates data, and simplifies CRUD operations against MongoDB.

- ![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-38B2AC?logo=tailwind-css&logoColor=white&style=flat-square) **Tailwind CSS**: Utility-first CSS framework used to build a responsive, mobile-first interface for dashboards and forms.

- ![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black&style=flat-square) **React**: Core library for building interactive UI components in both the public site and the authenticated user workspace.

- ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white&style=flat-square) **TypeScript**: Superset of JavaScript adding static types to props, API responses, and database models for safer refactoring.

- ![ReCharts](https://img.shields.io/badge/ReCharts-D00000?logo=recharts&logoColor=white&style=flat-square) **ReCharts**: Charting library used to render click-through graphs, heatmaps, and time-series analytics in the user dashboard.

- ![Grafana](https://img.shields.io/badge/Grafana-F46800?logo=grafana&logoColor=white&style=flat-square) **Grafana**: Visualization platform for real-time system and application metrics collected via Prometheus.

- ![Loki](https://img.shields.io/badge/Loki-FFFFFF?logo=loki&logoColor=black&style=flat-square) **Loki**: Log aggregation system that centralizes application logs for debugging and audit trails.

- ![Prometheus](https://img.shields.io/badge/Prometheus-E6522C?logo=prometheus&logoColor=white&style=flat-square) **Prometheus**: Time-series database and scraper for collecting request counts, error rates, and resource usage metrics.

- ![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white&style=flat-square) **Docker**: Containerization of all services—Next.js app, MongoDB, Prometheus, Loki—for consistent environments and easy scaling.

- ![DigitalOcean](https://img.shields.io/badge/DigitalOcean-0080FF?logo=digitalocean&logoColor=white&style=flat-square) **DigitalOcean**: VPS hosting provider running Traefik and Docker containers, ensuring high availability and straightforward networking.

- ![Traefik](https://img.shields.io/badge/Traefik-0ED7B5?logo=traefik&logoColor=white&style=flat-square) **Traefik**: Dynamic reverse proxy and load balancer handling SSL termination, routing, and service discovery in the cluster.

- ![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?logo=github-actions&logoColor=white&style=flat-square) **GitHub Actions**: CI/CD pipelines automating build, test, Docker image publication, and deployment to DigitalOcean on every main-branch push.


## Installation

### Prerequisites

- **Docker**

### Steps

1. **Clone the repository**:

```bash
git clone https://github.com/vladimircuriel/linkloom
```

2. **Navigate to the project directory**:

```bash
cd linkloom
```
   
3. **Run the services**:

```bash
make build-development
```

```bash
make start-development
```

   
4. **Access the application**:

Open your browser and visit `http://localhost:3000` to access the user interface.

5. **ENV Variables**:

For local uses, there is already a .env.local

  ```dotenv
NEXT_SALT_ROUNDS=10               # Number of bcrypt hashing rounds for salting passwords
NEXT_MONGO_INITDB_ROOT_USERNAME=dev-admin    # MongoDB root user created on container init
NEXT_MONGO_INITDB_ROOT_PASSWORD=dev-password # Password for the MongoDB root user
NEXT_MONGO_INITDB_DATABASE=dev-linkloom-db   # Default database name for Linkloom data
NEXT_MONGO_DB_URI=mongodb://dev-admin:dev-password@db:27017/dev-linkloom-db?authSource=admin  # Connection URI with credentials, host, port, and auth source
NEXT_JWT_SECRET=zgI4sCmHU5ticRe9ecLJst0EYzIjewEVHJ3xPwQ/5Kg=  # Secret key used to sign and verify JSON Web Tokens
NEXT_HOSTNAME=http://localhost:3000  # Base URL of the Next.js application for callbacks and links
NEXT_URL_LENGTH=6                    # Number of characters for each generated short code
NEXT_URL_PREFIX=                     # Optional URL prefix (e.g. "link-NEXT_URL_LENGTH") (e.g. link-f74bgk will be a shorten url id)
NEXT_LINK_PREVIEW_API_KEY=05d9efb2d8438aa1962c67890a75f8b6  # API key for LinkPreview service to fetch link metadata
NEXT_ADMIN_EMAIL=admin@linkloom.com  # Email of the default administrator account
NEXT_ADMIN_PASSWORD=linkloom123!     # Password for the default administrator account
NODE_ENV=production                  # Node.js environment mode (production optimizations)
NEXT_PINO_HOST=http://loki:3100      # Loki endpoint for shipping Pino logs
NEXT_PINO_BATCHING=true              # Enable batching of log entries before sending
NEXT_PINO_INTERVAL=10                # Seconds between each batched log flush
NEXT_PINO_LABEL=linkloom             # Label used in Loki/Grafana to identify this app’s logs
NEXT_TELEMETRY_DISABLED=1            # Disable any built-in telemetry or analytics collection
  ```

## Areas for Improvement

- The application only allows URL shortening for registered users; anonymous users cannot create short links.  
- There is no option to customize the alias of a shortened URL—you must use the system-generated code.  
- Once a short link is created, it cannot be deleted and will remain in the database indefinitely.  
- Shortened URLs cannot be edited after creation; any changes require generating a new link.  
- The application validates URL format but does not check for malicious content, so users should avoid shortening links to potentially harmful sites.  
