from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import numpy as np
from io import BytesIO
from PIL import Image
import tensorflow as tf
import logging


logging.basicConfig(level=logging.DEBUG)

app = FastAPI()


origins = [
    "http://localhost:3000", 
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"],  # 
)


model_path = "rice_cnn_model.keras"


try:
    MODEL = tf.keras.models.load_model(model_path)
    logging.info("Model loaded successfully.")
except Exception as e:
    logging.error(f"Error loading model: {e}")
    MODEL = None

CLASS_NAMES = [
    "bacterial_leaf_blight", "brown_spot", "healthy", "leaf_blast",
    "leaf_scald", "narrow_brown_spot", "rice_hispa", "sheath_blight", "tungro"
]

DISEASE_DETAILS = {
    "bacterial_leaf_blight": {
        "symptoms": "Water-soaked lesions that enlarge and form blighted areas.",
        "treatment": "Use resistant rice varieties and apply copper-based fungicides."
    },
    "brown_spot": {
        "symptoms": "Small, round brown lesions on leaves.",
        "treatment": "Improve soil fertility with potassium and apply fungicides like Mancozeb."
    },
    "healthy": {
        "symptoms": "No visible disease symptoms, healthy rice leaves.",
        "treatment": "No treatment necessary. Ensure proper maintenance of rice field conditions."
    },
    "leaf_blast": {
        "symptoms": "Diamond-shaped lesions with white to gray centers.",
        "treatment": "Apply tricyclazole fungicides and maintain optimal water levels in the field."
    },
    "leaf_scald": {
        "symptoms": "Yellowish or brown lesions along leaf margins.",
        "treatment": "Use resistant varieties and avoid excessive nitrogen fertilizer."
    },
    "narrow_brown_spot": {
        "symptoms": "Narrow, dark brown streaks on leaves.",
        "treatment": "Apply fungicides like Propiconazole and reduce plant density."
    },
    "rice_hispa": {
        "symptoms": "Parallel feeding scars and windowpane-like holes in leaves caused by insect feeding.",
        "treatment": "Use insecticides like Chlorpyrifos and conduct field sanitation."
    },
    "sheath_blight": {
        "symptoms": "Oval-shaped lesions on leaf sheaths, often leading to wilting.",
        "treatment": "Apply fungicides like Azoxystrobin and ensure proper spacing between plants."
    },
    "tungro": {
        "symptoms": "Stunted growth, yellow-orange discoloration of leaves.",
        "treatment": "Use virus-free seedlings and control green leafhoppers with insecticides."
    }
}
def read_file_as_image(data) -> np.ndarray:
    try:
        image = Image.open(BytesIO(data)).convert("RGB")  
        logging.debug(f"Image size: {image.size}")
        return np.array(image)
    except Exception as e:
        logging.error("Error reading image file: %s", str(e))
        raise ValueError("Invalid image data")

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    if MODEL is None:
        return {"error": "Model is not loaded properly."}

    try:
        image_data = await file.read()
        image = read_file_as_image(image_data)
        img_batch = np.expand_dims(image, 0)

        logging.debug(f"Image batch shape: {img_batch.shape}")
        
      
        predictions = MODEL.predict(img_batch)
        logging.debug(f"Predictions: {predictions}")

        predicted_class = CLASS_NAMES[np.argmax(predictions[0])]
        confidence = np.max(predictions[0])
        
       
        disease_details = DISEASE_DETAILS.get(predicted_class, {})
        
        return {
            'class': predicted_class,
            'confidence': float(confidence),
            'symptoms': disease_details.get("symptoms", "No symptoms available."),
            'treatment': disease_details.get("treatment", "No treatment information available.")
        }
    except Exception as e:
        logging.error("Error during prediction: %s", str(e))
        return {"error": "An error occurred while processing the image."}

if __name__ == "__main__":
    uvicorn.run(app, host='localhost', port=8000)