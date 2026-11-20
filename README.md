[README(1).md](https://github.com/user-attachments/files/35160625/README.1.md)
# CF10 Backend

A REST API for user, role and authentication management, built with **Node.js**, **Express 5**, **TypeScript** and **MongoDB (Mongoose)**. It supports username/password login with JWT, Google ID-token login, role-based access control, request validation with Zod, and auto-generated Swagger/OpenAPI documentation.

## Features

- User CRUD with bcrypt-hashed passwords
- Role management (CRUD)
- JWT authentication (1 hour expiry)
- Google Sign-In (ID token verification)
- Admin-only access to user create/update/delete endpoints
- Request validation with [Zod](https://zod.dev)
- Interactive API docs with Swagger UI
- Integration tests with Jest and Supertest

## Tech Stack

| Area            | Technology                                   |
| --------------- | -------------------------------------------- |
| Runtime         | Node.js, TypeScript                          |
| Framework       | Express 5                                    |
| Database        | MongoDB with Mongoose                        |
| Auth            | jsonwebtoken, bcrypt, google-auth-library    |
| Validation      | Zod                                          |
| API docs        | swagger-jsdoc, swagger-ui-express, mongoose-to-swagger |
| Testing         | Jest, ts-jest, Supertest, mongodb-memory-server |
| Dev tooling     | tsx                                          |

## Project Structure

```
src/
├── app.ts            # Express app setup and route mounting
├── server.ts         # Entry point: connects to DB and starts the server
├── swagger.ts        # OpenAPI/Swagger configuration
├── controllers/      # HTTP request handlers
├── services/         # Business logic
├── dao/              # Data access layer
├── models/           # Mongoose schemas (User, Role)
├── dto/              # Data transfer object types
├── validators/       # Zod schemas
├── middlewares/      # Auth, admin role, validation, email middlewares
├── routes/           # Route definitions (with OpenAPI annotations)
├── utils/            # DB connection, Google token verification
└── tests/            # Jest integration tests and test setup
```

## Getting Started

### Prerequisites

- Node.js `26.13.0` and npm `11.20.0` (see `engines` in `package.json`)
- A running MongoDB instance (local or MongoDB Atlas)
- A Google OAuth client ID (only if you use Google login)

### Installation

```bash
git clone https://github.com/lyritzis286/cf10-backend.git
cd cf10-backend
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```env
MONGO_URI=mongodb://localhost:27017/codingfactory
JWT_SECRET=change-me-to-a-long-random-string
SALT_ROUNDS=10
GOOGLE_CLIENT_ID=your-google-oauth-client-id
```

| Variable           | Description                                         |
| ------------------ | --------------------------------------------------- |
| `MONGO_URI`        | MongoDB connection string                           |
| `JWT_SECRET`       | Secret used to sign and verify JWTs                 |
| `SALT_ROUNDS`      | bcrypt salt rounds (defaults to `5`)                |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID used to verify ID tokens     |

> Never commit your `.env` file. It is already listed in `.gitignore`.

### Running the Server

```bash
# Development (auto-reload)
npm run dev

# Production
npm run build
npm start
```

The server listens on **http://localhost:3003**.

## API Documentation

Swagger UI is available at:

```
http://localhost:3003/api/docs
```

## API Overview

Base path: `/api`

### Auth — `/api/auth`

| Method | Endpoint       | Description                                  |
| ------ | -------------- | -------------------------------------------- |
| POST   | `/login`       | Log in with `username` and `password`; returns a JWT |
| POST   | `/google-auth` | Log in with a Google ID token; returns a JWT |

### Users — `/api/users`

| Method | Endpoint            | Auth          | Description            |
| ------ | ------------------- | ------------- | ---------------------- |
| GET    | `/`                 | —             | List all users         |
| GET    | `/email/:email`     | —             | Get a user by email    |
| POST   | `/`                 | JWT + ADMIN   | Create a user          |
| PUT    | `/:username`        | JWT + ADMIN   | Update a user          |
| DELETE | `/:username`        | JWT + ADMIN   | Delete a user          |

### Roles — `/api/roles`

| Method | Endpoint        | Description          |
| ------ | --------------- | -------------------- |
| GET    | `/`             | List all roles       |
| GET    | `/role/:role`   | Get a role by name   |
| POST   | `/`             | Create a role        |
| PUT    | `/:role`        | Update a role        |
| DELETE | `/:role`        | Delete a role        |

### Authentication

Protected endpoints require a JWT in the `Authorization` header:

```
Authorization: Bearer <token>
```

Admin-only endpoints additionally require the token to contain an active role named `ADMIN`.

## Data Models

**User**: `username` (unique, 6–20 chars, lowercase), `password` (hashed), `firstname`, `lastname`, `email`, `address` (`area`, `street`, `number`, `po`, `municipality`), `phone[]` (`type`, `number`), `roles[]` (references to Role), plus timestamps.

**Role**: `role` (unique name, e.g. `ADMIN`), `description`, `active`, plus timestamps.

## Testing

```bash
npm test
```

Tests live in `src/tests/` and run with Jest (`--runInBand`). Note that the current test setup connects to the database defined by `MONGO_URI` in your `.env`, so use a dedicated test database rather than production data.

## License

ISC
