import requests

def ask_ai(question, context):

    prompt = f"""
    Answer the question using the provided context.

    Context:
    {context}

    Question:
    {question}
    """

    response = requests.post(
        "http://localhost:11434/api/generate",
        json={
            "model": "tinyllama",
            "prompt": prompt,
            "stream": False
        }
    )

    data = response.json()

    return data["response"]