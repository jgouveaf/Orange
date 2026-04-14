import asyncio
import time
from fastapi import FastAPI, Request, HTTPException
from fastapi.responses import HTMLResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
import uvicorn
import logging

# Configuração do Sistema Antigravity
logging.basicConfig(level=logging.INFO, format='[ANTIGRAVITY-HUB] %(asctime)s | %(message)s')
logger = logging.getLogger("Antigravity")

app = FastAPI(title="Antigravity System Hub")

# Estado Interno para Lógica de Debounce
class SystemState:
    last_trigger_time = 0
    cooldown_seconds = 3  # Evita disparos múltiplos em menos de 3 segundos
    event_count = 0

state = SystemState()

class WebhookData(BaseModel):
    label: str
    confidence: float

# --- Rotas do Servidor ---

@app.get("/", response_class=HTMLResponse)
async def serve_frontend():
    """Serve a interface de controle do usuário"""
    try:
        with open("index.html", "r", encoding="utf-8") as f:
            return f.read()
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="Interface não encontrada")

@app.post("/webhook")
async def handle_webhook(data: WebhookData):
    """
    Endpoint principal do Antigravity para recebimento de eventos de visão.
    Implementa processamento assíncrono e controle de fluxo.
    """
    current_time = time.time()
    
    # Lógica de Debounce (Arquitetura Distribuída)
    if current_time - state.last_trigger_time < state.cooldown_seconds:
        return JSONResponse(
            status_code=200, 
            content={"status": "throttled", "message": "Aguardando resfriamento do sistema"}
        )

    # Registro do Evento no Núcleo
    state.last_trigger_time = current_time
    state.event_count += 1
    
    logger.info(f"CAPTURA DETECTADA: {data.label} | Confiança: {data.confidence:.2%}")
    
    # Processamento em Background (Simulação de Hardware/Automação)
    asyncio.create_task(run_automation_protocol(data.label))

    return {
        "status": "triggered",
        "action": data.label,
        "event_id": state.event_count,
        "timestamp": current_time
    }

async def run_automation_protocol(action: str):
    """Protocolo de Automação Antigravity (Simulação de Hardware)"""
    logger.info(f"Executando Protocolo de Automação para: {action}...")
    await asyncio.sleep(1.5) # Simula latência de resposta do dispositivo
    logger.info(f"AUTOMAÇÃO CONCLUÍDA: Dispositivo '{action}' acionado com sucesso.")

@app.get("/health")
async def health():
    return {"status": "online", "engine": "Antigravity-Python-Core"}

if __name__ == "__main__":
    # Rodar o servidor Antigravity
    logger.info("Iniciando Hub de Controle Antigravity em http://localhost:8000")
    uvicorn.run(app, host="0.0.0.0", port=8000)
