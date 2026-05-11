from moviepy import VideoFileClip
from app.services.audio_service import extract_audio_text

def extract_video_text(video_path):

    audio_path = "temp_audio.mp3"

    video = VideoFileClip(video_path)

    video.audio.write_audiofile(audio_path)

    text = extract_audio_text(audio_path)

    return text