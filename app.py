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

# Google Gemini para OCR de Matemática (opcional - configure GEMINI_API_KEY)
GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY", "")

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

class GeminiOCRRequest(BaseModel):
    image_data: str  # base64 data URL

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
    """Injeta multiplicação explícita: qualquer número/variável/parêntese antes de ( recebe *."""
    e = expr
    # 1. Número colado em variável: 2x -> 2*x
    e = re.sub(r'(\d)\s*([a-zA-Z])', r'\1*\2', e)
    # 2. Qualquer dígito ou letra antes de '(': 3( -> 3*(, x( -> x*(
    e = re.sub(r'([\w])\s*\(', r'\1*(', e)
    # 3. Fecha-parênteses seguido de abre-parênteses: )( -> )*(
    e = re.sub(r'\)\s*\(', r')*(', e)
    # 4. Potência depois de parênteses: )2 -> )**2
    e = re.sub(r'\)\s*(\d+)', r')**\1', e)
    # 5. Potência depois de variável: x2 -> x**2 (lookup negativo para não duplicar **)
    e = re.sub(r'([a-zA-Z])(?!\*)(\d+)', r'\1**\2', e)
    return e

def calculate_expression(expr: str) -> dict:
    """Resolve qualquer expressão matemática com passos detalhados, estilo Monica AI."""
    current_step = "Iniciando"
    try:
        current_step = "Normalização de símbolos"
        raw = normalize(expr)

        # Remove o = do final se não tiver nada depois (ex: 10-5= ou 2(9+1)-3(6-6)=)
        if raw.strip().endswith("="):
            raw = raw.strip()[:-1].strip()

        # Critério de Decisão: Álgebra vs Aritmética
        has_var = bool(re.search(r'[a-zA-Z]', raw.replace("sqrt", "")))
        has_effective_eq = False
        if "=" in raw:
            sides = raw.split("=")
            if len(sides) > 1 and sides[0].strip() and sides[1].strip():
                has_effective_eq = True

        if has_var or has_effective_eq:
            from sympy import symbols, solve, Eq, Poly, simplify
            from sympy.parsing.sympy_parser import (
                parse_expr, standard_transformations,
                implicit_multiplication_application, convert_xor
            )

            x, y, z = symbols('x y z')
            local_dict = {"x": x, "y": y, "z": z, "sqrt": __import__("sympy").sqrt}
            transformations = (
                standard_transformations
                + (implicit_multiplication_application, convert_xor)
            )

            current_step = "Divisão dos lados da equação"
            if has_effective_eq:
                sides = raw.split("=", 1)
                lhs_raw = sides[0].strip()
                rhs_raw = sides[1].strip()
            else:
                lhs_raw = raw
                rhs_raw = "0"

            current_step = "Preparação algébrica"
            lhs_str = prepare_for_sympy(lhs_raw)
            rhs_str = prepare_for_sympy(rhs_raw)

            logger.info(f"LHS: {lhs_str} | RHS: {rhs_str}")

            current_step = "Conversão Sympy (parse_expr)"
            lhs = parse_expr(lhs_str, local_dict=local_dict, transformations=transformations)
            rhs = parse_expr(rhs_str, local_dict=local_dict, transformations=transformations)
            equation = Eq(lhs, rhs)

            steps = [f"🔍 EQUAÇÃO IDENTIFICADA:\n   {lhs} = {rhs}"]

            expr_to_solve = lhs - rhs
            simplified = simplify(expr_to_solve)
            if simplified != expr_to_solve:
                steps.append(f"\n1️⃣ SIMPLIFICAÇÃO:\n   {simplified} = 0")

            current_step = "Análise de grau"
            try:
                poly = Poly(simplified, x)
                degree = poly.degree()
                if degree == 2:
                    coeffs = poly.all_coeffs()
                    if len(coeffs) == 3:
                        a, b, c = coeffs
                        delta = b**2 - 4*a*c
                        steps.append(f"\n2️⃣ RESOLUÇÃO (Equação do 2º Grau):")
                        steps.append(f"   • a={a}, b={b}, c={c}")
                        steps.append(f"   • Δ = b² - 4ac = ({b})² - 4·({a})·({c}) = {delta}")
                        if delta < 0:
                            steps.append("   • Δ < 0 → Raízes complexas")
                        elif delta == 0:
                            steps.append("   • Δ = 0 → Uma raiz real")
                        else:
                            steps.append("   • Δ > 0 → Duas raízes reais distintas")
                elif degree == 1:
                    steps.append(f"\n2️⃣ RESOLUÇÃO (Equação do 1º Grau):\n   • Isolando x...")
            except Exception:
                pass

            current_step = "Busca de soluções"
            solutions = solve(equation, x)
            steps.append(f"\n3️⃣ RESULTADO FINAL:\n   x = {solutions}")

            return {"answer": str(solutions), "explanation": "\n".join(steps)}

        # --- Aritmética pura (sem variáveis, sem = preenchido) ---
        import math as _math
        current_step = "Cálculo aritmético"
        clean = raw.replace("=", "")
        # Injeta multiplicação implícita para aritmética também: 3(4) -> 3*(4)
        clean = re.sub(r'(\d)\s*\(', r'\1*(', clean)
        clean = re.sub(r'\)\s*\(', r')*(', clean)
        clean = clean.replace("sqrt", "__sqrt__")
        clean = re.sub(r'[^0-9+\-*/().\s_]', '', clean)
        clean = clean.replace("__sqrt__", "_math.sqrt")
        result = eval(clean, {"_math": _math, "__builtins__": {}})
        return {
            "answer": str(round(result, 4)),
            "explanation": f"✅ CÁLCULO DIRETO:\n• Expressão: {clean.replace('_math.', '')}\n• Resultado: {result}"
        }

    except Exception as e:
        logger.error(f"Erro em {current_step}: {e}")
        return {
            "answer": "ERRO",
            "explanation": f"❌ FALHA: {current_step}\n{str(e)}\n\n💡 Verifique se a expressão está correta."
        }

def format_pretty(text: str) -> str:
    """Transforma termos técnicos do Sympy em símbolos matemáticos bonitos."""
    t = text
    # Raízes
    t = re.sub(r'sqrt\((.*?)\)', r'√\1', t)
    # Potências
    t = t.replace("**2", "²").replace("**3", "³").replace("**", "^")
    # Multiplicação e divisões
    t = t.replace("*", "·").replace("/", "÷")
    # Espaçamento
    t = t.replace(",", ", ")
    return t

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
        
        # Formata a resposta final com símbolos bonitos
        if resultado["answer"] != "ERRO":
            resultado["answer"] = format_pretty(resultado["answer"])
            resultado["explanation"] = format_pretty(resultado["explanation"])

        logger.info(f"APRENDIZADO: '{data.ia_read}' -> '{data.user_corrected}' | Resultado: {resultado['answer']}")

        return {"status": "learned", "result": resultado}
    except Exception as e:
        logger.error(f"Erro no aprendizado: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/", response_class=HTMLResponse)
async def serve_frontend():
    with open("index.html", "r", encoding="utf-8") as f:
        return f.read()

@app.get("/health")
async def health():
    gemini_ok = bool(GEMINI_API_KEY)
    return {"status": "online", "gemini": gemini_ok}

@app.post("/gemini-ocr")
async def gemini_ocr(req: GeminiOCRRequest):
    """Usa Google Gemini Vision para ler expressões matemáticas com precisão."""
    if not GEMINI_API_KEY:
        raise HTTPException(status_code=400, detail="GEMINI_API_KEY não configurada. Use Tesseract no modo offline.")
    try:
        import google.generativeai as genai
        genai.configure(api_key=GEMINI_API_KEY)
        model = genai.GenerativeModel("gemini-1.5-flash")

        # Decodifica a imagem base64
        header, encoded = req.image_data.split(",", 1)
        img_bytes = base64.b64decode(encoded)

        prompt = (
            "Você é um leitor de expressões matemáticas. "
            "Leia a expressão matemática na imagem e retorne APENAS a expressão matemática em texto puro, "
            "usando os seguintes padrões: "
            "- Use ** para potência (x² = x**2) "
            "- Use * para multiplicação (3×4 = 3*4) "
            "- Use / para divisão "
            "- Use sqrt() para raiz quadrada "
            "- Mantenha parênteses como estão "
            "- NÃO inclua explicações, apenas a expressão. Exemplo: 4x**2+6x+4=0"
        )

        import PIL.Image
        import io
        pil_img = PIL.Image.open(io.BytesIO(img_bytes))
        response = model.generate_content([prompt, pil_img])
        math_text = response.text.strip()
        # Remove markdown se vier
        math_text = math_text.replace("```", "").replace("`", "").strip()

        logger.info(f"Gemini OCR leu: {math_text}")
        return {"text": math_text, "source": "gemini"}
    except Exception as e:
        logger.error(f"Erro no Gemini OCR: {e}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    logger.info("SERVIDOR ANTIGRAVITY INICIADO NA PORTA 8000")
    if GEMINI_API_KEY:
        logger.info("✅ Gemini Vision ATIVO - OCR de alta precisão habilitado")
    else:
        logger.warning("⚠️  Gemini Vision OFFLINE - Configure GEMINI_API_KEY para OCR avançado")
    uvicorn.run(app, host="0.0.0.0", port=8000)
