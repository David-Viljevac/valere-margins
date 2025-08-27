# Sports Complex Management System

Web application for managing sports complexes, classes, and user enrollments built with NestJS and Handlebars.

## Features

**Admin**: Manage sports, classes (CRUD)  
**Users**: Registration/Login, browse and join/leave classes, view personal enrollments  
**Security**: JWT authentication, role-based access, input validation

## Technology Stack

- **Backend**: NestJS, TypeScript, PostgreSQL, TypeORM, JWT
- **Frontend**: Handlebars, Vanilla JavaScript, CSS3
- **Features**: Input validation, Role-based auth

## Quick Start

1. **Setup**
   ```bash
   git clone <repository>
   cd sports-complex
   npm install
   ```

2. **Environment**
   ```env
   Look at .env.example file to check for env variables which you need to set.
   ```
   
3. **Database**
   ```bash
   Postgres database which can be installed in docker container
   docker pull postgres
   docker run --name my_postgres -e POSTGRES_DB=valere -e POSTGRES_USER=valere -e POSTGRESS_PASSWORD=password -p 5432:5432 -d postgres
   docker cp initial_dump.sql my_postgres:/initial_dump.sql
   docker exec -it my_postgres pg_restore -U valere -d valere /initial_dump.sql
   ```

4. **Run**
   ```bash
   npm run start:dev
   npm run start:debug
   ```

   Access: http://localhost:3000 

## Database Entities

- **User**: Accounts with admin/user roles
- **Sport**: Categories (Basketball, Tennis, etc.)  
- **Class**: Scheduled sessions with time slots
- **UserClass**: Enrollment junction table
- **Role**: Role of user (Admin, Member)

## API Authentication

- JWT tokens in HTTP-only cookies
- Admin routes require `@Roles(Role.ADMIN)`
