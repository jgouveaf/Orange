import asyncio
import os
import base64
import json
import re
from datetime import datetime
from fastapi import FastAPI, HTTPException
from fastapi.responses import HTMLResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn
import logging

logging.basicConfig(level=logging.INFO, format='[MATH-HUB] %(asctime)s | %(message)s')
logger = logging.getLogger("MathHub")

app = FastAPI(title="Antigravity Math Final Core")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

TRAINING_DIR = "dataset_treinamento"
LOG_FILE = "aprendizado_ia.json"
os.makedirs(TRAINING_DIR, exist_ok=True)

class LearnData(BaseModel):
    image_data: str
    ia_read: str
    user_corrected: str

def normalize(expr: str) -> str:
    e = expr.strip()
    e = e.replace("¹", "**1").replace("²", "**2").replace("³", "**3")
    e = e.replace("÷", "/").replace(",", ".").replace("×", "*").replace("^", "**")
    e = e.replace("√", "sqrt")
    e = re.sub(r'\s+', ' ', e)
    return e

def prepare_for_sympy(expr: str) -> str:
    """Converte expressão normalizada para sintaxe Sympy (injetando multiplicação implícita)."""
    e = expr
    # 1. Multiplicação entre número e letra (2x -> 2*x)
    e = re.sub(r'(\d)\s*([xyz])', r'\1*\2', e)
    # 2. Multiplicação ANTES de parênteses (3(4) -> 3*(4), x(2) -> x*(2))
    # Captura números ou variáveis seguidos de parênteses, tratando espaços.
    e = re.sub(r'(\d|[xyz])\s*\(', r'\1*(', e)
    # 3. Multiplicação entre parênteses ((x+1)(x+2) -> (x+1)*(x+2))
    e = re.sub(r'\)\s*\(', r')*(', e)
    # 4. Potência DEPOIS de parênteses ou variáveis
    e = re.sub(r'\)\s*(\d+)', r')**\1', e)
    e = re.sub(r'([xyz])\s*(\d+)', r'\1**\2', e)
    return e

def calculate_expression(expr: str) -> dict:
    current_step = "Iniciante"
    try:
        current_step = "Limpeza de Símbolos"
        raw = normalize(expr)
        has_var = bool(re.search(r'[a-z]', raw))
        has_eq  = "=" in raw

        if has_var or has_eq:
            from sympy import symbols, solve, Eq, sympify, expand
            x, y, z = symbols('x y z')
            sym_locals = {"x": x, "y": y, "z": z, "sqrt": __import__("sympy").sqrt}

            current_step = "Estruturação Algébrica"
            sides = raw.split("=", 1) if has_eq else [raw, "0"]
            lhs_str = prepare_for_sympy(sides[0].strip())
            rhs_str = prepare_for_sympy(sides[1].strip()) if len(sides) > 1 else "0"

            current_step = "Conversão Sympy"
            lhs = sympify(lhs_str, locals=sym_locals)
            rhs = sympify(rhs_str, locals=sym_locals)

            current_step = "Resolvendo Equação"
            solutions = solve(Eq(lhs, rhs))
            
            steps = [f"• Equação Lida: {lhs} = {rhs}", f"• Solução: {solutions}"]
            return {"answer": str(solutions), "explanation": "\n".join(steps)}

        import math
        current_step = "Cálculo Aritmético"
        clean = normalize(expr).replace("=", "")
        clean = re.sub(r'[^0-9+\-*/().\s]', '', clean.replace("sqrt", "math.sqrt"))
        result = eval(clean, {"math": math, "__builtins__": {}})
        return {"answer": str(round(result, 4)), "explanation": f"• Resultado Direto: {result}"}

    except Exception as e:
        return {"answer": "ERRO", "explanation": f"Erro em: {current_step}\nDetalhe: {e}"}

@app.get("/", response_class=HTMLResponse)
async def serve_frontend():
    with open("index.html", "r", encoding="utf-8") as f:
        return f.read()

@app.get("/health")
async def health():
    return {"status": "online"}

@app.post("/aprender")
async def learn_from_user(data: LearnData):
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    try:
        resultado = calculate_expression(data.user_corrected)
        # Salva log
        log_entry = {"ts": timestamp, "ia": data.ia_read, "user": data.user_corrected, "res": resultado["answer"]}
        with open(LOG_FILE, "a") as f:
            f.write(json.dumps(log_entry) + "\n")
        return {"status": "ok", "result": resultado}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    logger.info("SERVIDOR ANTIGRAVITY INICIADO NA PORTA 8000")
    uvicorn.run(app, host="0.0.0.0", port=8000)
