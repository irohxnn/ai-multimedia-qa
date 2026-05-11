import whisper

model = whisper.load_model("base")

def extract_audio_text(audio_path):

    result = model.transcribe(audio_path)

    return result["text"]