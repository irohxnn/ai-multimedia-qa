from fastapi import APIRouter
from pydantic import BaseModel

from app.services.vector_service import search_text
from app.services.ai_service import ask_ai

router = APIRouter()

class ChatRequest(BaseModel):
    question: str

@router.post("/chat")
def chat(req: ChatRequest):

    results = search_text(req.question)

    context = "\n".join(results)

    answer = ask_ai(req.question, context)

    return {
        "question": req.question,
        "answer": answer,
        "context": results
    }