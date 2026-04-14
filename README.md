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
2.  Inicie o servidor Antigravity: `python app.py`
3.  Acesse `http://localhost:8000` no seu navegador.

### Acesso Externo via Ngrok
Para testar o controle remoto ou em outros dispositivos:
1.  Com o servidor rodando, abra um novo terminal.
2.  Execute: `ngrok http 8000`
3.  Copie a URL `https` fornecida pelo Ngrok. Agora seu sistema de visão está disponível globalmente!

## ⚙️ Funcionamento
- **Processamento Local**: O navegador roda o modelo de IA, economizando banda e recursos do servidor.
- **Webhook Ultrarrápido**: O sinal é enviado ao `app.py` assim que o gesto é validado.
- **Async Engine**: O Antigravity processa a lógica de automação em segundo plano, garantindo 0 latency na interface.

## ⚙️ Funcionalidades
- **Task Offloading**: A lógica de hardware não atrasa a detecção de imagem.
- **Resiliência**: Mecanismo de retry automático no frontend.
- **Logging Inteligente**: Rastreabilidade total via prefixo `[ANTIGRAVITY-CORE]`.
