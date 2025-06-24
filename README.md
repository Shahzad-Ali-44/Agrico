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

To enable the contact form functionality, follow these steps:

1. **Get an Access Key**:
   - Visit [Web3Forms](https://web3forms.com/) and sign up to get your free access key.

2. **Update the `.env.local` File**:
   - Add the following entry to your `.env.local` file:
     ```env
     NEXT_PUBLIC_AccessKey=your-access-key-here
     NEXT_PUBLIC_API_URL= https://ShahzadAli44-Agrico-backend.hf.space/predict

     ```

3. **How It Works**:
   - The contact form uses the Web3Forms API to send messages to the email address you configure in your Web3Forms account.
   - Ensure your application has internet access to communicate with the Web3Forms API.

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

