from fastapi import APIRouter, UploadFile, File
import shutil
import os

from app.services.pdf_service import extract_pdf_text
from app.services.audio_service import extract_audio_text
from app.services.video_service import extract_video_text
from app.services.vector_service import add_text

router = APIRouter()

UPLOAD_DIR = "app/uploads"

os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/upload")
async def upload_file(file: UploadFile = File(...)):

    file_path = os.path.join(UPLOAD_DIR, file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    extracted_text = ""

    # PDF FILES
    if file.filename.endswith(".pdf"):

        extracted_text = extract_pdf_text(file_path)

        add_text(extracted_text)

    # AUDIO FILES
    elif (
        file.filename.endswith(".mp3")
        or file.filename.endswith(".wav")
    ):

        extracted_text = extract_audio_text(file_path)

        add_text(extracted_text)

    # VIDEO FILES
    elif (
        file.filename.endswith(".mp4")
        or file.filename.endswith(".mov")
    ):

        extracted_text = extract_video_text(file_path)

        add_text(extracted_text)

    else:

        return {
            "error": "Unsupported file type"
        }

    return {

        "filename": file.filename,

        "path": file_path,

        "message": "File uploaded and processed successfully",

        "preview_text": extracted_text[:1000]
    }