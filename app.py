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

app = FastAPI(title="Antigravity Math Learning Core")

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
    """Normaliza a expressão lida pelo OCR para Python/Sympy."""
    e = expr.strip()
    # Superscripts unicode -> **N
    e = e.replace("¹", "**1").replace("²", "**2").replace("³", "**3")
    # Símbolos alternativos
    e = e.replace("÷", "/").replace(",", ".").replace("^", "**")
    # Raiz quadrada
    e = e.replace("√", "sqrt")
    return e

def prepare_for_sympy(expr: str) -> str:
    """Converte expressão normalizada para sintaxe Sympy."""
    e = expr
    # 2x -> 2*x  |  (x+3)2 -> (x+3)**2  |  x2 -> x**2
    e = re.sub(r'(\d)([a-z])', r'\1*\2', e)
    e = re.sub(r'\)(\d+)', r')**\1', e)
    e = re.sub(r'([a-z])(\d+)', r'\1**\2', e)
    # Espaços entre ) e número  e  letra e número
    e = re.sub(r'\)\s+(\d+)', r')**\1', e)
    e = re.sub(r'([a-z])\s+(\d+)', r'\1**\2', e)
    return e

def calculate_expression(expr: str) -> dict:
    """Resolve qualquer expressão matemática: aritmética, equação ou incógnita."""
    try:
        raw = normalize(expr)
        logger.info(f"Expressão normalizada: {raw}")

        has_var = bool(re.search(r'[a-z]', raw))
        has_eq  = "=" in raw

        if has_var or has_eq:
            from sympy import symbols, solve, Eq, sympify, expand
            x, y, z = symbols('x y z')
            sym_locals = {"x": x, "y": y, "z": z, "sqrt": __import__("sympy").sqrt}

            sides = raw.split("=", 1) if has_eq else [raw, "0"]
            lhs_str = prepare_for_sympy(sides[0].strip())
            rhs_str = prepare_for_sympy(sides[1].strip()) if len(sides) > 1 else "0"

            logger.info(f"Sympy LHS: {lhs_str}  |  RHS: {rhs_str}")

            lhs = sympify(lhs_str, locals=sym_locals)
            rhs = sympify(rhs_str, locals=sym_locals)

            steps = []
            steps.append(f"• Equação Original: {lhs} = {rhs}")

            expanded = expand(lhs)
            if expanded != lhs:
                steps.append(f"• Expandindo: {expanded} = {rhs}")

            solutions = solve(Eq(lhs, rhs))
            steps.append(f"• Isolando a incógnita...")
            steps.append(f"• Solução encontrada: {solutions}")

            return {
                "answer": str(solutions),
                "explanation": "\n".join(steps)
            }

        # --- Aritmética simples ---
        import math
        clean = normalize(expr).replace("=", "")
        clean = re.sub(r'[^0-9+\-*/().\s]', '', clean.replace("sqrt", "math.sqrt"))
        result = eval(clean, {"math": math, "__builtins__": {}})

        return {
            "answer": str(round(result, 4)),
            "explanation": f"• Cálculo direto: {clean} = {result}"
        }

    except Exception as e:
        logger.error(f"Erro no cálculo: {e}")
        return {"answer": "ERRO", "explanation": str(e)}


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
        header, encoded = data.image_data.split(",", 1)
        img_bytes = base64.b64decode(encoded)
        img_path = os.path.join(TRAINING_DIR, f"revisar_{timestamp}.png")
        with open(img_path, "wb") as f:
            f.write(img_bytes)

        log_entry = {
            "timestamp": timestamp,
            "imagem": f"revisar_{timestamp}.png",
            "ia_leu": data.ia_read,
            "usuario_corrigiu": data.user_corrected,
            "precisava_corrigir": data.ia_read != data.user_corrected
        }
        with open(LOG_FILE, "a") as f:
            f.write(json.dumps(log_entry, ensure_ascii=False) + "\n")

        resultado = calculate_expression(data.user_corrected)
        logger.info(f"APRENDIZADO: '{data.ia_read}' -> '{data.user_corrected}' | Resultado: {resultado['answer']}")

        return {"status": "learned", "result": resultado}
    except Exception as e:
        logger.error(f"Erro no aprendizado: {e}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
