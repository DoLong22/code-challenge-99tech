# 📚 **User API with Express.js, TypeScript, PostgreSQL**

This project is a **backend service** built using **Express.js** and **TypeScript**, featuring a **PostgreSQL database**, **centralized logging with request tracing**, **Swagger documentation**, and **Dockerized deployment**.

---

## 🚀 **1. Project Overview**

### 🛠️ **Tech Stack**

- **Express.js**: Backend framework for building APIs.
- **TypeScript**: Strongly typed JavaScript.
- **TypeORM**: ORM for database interactions.
- **PostgreSQL**: Relational database.
- **class-validator**: Validation library for DTOs.
- **AsyncLocalStorage**: Request-specific storage context.
- **Custom Logger**: Console-based logger with `requestId` tracing.
- **Swagger**: API documentation.
- **Docker & Docker Compose**: Containerization and deployment.

---

## ⚙️ **2. Environment Configuration**

Copy the `.env.example` file to create your `.env` file:

```bash
cp .env.example .env
```

### **2.1 .env.example Template**

```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=problem5_db
DB_USER=user_problem5
DB_PASSWORD=password_problem5
```

**Environment Variables Explained:**

- `PORT`: The port where the backend server will run.
- `DB_HOST`: The PostgreSQL database host.
- `DB_PORT`: The PostgreSQL database port.
- `DB_NAME`: The PostgreSQL database name.
- `DB_USER`: The PostgreSQL database user.
- `DB_PASSWORD`: The PostgreSQL database password.

---

## 🐳 **3. Run the Application with Docker Compose**

Make sure **Docker** and **Docker Compose** are installed on your system.

### **3.1 Build and Start Containers**

```bash
docker-compose up --build
```

### **3.2 Verify Running Containers**

```bash
docker-compose ps
```

### **3.3 Access the Application**

- **API Endpoint:** [http://localhost:3000](http://localhost:3000)
- **Swagger Documentation:** [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

### **3.4 Stop Containers**

```bash
docker-compose down
```

---

## 💻 **4. Run Locally (Without Docker)**

### **4.1 Install Dependencies**

```bash
npm install
```

### **4.2 Setup PostgreSQL**

Ensure a PostgreSQL database is running locally and update your `.env` file with the correct database settings.

### **4.3 Start the Application**

```bash
npm run dev
```

### **4.4 Access the Application**

- **API Endpoint:** [http://localhost:3000](http://localhost:3000)
- **Swagger Documentation:** [http://localhost:3000/api-docs](http://localhost:3000/api-docs)
