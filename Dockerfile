# Utilizando imagem oficial do Python
FROM python:3.9-slim

# Definir diretório de trabalho
WORKDIR /app

# Instalar dependências necessárias
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copiar o código operacional
COPY main.py .

# Expor a porta do Antigravity
EXPOSE 8000

# Executar o servidor com suporte a async
CMD ["python", "main.py"]
