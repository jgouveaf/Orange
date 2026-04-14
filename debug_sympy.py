import re
from sympy import symbols, solve, Eq, sympify

def prepare_for_sympy(expr: str) -> str:
    e = expr
    e = re.sub(r'(\d)\s*([xyz])', r'\1*\2', e)
    e = re.sub(r'(\d)\s*\(', r'\1*(', e)
    e = re.sub(r'([xyz])\s*\(', r'\1*(', e)
    e = re.sub(r'\)\s*\(', r')*(', e)
    e = re.sub(r'\)\s*(\d+)', r')**\1', e)
    e = re.sub(r'([xyz])\s*(\d+)', r'\1**\2', e)
    return e

expr = "2(3x+1)-3(6-2x)"
print(f"Original: {expr}")
prepared = prepare_for_sympy(expr)
print(f"Prepared: {prepared}")

x = symbols('x')
try:
    res = sympify(prepared, locals={'x': x})
    print(f"Sympified: {res}")
except Exception as e:
    print(f"Error: {e}")
