from distutils.command.upload import upload
from fastapi import FastAPI
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import base64
from io import BytesIO
import os
from PIL import Image
import uuid
import time
import json

from model import detector


upload_path = "./uploaded_images"


class ImageBase64(BaseModel):
    data: str


app = FastAPI()

origins = [
    "http://localhost:3000"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/api/v1/vietocr_predict")
def predict(image: ImageBase64):
    data = image.data
    img = Image.open(BytesIO(base64.b64decode(data)))
    if not os.path.exists(upload_path):
        os.makedirs(upload_path)

    img_id = uuid.uuid4()
    img.save(os.path.join(upload_path, f"{img_id}.png"))

    text = detector.predict(img)

    res = {
        "output": text
    }
    return JSONResponse(content=res)
