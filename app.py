import asyncio
import os
import base64
import time
from datetime import datetime
from fastapi import FastAPI, Request, HTTPException
from fastapi.responses import HTMLResponse, JSONResponse
from pydantic import BaseModel
import uvicorn
import logging

# IA Evolutiva Antigravity Hub
logging.basicConfig(level=logging.INFO, format='[ANTIGRAVITY-AI] %(asctime)s | %(message)s')
logger = logging.getLogger("Antigravity")

app = FastAPI(title="Antigravity Evolutive AI")

# Configuração de Armazenamento
DATASET_DIR = "dataset"
if not os.path.exists(DATASET_DIR):
    os.makedirs(DATASET_DIR)

class TrainingExample(BaseModel):
    label: str
    image_data: str # Base64 string

class WebhookData(BaseModel):
    label: str
    confidence: float

# --- Rotas do Servidor ---

@app.get("/", response_class=HTMLResponse)
async def serve_frontend():
    with open("index.html", "r", encoding="utf-8") as f:
        return f.read()

@app.post("/webhook")
async def handle_webhook(data: WebhookData):
    """Monitoramento de Reconhecimento em Tempo Real"""
    logger.info(f"IA DETECTOU: {data.label} ({data.confidence:.2%})")
    return {"status": "ok", "recognized": data.label}

@app.post("/save-example")
async def save_example(example: TrainingExample):
    """
    Sistema de Memória Antigravity: 
    Salva imagens capturadas pelo usuário para compor o dataset de retreinamento.
    """
    try:
        # Sanitizar nome da pasta
        category_name = example.label.strip().replace(" ", "_").lower()
        category_path = os.path.join(DATASET_DIR, category_name)
        
        if not os.path.exists(category_path):
            os.makedirs(category_path)
            logger.info(f"Nova categoria criada: {category_name}")

        # Decodificar e salvar imagem
        header, encoded = example.image_data.split(",", 1)
        data = base64.b64decode(encoded)
        
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S_%f")
        filename = f"{timestamp}.png"
        filepath = os.path.join(category_path, filename)
        
        with open(filepath, "wb") as f:
            f.write(data)
            
        logger.info(f"Exemplo salvo em {category_name}: {filename}")
        return {"status": "success", "message": f"Imagem salva em '{category_name}'"}
    
    except Exception as e:
        logger.error(f"Erro ao salvar exemplo: {e}")
        raise HTTPException(status_code=500, detail="Falha ao processar imagem")

@app.get("/status")
async def get_status():
    """Retorna o estado atual do conhecimento da IA"""
    stats = {}
    if os.path.exists(DATASET_DIR):
        for category in os.listdir(DATASET_DIR):
            cat_path = os.path.join(DATASET_DIR, category)
            if os.path.isdir(cat_path):
                stats[category] = len(os.listdir(cat_path))
    
    return {
        "total_categories": len(stats),
        "dataset_stats": stats,
        "engine": "Antigravity Evolutive Core"
    }

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
