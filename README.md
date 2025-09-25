# Agrico - AI Powered Rice Crop Diseases Detection

Agrico is an AI-powered web application designed to detect early rice crop diseases and provide effective treatment recommendations. This innovative solution helps farmers improve crop health and yield by leveraging deep learning models.

## 🌿 Features

- **🚀 AI-Powered Detection:** Achieves 89% accuracy using a CNN model for early disease identification.
- **💊 Treatment Recommendations:** Offers actionable insights for disease management.
- **📱 Fully Responsive:** Optimized for seamless usage across all devices.
- **📧 Contact Form:** A fully functional form to get in touch with us.
- **📰 Newsletter Subscription:** Stay informed with the latest agricultural updates.


## ⚙️ Installation and Setup

**Clone the Repository**:
   ```bash
   git clone https://github.com/Shahzad-Ali-44/Agrico.git
   ```



1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```


## Contact Form Configuration

The contact form uses SMTP to send emails directly. Configure your email settings:

1. **Update the `.env.local` File**:
   - Add the following entries to your `.env.local` file:
     ```env
     SMTP_HOST=smtp.gmail.com
     SMTP_PORT=587
     SMTP_SECURE=false
     SMTP_USER=your-email@gmail.com
     SMTP_PASS=your-app-password
     SMTP_FROM=your-email@gmail.com
     SMTP_TO=recipient@example.com
     NEXT_PUBLIC_API_URL=https://ShahzadAli44-Agrico-backend.hf.space/predict
     ```

2. **How It Works**:
   - The contact form uses SMTP to send messages directly to your email.
   - Professional email templates are automatically generated.

## 🛠 Technology Stack

- **Frontend:** Next.js
- **Backend:** FastAPI (Deployed)
- **Model:** Convolutional Neural Network (CNN) with 89% accuracy (Deployed)


## 🚀 Usage

1. Upload an image of the rice crop.
2. The AI model will analyze and detect potential diseases.
3. Receive treatment suggestions and actionable insights.


## 🤝 Contributing

Contributions are welcome! Feel free to fork the repository, make improvements, and submit a pull request.


## 📜 License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgments
- Dataset contributors for their valuable efforts.
- TensorFlow and Keras for their robust deep learning frameworks.
- Open-source community for tools and libraries enabling this work. 


*🌾 Agrico - Empowering Farmers with AI Technology.*

