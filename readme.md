# DevTree Backend

DevTree is a backend service for a full-stack web application designed to allow developers to share their professional and personal links in one place, inspired by the functionalities of Linktree. This backend handles user authentication, link management, and media uploads.

---

## Features

### 1. **API for User Management**
- Handles user registration and authentication.
- Passwords are securely hashed using bcrypt.

### 2. **Link Management**
- Add, edit, or delete links for the user's profile.
- Generate user-friendly slugs for URLs.

### 3. **Media Management**
- Profile pictures and other media are uploaded and managed using Cloudinary.

---

## Technologies Used

- **Node.js** with **Express.js** for creating a robust and scalable server.
- **TypeScript** for type safety and improved developer experience.
- **Mongoose** for MongoDB object modeling.
- **JWT (jsonwebtoken)** for secure authentication and authorization.
- **Cloudinary** for handling media uploads like profile pictures.
- **bcrypt** for secure password hashing.
- **Express-Validator** for input validation.
- **Formidable** for parsing form data.
- **Slug** for generating user-friendly URLs.
- **UUID** for generating unique identifiers.

---

## Installation

### Prerequisites

- Node.js and npm installed.
- MongoDB instance (local or cloud-based).

### Setup

1. Clone the repository and navigate to the backend directory:
```bash
   git clone <repository-url>
   cd devtree
```

2. Install dependencies:
``` bash
Copiar código
npm install
```

3. Create a .env file in the root directory and configure the following variables:
```.env```

4. Copiar código
```
 PORT=5000
 MONGO_URI=<your-mongodb-uri>
 JWT_SECRET=<your-jwt-secret>
 CLOUDINARY_URL=<your-cloudinary-url>
```

5. Start the development server:
```
 npm run dev
```
6. Folder Structure
```
/devtree
├── src
│   ├── config
│   ├── handles
│   ├── middleware
│   └── models
│   ├── routes
│   └── utils
├── .env
├── package.json
└── tsconfig.json
``` 

7. Scripts

**npm run dev:** Start the development server with TypeScript.
**nodemon-dev:api:** Start the server with nodemon for live reload.
**npm run build:** Compile TypeScript files.

Contribution
- Contributions are welcome! Feel free to fork the repository and submit a pull request.

License
- This project is licensed under the ISC License.

Author
Jake Fernandez B

