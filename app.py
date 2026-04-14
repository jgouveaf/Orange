import asyncio
import os
import base64
import random
from fastapi import FastAPI, HTTPException
from fastapi.responses import HTMLResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn
import logging

# Antigravity Math Vision Core
logging.basicConfig(level=logging.INFO, format='[MATH-AI] %(asctime)s | %(message)s')
logger = logging.getLogger("MathAI")

app = FastAPI(title="Antigravity Math Solver")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class MathProblem(BaseModel):
    image_data: str # Base64

# --- Lógica de Resolução Simulada (Substituível por OCR Real) ---
def simulate_math_resolution(image_b64):
    """
    Aqui, em um sistema real, usaríamos bibliotecas como Pytesseract ou APIs de Vision.
    Para o teste, simulamos uma inteligência que detecta padrões matemáticos comuns.
    """
    # Lista de problemas exemplo para demonstrar a interface
    exemplos = [
        {
            "problem": "2x + 5 = 15",
            "steps": [
                "Subtraia 5 de ambos os lados: 2x = 10",
                "Divida ambos os lados por 2: x = 5"
            ],
            "answer": "x = 5"
        },
        {
            "problem": "∫ x² dx",
            "steps": [
                "Aplique a regra da potência: (x^(n+1))/(n+1)",
                "Adicione a constante de integração C"
            ],
            "answer": "(x³ / 3) + C"
        },
        {
            "problem": "√144 + 5²",
            "steps": [
                "Calcule a raiz quadrada de 144: 12",
                "Calcule o quadrado de 5: 25",
                "Some os resultados: 12 + 25 = 37"
            ],
            "answer": "37"
        }
    ]
    return random.choice(exemplos)

@app.get("/", response_class=HTMLResponse)
async def serve_frontend():
    with open("index.html", "r", encoding="utf-8") as f:
        return f.read()

@app.post("/solve")
async def solve_math(problem: MathProblem):
    """
    Endpoint de Inteligência Matemática.
    Recebe a imagem, 'lê' a conta e retorna a resolução passo a passo.
    """
    logger.info("Analisando imagem recebida...")
    
    try:
        # Simulando tempo de processamento da IA
        await asyncio.sleep(2) 
        
        resolution = simulate_math_resolution(problem.image_data)
        
        logger.info(f"Problema Resolvido: {resolution['answer']}")
        return {
            "status": "success",
            "data": resolution
        }
    except Exception as e:
        logger.error(f"Erro na análise: {e}")
        return {"status": "error", "message": "Não foi possível ler a conta. Tente uma imagem mais nítida."}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
