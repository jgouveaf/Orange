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
    # Expande potências unicode e formatos comuns
    e = e.replace("¹", "**1").replace("²", "**2").replace("³", "**3")
    e = e.replace("÷", "/").replace(",", ".").replace("×", "*").replace("^", "**")
    e = e.replace("√", "sqrt")
    # Limpa apenas espaços duplos, mantém estrutura
    e = re.sub(r'\s+', ' ', e)
    return e

def prepare_for_sympy(expr: str) -> str:
    """Converte expressão normalizada para sintaxe Sympy."""
    e = expr
    # 2x ou 2 x -> 2*x
    e = re.sub(r'(\d)\s*([xyz])', r'\1*\2', e)
    # (x+3)2 ou (x+3) 2 -> (x+3)**2
    e = re.sub(r'\)\s*(\d+)', r')**\1', e)
    # x2 ou x 2 -> x**2
    e = re.sub(r'([xyz])\s*(\d+)', r'\1**\2', e)
    return e

def calculate_expression(expr: str) -> dict:
    """Resolve qualquer expressão matemática: aritmética, equação ou incógnita."""
    current_step = "Iniciando"
    try:
        current_step = "Normalização de símbolos"
        raw = normalize(expr)
        
        has_var = bool(re.search(r'[a-z]', raw))
        has_eq  = "=" in raw

        if has_var or has_eq:
            from sympy import symbols, solve, Eq, sympify, expand
            x, y, z = symbols('x y z')
            sym_locals = {"x": x, "y": y, "z": z, "sqrt": __import__("sympy").sqrt}

            current_step = "Divisão laterial da equação"
            sides = raw.split("=", 1) if has_eq else [raw, "0"]
            
            current_step = "Preparação algébrica (Sympy)"
            lhs_str = prepare_for_sympy(sides[0].strip())
            rhs_str = prepare_for_sympy(sides[1].strip()) if len(sides) > 1 else "0"

            logger.info(f"Sympy LHS: {lhs_str} | RHS: {rhs_str}")

            current_step = "Processamento simbólico (LHS)"
            lhs = sympify(lhs_str, locals=sym_locals)
            current_step = "Processamento simbólico (RHS)"
            rhs = sympify(rhs_str, locals=sym_locals)

            steps = []
            steps.append(f"• Equação Detectada: {lhs} = {rhs}")

            expanded = expand(lhs)
            if expanded != lhs:
                steps.append(f"• Expansão Algébrica: {expanded} = {rhs}")

            current_step = "Busca de soluções"
            solutions = solve(Eq(lhs, rhs))
            steps.append(f"• Resolvendo para incógnita...")
            
            return {
                "answer": str(solutions),
                "explanation": "\n".join(steps)
            }

        # --- Aritmética simples ---
        import math
        current_step = "Cálculo aritmético"
        clean = normalize(expr).replace("=", "")
        clean = re.sub(r'[^0-9+\-*/().\s]', '', clean.replace("sqrt", "math.sqrt"))
        result = eval(clean, {"math": math, "__builtins__": {}})

        return {
            "answer": str(round(result, 4)),
            "explanation": f"• Operação: {clean}\n• Resultado: {result}"
        }

    except Exception as e:
        logger.error(f"Erro em {current_step}: {e}")
        return {
            "answer": "ERRO",
            "explanation": f"Falha no passo: {current_step}\nDetalhe: {str(e)}\n\nDica: Verifique se o texto lido acima está correto."
        }


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
