import asyncio
import logging
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn

# Configuração de Logging com Identidade Antigravity
logging.basicConfig(level=logging.INFO, format='[ANTIGRAVITY-CORE] %(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

app = FastAPI(title="Antigravity Distributed Control")

# Habilitar CORS para o frontend estático
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class TMClassification(BaseModel):
    label: str
    confidence: float

# Processamento Assíncrono Desacoplado
async def execute_hardware_logic(label: str):
    """
    Simula o acionamento de hardware (relé/IoT) de forma assíncrona.
    Escalonável via padrão de micro-serviços.
    """
    logger.info(f"Iniciando Task de Hardware para classe: {label}")
    
    # Simulação de latência de rede/hardware
    await asyncio.sleep(1) 
    
    if label == "OK":
        logger.info("Comando de Ativação Recebido - Executando PROTOCOLO OK")
    elif label == "Alerta":
        logger.warning("ALERTA DETECTADO - Acionando sistema de segurança")
    
    return True

@app.post("/events/classify")
async def handle_classification(data: TMClassification):
    logger.info(f"Evento recebido: {data.label} ({data.confidence:.2f})")
    
    if data.confidence > 0.85:
        # Dispara a lógica de hardware em background (Totalmente desacoplado)
        asyncio.create_task(execute_hardware_logic(data.label))
        return {"status": "success", "message": f"Comando '{data.label}' em processamento"}
    
    return {"status": "ignored", "message": "Confiança insuficiente"}

@app.get("/health")
async def health_check():
    return {"status": "online", "framework": "Antigravity-Python"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
