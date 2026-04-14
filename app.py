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
    """Resolve qualquer expressão matemática com passos detalhados, estilo Monica AI."""
    current_step = "Iniciando"
    try:
        current_step = "Normalização de símbolos"
        raw = normalize(expr)
        
        # Verifica se é uma equação ou contém variáveis
        has_var = bool(re.search(r'[a-z]', raw))
        has_eq  = "=" in raw

        if has_var or has_eq:
            from sympy import symbols, solve, Eq, sympify, expand, simplify, latex, Poly
            from sympy.solvers import solve
            
            x, y, z = symbols('x y z')
            sym_locals = {"x": x, "y": y, "z": z, "sqrt": __import__("sympy").sqrt}

            current_step = "Análise de estrutura da equação"
            if has_eq:
                sides = raw.split("=", 1)
                lhs_raw = sides[0].strip()
                rhs_raw = sides[1].strip() if len(sides) > 1 else ""
                
                # Regra: Se não houver nada depois do '=', ignora o '='
                if not rhs_raw:
                    has_eq = False
                    raw = lhs_raw
                else:
                    current_step = "Preparação algébrica (Sympy)"
                    lhs_str = prepare_for_sympy(lhs_raw)
                    rhs_str = prepare_for_sympy(rhs_raw)
            
            if not has_eq:
                lhs_str = prepare_for_sympy(raw)
                rhs_str = "0"

            logger.info(f"Sympy LHS: {lhs_str} | RHS: {rhs_str}")

            current_step = "Processamento simbólico"
            lhs = sympify(lhs_str, locals=sym_locals)
            rhs = sympify(rhs_str, locals=sym_locals)
            equation = Eq(lhs, rhs)

            steps = []
            steps.append(f"🔍 EQUAÇÃO IDENTIFICADA:\n   {lhs} = {rhs}")

            # Simplificação
            expr_to_solve = lhs - rhs
            simplified = simplify(expr_to_solve)
            if simplified != expr_to_solve:
                steps.append(f"\n1️⃣ SIMPLIFICAÇÃO:\n   {simplified} = 0")

            current_step = "Análise de grau e passos"
            # Se for uma equação do segundo grau (ax^2 + bx + c = 0)
            try:
                poly = Poly(simplified, x)
                degree = poly.degree()
                if degree == 2:
                    coeffs = poly.all_coeffs()
                    if len(coeffs) == 3:
                        a, b, c = coeffs
                        delta = b**2 - 4*a*c
                        steps.append(f"\n2️⃣ RESOLUÇÃO (Equação do 2º Grau):")
                        steps.append(f"   • Identificando: a={a}, b={b}, c={c}")
                        steps.append(f"   • Cálculo do Delta (Δ = b² - 4ac):")
                        steps.append(f"     Δ = ({b})² - 4*({a})*({c})")
                        steps.append(f"     Δ = {delta}")
                        
                        if delta < 0:
                            steps.append(f"   • Como Δ < 0, as raízes são complexas.")
                        elif delta == 0:
                            steps.append(f"   • Como Δ = 0, existe uma única raiz real.")
                        else:
                            steps.append(f"   • Como Δ > 0, existem duas raízes reais distintas.")
                elif degree == 1:
                    steps.append(f"\n2️⃣ RESOLUÇÃO (Equação do 1º Grau):")
                    steps.append(f"   • Isolando a incógnita x...")
            except:
                pass

            current_step = "Busca de soluções"
            solutions = solve(equation, x)
            
            steps.append(f"\n3️⃣ RESULTADO FINAL:")
            steps.append(f"   x = {solutions}")
            
            return {
                "answer": str(solutions),
                "explanation": "\n".join(steps)
            }

        # --- Aritmética simples ---
        import math
        current_step = "Cálculo aritmético"
        clean = normalize(expr).replace("=", "")
        # Remove qualquer 'x' que possa ter sido lido como multiplicação em aritmética
        clean = clean.replace("x", "*").replace("X", "*")
        clean = re.sub(r'[^0-9+\-*/().\s]', '', clean.replace("sqrt", "math.sqrt"))
        result = eval(clean, {"math": math, "__builtins__": {}})

        return {
            "answer": str(round(result, 4)),
            "explanation": f"✅ CÁLCULO DIRETO:\n• Operação: {clean}\n• Resultado: {result}"
        }

    except Exception as e:
        logger.error(f"Erro em {current_step}: {e}")
        return {
            "answer": "ERRO",
            "explanation": f"❌ FALHA NO PROCESSAMENTO\nPasso: {current_step}\nDetalhe: {str(e)}\n\n💡 Dica: Verifique se o símbolo '*' foi usado para multiplicação e se o expoente '²' está legível."
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
