# Antigravity Distributed Control System

Este projeto implementa um sistema de controle distribuído de ponta a ponta, integrando Visão Computacional (Teachable Machine) com um núcleo de processamento assíncrono em Python utilizando o framework conceitual **Antigravity**.

## 🏗️ Arquitetura
O sistema segue o padrão de **micro-serviços desacoplados**:
1.  **Ingress (Frontend)**: Captura vídeo, processa o modelo ML localmente via TensorFlow.js e emite eventos de classificação.
2.  **Core (Backend)**: Servidor FastAPI que gerencia uma fila de tarefas assíncronas para processar os comandos recebidos sem bloquear a recepção de novos dados.
3.  **Action Layer**: Simulação de controle de hardware escalonável.

## 🚀 Como Executar

### Localmente
1.  Instale as dependências: `pip install -r requirements.txt`
2.  Inicie o servidor: `python main.py`
3.  Abra o `index.html` no seu navegador.

### Docker
1.  Construa a imagem: `docker build -t antigravity-core .`
2.  Rode o container: `docker run -p 8000:8000 antigravity-core`

## 🌐 Deploy (Railway / Render)
Para fazer o deploy em nuvem:
1.  Conecte seu repositório GitHub ao **Railway.app** ou **Render.com**.
2.  O Railway detectará automaticamente o `Dockerfile`.
3.  No frontend (`index.html`), altere a `API_URL` para o domínio fornecido pelo serviço de deploy.

## ⚙️ Funcionalidades
- **Task Offloading**: A lógica de hardware não atrasa a detecção de imagem.
- **Resiliência**: Mecanismo de retry automático no frontend.
- **Logging Inteligente**: Rastreabilidade total via prefixo `[ANTIGRAVITY-CORE]`.
