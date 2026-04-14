import asyncio
import os
import base64
import json
from datetime import datetime
from fastapi import FastAPI, HTTPException
from fastapi.responses import HTMLResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn
import logging
import sympy

# Antigravity Math & Learning Hub
logging.basicConfig(level=logging.INFO, format='[MATH-HUB] %(asctime)s | %(message)s')
logger = logging.getLogger("MathHub")

app = FastAPI(title="Antigravity Math Learning Core")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pastas de Aprendizado
TRAINING_DIR = "dataset_treinamento"
LOG_FILE = "aprendizado_ia.json"

for d in [TRAINING_DIR]:
    if not os.path.exists(d):
        os.makedirs(d)

class LearnData(BaseModel):
    image_data: str
    ia_read: str
    user_corrected: str

class SimpleSolve(BaseModel):
    expression: str

# --- Motor de Cálculo Real ---
def calculate_expression(expr):
    """Resolve a conta matemática de forma segura"""
    try:
        # 1. Limpeza e Normalização
        expr = expr.replace("x", "*").replace("÷", "/").replace(",", ".").replace("=", "").strip()
        
        # 2. Suporte para Raiz Quadrada
        if "√" in expr or "sqrt" in expr:
            import math
            expr = expr.replace("√", "math.sqrt(").replace("sqrt", "math.sqrt(") + ")"
            
        # 3. Suporte para Porcentagem
        if "%" in expr:
            expr = expr.replace("%", "/100")

        # 4. Cálculo de Álgebra e Aritmética
        from fractions import Fraction
        
        # Verifica se há incógnitas (x, y, z)
        has_variable = any(var in expr for var in ['x', 'y', 'z'])
        
        if has_variable:
            # Lógica Algébrica (Sympy)
            from sympy import symbols, solve, Eq, sympify
            x_sym, y_sym, z_sym = symbols('x y z')
            
            # Divide em lados da equação
            parts = expr.split("=") if "=" in expr else [expr, "0"]
            if len(parts) < 2: parts = [expr, "0"]
            
            # Prepara a string para o sympy (ex: 2x -> 2*x)
            proc_parts = []
            for p in parts:
                p_proc = p.replace("x", "*x").replace("y", "*y").replace("z", "*z").replace("**", "*")
                if p_proc.startswith("*"): p_proc = p_proc[1:]
                proc_parts.append(p_proc)

            lhs = sympify(proc_parts[0], locals={"x": x_sym, "y": y_sym, "z": z_sym})
            rhs = sympify(proc_parts[1], locals={"x": x_sym, "y": y_sym, "z": z_sym})
            
            sol = solve(Eq(lhs, rhs))
            return f"Solução: {sol}"
        
        # 5. Lógica Aritmética Normal (Fallback)
        import math
        allowed_chars = "0123456789+-*/(). math.sqrt"
        clean_expr = "".join([c for c in expr if c in allowed_chars])
        
        result = eval(clean_expr, {"math": math})
        
        # Simplificação de frações
        if "/" in expr and result % 1 != 0:
            f = Fraction(result).limit_denominator()
            return f"{round(result, 2)} (ou {f})"
            
        return str(round(result, 2))
    except Exception as e:
        logger.error(f"Erro no cálculo: {e}")
        return "Erro de Cálculo"

@app.get("/", response_class=HTMLResponse)
async def serve_frontend():
    with open("index.html", "r", encoding="utf-8") as f:
        return f.read()

@app.get("/health")
async def health():
    return {"status": "online"}

@app.post("/aprender")
async def learn_from_user(data: LearnData):
    """Salva a correção do usuário para treinar a IA futuramente"""
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    
    try:
        # Salva a imagem para o dataset
        header, encoded = data.image_data.split(",", 1)
        img_bytes = base64.b64decode(encoded)
        img_filename = f"revisar_{timestamp}.png"
        img_path = os.path.join(TRAINING_DIR, img_filename)
        
        with open(img_path, "wb") as f:
            f.write(img_bytes)

        # Registra a correção no log
        log_entry = {
            "timestamp": timestamp,
            "imagem": img_filename,
            "ia_leu": data.ia_read,
            "usuario_corrigiu": data.user_corrected,
            "precisava_corrigir": data.ia_read != data.user_corrected
        }
        
        with open(LOG_FILE, "a") as f:
            f.write(json.dumps(log_entry) + "\n")

        # Resolve a conta corrigida
        resultado = calculate_expression(data.user_corrected)
        
        logger.info(f"APRENDIZADO: Usuário corrigiu '{data.ia_read}' para '{data.user_corrected}'. Resultado: {resultado}")
        
        return {
            "status": "learned",
            "result": resultado,
            "message": "Dados salvos para treinamento!"
        }
    except Exception as e:
        logger.error(f"Erro no aprendizado: {e}")
        raise HTTPException(status_code=500, detail="Erro ao salvar dados de aprendizado")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
