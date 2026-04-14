# Poker Vision IoT 🃏🤖

Este é um jogo de Poker inovador que utiliza Inteligência Artificial (Teachable Machine) para controle por gestos e simulação de integração IoT.

## 🚀 Como Jogar

1. **Prepare o Cérebro**: Treine seu modelo no [Teachable Machine](https://teachablemachine.withgoogle.com/) com as classes:
   - `Aposta` (Sinal de 👍)
   - `Desistir` (Mão aberta ✋)
   - `Passar/Check` (Dois dedos na mesa ✌️)
   - `Nada` (Olhando para a câmera)
2. **Sprites**: Salve a imagem de cartas enviada na pasta `assets/cards.png`.
3. **Inicie o Jogo**: Abra o `index.html` e insira a URL do seu modelo treinado.
4. **Comande**: Faça os sinais na frente da câmera para realizar as jogadas!

## 🛠️ Tecnologias
- **p5.js**: Capturas de vídeo e renderização.
- **Teachable Machine Image**: Motor de IA local.
- **Vanilla CSS**: Design premium com glassmorphism e animações.
- **GitHub Pages**: Pronto para deploy estático.

## 📁 Estrutura do Projeto
- `index.html`: Interface principal.
- `style.css`: Estilização premium e sistema de sprites.
- `app.js`: Lógica do jogo e integração com a IA.
- `assets/`: Armazene aqui o `cards.png`.

---
Desenvolvido com 💚 por Antigravity.
