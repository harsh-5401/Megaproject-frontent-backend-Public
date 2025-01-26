# 📚 StudyNotion

Welcome to **StudyNotion**, your go-to platform for seamless online learning and course management. Whether you're an educator or a learner, StudyNotion offers a comprehensive suite of tools to enhance your educational experience.

## 📖 Table of Contents

- [✨ Features](#-features)
- [🚀 Quick Start](#-quick-start)
- [🔧 Environment Setup](#-environment-setup)
- [🤝 Contributing](#-contributing)
- [📜 License](#-license)
- [📬 Contact](#-contact)

## ✨ Features

- **User Authentication**: Secure sign-up, login, and password management using JWT.
- **Course Management**: Create, edit, and manage courses effortlessly.
- **Payment Integration**: Smooth payment processing with Razorpay.
- **Notifications**: Automated email alerts for enrollments and payments.
- **Profile Management**: User-friendly profile customization.
- **Progress Tracking**: Monitor and track course progress.

## 🚀 Quick Start

Get up and running with StudyNotion in a few simple steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/studynotion.git
   cd studynotion
   ```

2. **Install dependencies:**

   - **Client:**

     ```bash
     cd client
     npm install
     ```

   - **Server:**

     ```bash
     cd ../server
     npm install
     ```

3. **Run the application:**

   - **Client:**

     ```bash
     cd client
     npm start
     ```

     Access the client at `http://localhost:3000`.

   - **Server:**

     ```bash
     cd ../server
     npm start
     ```

     Access the server at `http://localhost:4000`.

## 🔧 Environment Setup

To configure the environment variables for both the client and server, follow these steps:

### Client

Create a `.env` file in the `client` directory with the following content:

plaintext
REACT_APP_BASE_URL=http://localhost:4000/api/v1

### Server

Create a `.env` file in the `server` directory with the following content:

```plaintext
PORT=4000
MONGODB_URL="your_mongodb_connection_string"
JWT_SECRET=your_jwt_secret
RAZORPAY_KEY=your_razorpay_key
RAZORPAY_SECRET=your_razorpay_secret
MAIL_HOST=smtp.gmail.com
MAIL_USER=your_email@gmail.com
MAIL_PASSWORD=your_email_app_password
CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
FOLDER_NAME=your_cloudinary_folder_name
```

> **Note:** Replace placeholder values with your actual credentials. Ensure sensitive information like API keys and secrets are kept secure and not shared publicly.

## 🤝 Contributing

We welcome contributions! To get started:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a pull request.

## 📜 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 📬 Contact

For questions or feedback, please reach out to:

- **Your Name**: [ece22135@iiitkalyani.ac.in](mailto:ece22135@iiitkalyani.ac.in)
- **Project Link**: [https://github.com/harsh-5401/studynotion](https://github.com/harsh-5401/studynotion-frontend-Backend-.git)

---

















