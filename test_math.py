import re
from sympy import symbols, solve, Eq, sympify

def calculate_expression(expr):
    try:
        # 1. Normalização Inicial
        raw_expr = expr.replace("÷", "/").replace(",", ".").replace("^", "**").replace("¹", "**1").replace("²", "**2").replace("³", "**3").strip()
        
        # 4. Cálculo de Álgebra e Aritmética
        has_variable = any(var in raw_expr for var in ['x', 'y', 'z'])
        
        if has_variable or "=" in raw_expr:
            x_sym, y_sym, z_sym = symbols('x y z')
            parts = raw_expr.split("=") if "=" in raw_expr else [raw_expr, "0"]
            if len(parts) < 2: parts = [raw_expr, "0"]
            
            proc_parts = []
            for p in parts:
                p_proc = p.strip()
                # Transforma 2x em 2*x
                p_proc = re.sub(r'(\d)([xyz])', r'\1*\2', p_proc)
                # Transforma )2 em )**2
                p_proc = re.sub(r'(\))(\d+)', r'\1**\2', p_proc)
                # Transforma x2 em x**2
                p_proc = re.sub(r'([xyz])(\d+)', r'\1**\2', p_proc)
                
                print(f"Debug: {p} -> {p_proc}")
                proc_parts.append(p_proc)

            lhs = sympify(proc_parts[0], locals={"x": x_sym, "y": y_sym, "z": z_sym})
            rhs = sympify(proc_parts[1], locals={"x": x_sym, "y": y_sym, "z": z_sym})
            
            sol = solve(Eq(lhs, rhs))
            return f"Solução: {sol}"
        return "Not an equation"
    except Exception as e:
        return f"Erro: {e}"

# Test cases
print(calculate_expression("(x+3)2 = 4"))
print(calculate_expression("x2 = 25"))
print(calculate_expression("(x+3)² = 4"))
print(calculate_expression("x² = 16"))
print(calculate_expression("x2+6x+9=4"))
