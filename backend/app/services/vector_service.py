from sentence_transformers import SentenceTransformer
import faiss
import numpy as np

model = SentenceTransformer("all-MiniLM-L6-v2")

index = faiss.IndexFlatL2(384)

documents = []

def add_text(text):

    embedding = model.encode([text])

    index.add(np.array(embedding).astype("float32"))

    documents.append(text)

def search_text(query):

    query_vector = model.encode([query])

    D, I = index.search(
        np.array(query_vector).astype("float32"),
        k=3
    )

    results = []

    for i in I[0]:
        if i < len(documents):
            results.append(documents[i])

    return results
    