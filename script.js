const phases = [
    {
        title: "Fase 1: Ideia e Planejamento",
        steps: [
            {
                id: 1,
                title: "Criação do GDD",
                team: "Geral (Mecânica e Design)",
                type: "all",
                color: "var(--all-color)",
                desc: "Nessa parte, a galera escreve tudo o que o jogo vai ter: os poderes, como ganha, como perde e qual é a história. É tipo a 'bíblia' do projeto pra todo mundo saber o que está acontecendo sem precisar perguntar toda hora. Se o plano mudar no meio, o documento tem que ser atualizado pra ninguém programar coisa errada.",
                reason: "Sem um plano escrito, cada um faz o que quer e, no final, as partes do jogo não se encaixam."
            },
            {
                id: 2,
                title: "Análise de Viabilidade",
                team: "Código (TI e IA)",
                type: "ti",
                color: "var(--ti-color)",
                desc: "O pessoal de TI e IA senta pra decidir se o que o PAV quer fazer (tipo um gráfico pesadão) roda de verdade na engine escolhida. Eles testam se os scripts de IA não vão travar o jogo ou deixar tudo lento demais no computador da galera. É a hora de ver se a ideia de vocês é possível de fazer ou se é viagem demais.",
                reason: "Evita que vocês percam semanas fazendo algo que o computador não aguenta rodar depois."
            },
            {
                id: 3,
                title: "Guia de Estilo Visual",
                team: "Arte (PAV)",
                type: "art",
                color: "var(--art-color)",
                desc: "O pessoal de PAV monta um mural com fotos, cores e desenhos que mostram como o jogo vai ser: se é sombrio, colorido ou pixel art. Eles definem as regras visuais pra que o jogo tenha uma cara única e não pareça um monte de desenhos aleatórios misturados. Isso ajuda o TI a saber como configurar as luzes e cores do jogo no código.",
                reason: "Garante que o jogo seja bonito e que todas as fases pareçam do mesmo universo."
            },
            {
                id: 4,
                title: "Identidade da Marca",
                team: "Design (Publicidade)",
                type: "art",
                color: "var(--art-color)",
                desc: "A pessoa de Publicidade pensa num nome que chame atenção e numa logo que seja marcante para o projeto. Ela estuda o que a galera da nossa idade gosta de jogar pra ver se o jogo de vocês tem chance de bombar. É o começo de transformar o código e o desenho em um produto que as pessoas queiram baixar.",
                reason: "Um jogo bom com nome ruim ou sem marca ninguém clica pra ver como é."
            },
            {
                id: 5,
                title: "Configuração do Repositório",
                team: "Código (TI)",
                type: "ti",
                color: "var(--ti-color)",
                desc: "O TI cria o lugar (tipo um GitHub) onde todo mundo vai subir os arquivos, separando código, som e desenho. Eles criam regras pra ninguém apagar o arquivo do outro sem querer ou mandar um arquivo com nome estranho tipo 'final_v2_agora_vai'. É a parte da organização que salva a vida de todo mundo no final.",
                reason: "Sem isso, vira uma confusão de arquivos e vocês perdem horas procurando onde tá a última versão do jogo."
            }
        ]
    },
    {
        title: "Fase 2: Protótipo e Lógica Base",
        steps: [
            {
                id: 6,
                title: "Greyboxing (Fase Cinza)",
                team: "Mecânica (TI)",
                type: "ti",
                color: "var(--ti-color)",
                desc: "O TI cria as fases usando só quadrados e círculos cinzas pra ver se os saltos e o caminho estão legais. O pessoal de PAV fica de olho pra ver o tamanho que os desenhos dos personagens precisam ter pra caber nesses espaços. É a hora de testar se o jogo é divertido mesmo antes de ele estar bonito.",
                reason: "É mais fácil mudar um quadrado de lugar do que ter que refazer um desenho inteiro porque a fase ficou curta."
            },
            {
                id: 7,
                title: "Programação de Movimento",
                team: "Código (TI)",
                type: "ti",
                color: "var(--ti-color)",
                desc: "Aqui o TI foca em fazer o personagem andar, pular e interagir com as coisas de um jeito que não seja travado. Eles ajustam a velocidade e a gravidade pra que o jogador sinta que tem o controle total da situação. Enquanto isso, o PAV já começa a rascunhar as primeiras animações baseadas nessas velocidades.",
                reason: "Se o controle do personagem for ruim, o jogador desiste nos primeiros 10 segundos, não importa o gráfico."
            },
            {
                id: 8,
                title: "Lógica de IA Inimiga",
                team: "Código (IA)",
                type: "ti",
                color: "var(--ti-color)",
                desc: "O pessoal de IA programa a lógica simples pros vilões: eles precisam saber quando o jogador chega perto pra começar a perseguir. Eles criam as 'regras de decisão', tipo: 'se o jogador pular, atire' ou 'se ele chegar perto, bata'. É o que faz o jogo deixar de ser um deserto e começar a ter perigo de verdade.",
                reason: "Inimigos parados ou burros deixam o jogo sem graça e sem nenhum desafio pro jogador."
            },
            {
                id: 9,
                title: "Efeitos de Som Base",
                team: "PAV",
                type: "art",
                color: "var(--art-color)",
                desc: "O PAV grava ou procura sons curtos pra cada ação: barulho de tiro, de moeda caindo ou do personagem pulando. O TI coloca esses sons no código pra que eles toquem exatamente na hora que a ação acontece na tela. Isso dá uma sensação de que o jogo tá 'vivo' e respondendo ao jogador.",
                reason: "O som ajuda o jogador a entender o que aconteceu sem ele precisar ler nada na tela."
            },
            {
                id: 10,
                title: "Desenho da Interface (UI)",
                team: "Design (Publicidade/PAV)",
                type: "art",
                color: "var(--art-color)",
                desc: "A Publicidade e o PAV desenham a barra de vida, o inventário e o menu inicial pra ficarem fáceis de usar. O TI programa pra que, quando o personagem tome dano, a barrinha de vida diminua de verdade na tela. É a camada que explica ao usuário o que está acontecendo com a saúde e os itens dele.",
                reason: "Se o jogador não souber quanta vida tem ou onde clicar pra começar, ele fica frustrado e fecha o jogo."
            }
        ]
    },
    {
        title: "Fase 3: Deixando o Jogo Bonito",
        steps: [
            {
                id: 11,
                title: "Criação de Assets Finais",
                team: "Arte (PAV)",
                type: "art",
                color: "var(--art-color)",
                desc: "O PAV joga fora os blocos cinzas e coloca os desenhos oficiais, cenários detalhados e personagens coloridos. Eles fazem as texturas e os detalhes que dão personalidade pro jogo, seguindo o estilo definido na Etapa 3. O TI ajuda a importar tudo pra dentro da engine sem deixar o jogo pesado demais.",
                reason: "É o visual que atrai o jogador e faz ele querer explorar o mundo que vocês criaram."
            },
            {
                id: 12,
                title: "Navegação de IA (Pathfinding)",
                team: "Código (IA)",
                type: "ti",
                color: "var(--ti-color)",
                desc: "O time de IA programa como os inimigos desviam de buracos e paredes pra chegar até o jogador sem ficar travados. Eles usam códigos pra IA entender qual é o caminho mais curto e inteligente dentro do mapa. Isso evita que os vilões fiquem andando contra a parede que nem baratas tontas.",
                reason: "Uma IA que sabe navegar deixa o jogo muito mais profissional e difícil de vencer."
            },
            {
                id: 13,
                title: "Animações de Personagem",
                team: "Arte (PAV)",
                type: "art",
                color: "var(--art-color)",
                desc: "O PAV faz os frames do personagem correndo, batendo e caindo pra que tudo pareça fluido e natural. O TI liga esses desenhos ao código pra que, quando você aperta o botão, a animação certa comece na hora. É aqui que o personagem ganha vida e parece que ele realmente está se movendo.",
                reason: "Animações bem feitas fazem o jogo parecer profissional e não um projeto travado."
            },
            {
                id: 14,
                title: "Música e Ambiência",
                team: "Arte (PAV)",
                type: "art",
                color: "var(--art-color)",
                desc: "O PAV compõe ou escolhe músicas que combinam com o clima das fases e cria sons de fundo, como vento ou máquinas. O TI faz com que o som mude de volume dependendo de onde o jogador está no mapa (distância). É o que preenche o silêncio e cria a atmosfera do jogo.",
                reason: "A música certa mexe com o sentimento do jogador e deixa a experiência muito mais imersiva."
            },
            {
                id: 15,
                title: "Efeitos Especiais (VFX)",
                team: "PAV e Código (TI)",
                type: "all",
                color: "var(--all-color)",
                desc: "O pessoal de PAV e TI cria as partículas: fumaça saindo do pé, explosões, faíscas ou brilhos de magia. Esses efeitos não têm física, servem só pra deixar as ações mais 'impactantes' e bonitas visualmente. É o 'tempero' final que faz as lutas e ações parecerem poderosas.",
                reason: "Sem efeitos, as ações do jogo parecem 'secas', tirando a empolgação de realizar ataques ou ganhar prêmios."
            }
        ]
    },
    {
        title: "Fase 4: Sistemas e História",
        steps: [
            {
                id: 16,
                title: "Script de História",
                team: "Design e Código (TI)",
                type: "all",
                color: "var(--all-color)",
                desc: "O PAV e o TI criam momentos onde o jogo para um pouco pra mostrar um diálogo ou algo quebrando no cenário. São pequenos textos ou cenas que explicam por que o personagem está ali e qual é a missão dele. Isso dá um motivo pro jogador querer chegar até o final da fase.",
                reason: "A história faz o jogador se importar com o personagem e querer ver o que acontece depois."
            },
            {
                id: 17,
                title: "Áudio Dinâmico",
                team: "PAV e Código (TI)",
                type: "all",
                color: "var(--all-color)",
                desc: "O PAV faz a música mudar sozinha: se o bicho pegar, a música fica rápida; se a área estiver limpa, ela volta a ser calma. O TI programa essa transição pra ser suave, sem cortes que estraguem o clima do momento. É um nível a mais de qualidade que mostra que o grupo é dedicado.",
                reason: "A música reativa manipula a adrenalina do jogador na hora certa do combate."
            },
            {
                id: 18,
                title: "IA de Combate em Grupo",
                team: "Código (IA)",
                type: "ti",
                color: "var(--ti-color)",
                desc: "A galera de IA faz os inimigos trabalharem juntos: enquanto um atira de longe, o outro tenta cercar o jogador por trás. Eles param de agir sozinhos e começam a ter táticas de equipe pra dificultar a vida de quem está jogando. Isso obriga o jogador a pensar em estratégias e não só sair batendo.",
                reason: "Inimigos coordenados criam um desafio muito mais inteligente e satisfatório de vencer."
            },
            {
                id: 19,
                title: "Sistema de Evolução (XP)",
                team: "Mecânica (TI)",
                type: "ti",
                color: "var(--ti-color)",
                desc: "O TI cria a lógica de coletar itens que aumentam a força ou dão novos poderes pro personagem conforme ele joga. Eles fazem as contas de quanto o jogador precisa evoluir pra conseguir passar de um chefe difícil. A Publicidade confere se esses nomes de poderes são legais e fáceis de entender.",
                reason: "Ganhar coisas novas e ficar mais forte é o que vicia o jogador e faz ele querer continuar."
            },
            {
                id: 20,
                title: "Revisão de Textos",
                team: "Design (Publicidade)",
                type: "art",
                color: "var(--art-color)",
                desc: "A Publicidade revisa todos os diálogos e nomes de menus pra conferir se não tem erro de português ou gírias erradas. Eles garantem que a história faça sentido e que as instruções de como jogar estejam bem claras. É a etapa de garantir que a comunicação do jogo está perfeita.",
                reason: "Erro de português ou texto confuso faz o projeto parecer desleixado e mal feito."
            }
        ]
    },
    {
        title: "Fase 5: Polimento e Testes",
        steps: [
            {
                id: 21,
                title: "Otimização de Performance",
                team: "Código (TI) e PAV",
                type: "all",
                color: "var(--all-color)",
                desc: "O TI limpa o código pra tirar coisas inúteis e o PAV diminui o peso das imagens sem perder a qualidade. Eles testam se o jogo abre rápido e se não vai travar no navegador ou esquentar o PC. É garantir que o jogo seja 'leve' pra qualquer um conseguir jogar sem problemas.",
                reason: "Ninguém gosta de jogo que fica dando 'lag' ou que demora 10 minutos pra carregar."
            },
            {
                id: 22,
                title: "Balanceamento de Dificuldade",
                team: "Mecânica (TI)",
                type: "ti",
                color: "var(--ti-color)",
                desc: "A galera joga o próprio jogo várias vezes pra ver se o primeiro boss não está impossível ou se o jogo está fácil demais. Eles mudam os números de dano e vida até achar o ponto certo onde o jogo é difícil, mas justo. É a etapa onde vocês decidem o nível do desafio.",
                reason: "Um jogo desequilibrado ou irrita o jogador (muito difícil) ou dá tédio (muito fácil)."
            },
            {
                id: 23,
                title: "Pós-Processamento Visual",
                team: "Arte (PAV)",
                type: "art",
                color: "var(--art-color)",
                desc: "O PAV passa um 'filtro' no jogo inteiro pra deixar as cores mais bonitas ou o clima mais cinematográfico (tipo luzes e sombras). Eles ajustam o brilho pra que tudo combine perfeitamente com a trilha sonora e com a história. É o toque final de arte que deixa o jogo com cara de profissional.",
                reason: "Pequenos ajustes de luz podem mudar totalmente a 'vibe' do jogo e deixá-lo muito mais atraente."
            },
            {
                id: 24,
                title: "Debugging (Caça aos Bugs)",
                team: "Geral (TI e IA)",
                type: "all",
                color: "var(--all-color)",
                desc: "Todo mundo do grupo vira 'testador' e tenta quebrar o jogo de todas as formas: pulando onde não deve ou apertando vários botões. O TI anota tudo o que deu errado e vai consertando um por um até o jogo estar liso. É a garantia de que não vai travar na hora da apresentação.",
                reason: "Bugs na hora da nota acabam com a moral do grupo, então tem que testar muito."
            },
            {
                id: 25,
                title: "Mixagem de Áudio Final",
                team: "Arte (PAV)",
                type: "art",
                color: "var(--art-color)",
                desc: "O PAV ajusta o volume de tudo: a música não pode ser mais alta que o som do tiro, e os efeitos não podem sumir. Eles garantem que todos os áudios tenham a mesma qualidade e que o som não estoure no fone. É o polimento final da parte auditiva do projeto.",
                reason: "Um som desregulado incomoda o jogador e tira toda a imersão que vocês criaram."
            }
        ]
    },
    {
        title: "Fase 6: Lançamento e Marketing",
        steps: [
            {
                id: 26,
                title: "Materiais de Divulgação",
                team: "Design (Publicidade/PAV)",
                type: "art",
                color: "var(--art-color)",
                desc: "A Publicidade e o PAV gravam as melhores jogadas e editam um trailer curto de 30 segundos com música empolgante. Eles tiram prints das partes mais bonitas do jogo pra usar na capa ou em posts. É o material que vocês vão usar pra 'vender' o peixe de vocês pro pessoal.",
                reason: "A maioria das pessoas decide se vai jogar um jogo só de olhar as fotos ou o trailer rápido."
            },
            {
                id: 27,
                title: "Página do Jogo",
                team: "Design (Publicidade)",
                type: "art",
                color: "var(--art-color)",
                desc: "A Publicidade cria uma página (no GitHub Pages ou Itch.io) com a descrição do jogo e o link pra jogar. Eles escrevem um texto chamativo explicando o projeto e colocando os nomes dos integrantes. É a casa oficial do jogo de vocês na internet.",
                reason: "Ter um lugar oficial passa muito mais confiança e facilita pras pessoas compartilharem o link."
            },
            {
                id: 28,
                title: "Testes de Compatibilidade",
                team: "Código (TI)",
                type: "all",
                color: "var(--all-color)",
                desc: "O TI testa o link do jogo em diferentes navegadores (Chrome, Edge) e em outros computadores pra ver se funciona em tudo. O PAV confere se o desenho não ficou esticado ou esquisito em telas de tamanhos diferentes. É a garantia de que o jogo funciona pra todo mundo.",
                reason: "Evita aquela surpresa ruim de 'no meu PC funciona, mas no do professor não'."
            },
            {
                id: 29,
                title: "Fechamento do Build Final",
                team: "Código (TI)",
                type: "ti",
                color: "var(--ti-color)",
                desc: "O grupo decide que não vai mais mexer em nada e gera o arquivo final do jogo. Eles conferem se todos os nomes dos integrantes estão nos créditos e salvam uma cópia segura de tudo. É o momento de 'trancar' o projeto e se preparar pra entrega.",
                reason: "Ficar mudando coisa de última hora sempre gera bug novo, então é melhor parar e garantir o que já funciona."
            },
            {
                id: 30,
                title: "Lançamento e Feedback",
                team: "Geral",
                type: "all",
                color: "var(--all-color)",
                desc: "Vocês liberam o link pro pessoal jogar e ficam de olho no que a galera está falando (se acharam difícil, fácil ou legal). A Publicidade anota os comentários pra vocês saberem o que deu certo pro próximo projeto. É a hora de ver o fruto do trabalho de vocês sendo usado de verdade.",
                reason: "Aprender com o que os outros dizem é o que faz vocês virarem desenvolvedores melhores no futuro."
            }
        ]
    }
];

const roadmapContainer = document.getElementById('roadmap');
const filterBtns = document.querySelectorAll('.filter-btn');

function renderRoadmap(filterValue) {
    roadmapContainer.innerHTML = '';
    
    phases.forEach((phase, phaseIdx) => {
        // Filter the steps based on the selection
        const filteredSteps = phase.steps.filter(step => {
            if (filterValue === 'all') return true;
            // if filter is "ti", show type "ti" and type "all"
            if (filterValue === 'ti' && (step.type === 'ti' || step.type === 'all')) return true;
            // if filter is "art", show type "art" and type "all"
            if (filterValue === 'art' && (step.type === 'art' || step.type === 'all')) return true;
            return false;
        });

        if (filteredSteps.length === 0) return; // Skip phase if empty

        const phaseEl = document.createElement('section');
        phaseEl.className = 'phase-section';
        // Timeout just to stagger the animation of each section rendering
        setTimeout(() => phaseEl.classList.add('visible'), phaseIdx * 100);

        const phaseTitle = document.createElement('h2');
        phaseTitle.className = 'phase-title';
        // Split title to highlight the phase number
        const splitTitle = phase.title.split(':');
        phaseTitle.innerHTML = `<span>${splitTitle[0]}</span>:${splitTitle[1]}`;
        
        const gridEl = document.createElement('div');
        gridEl.className = 'steps-grid';

        filteredSteps.forEach(step => {
            const card = document.createElement('div');
            card.className = 'step-card';
            card.style.setProperty('--tag-color', step.color);
            
            const savedProgress = localStorage.getItem('progress_' + step.id) || 0;
            if (savedProgress == 100) {
                card.classList.add('completed');
            }
            
            card.innerHTML = `
                <div class="step-header">
                    <span class="step-number">${step.id.toString().padStart(2, '0')}</span>
                    <span class="step-tag">${step.team}</span>
                </div>
                <h3 class="step-title">${step.title}</h3>
                <p class="step-desc">${step.desc}</p>
                <div class="step-reason">
                    <strong>Por que fazer isso?</strong>
                    ${step.reason}
                </div>
                <div class="progress-container">
                    <div class="progress-labels">
                        <span>Progresso</span>
                        <span class="progress-percent" id="perc_${step.id}">${savedProgress}%</span>
                    </div>
                    <input type="range" class="progress-slider" min="0" max="100" value="${savedProgress}" data-step-id="${step.id}">
                </div>
            `;
            gridEl.appendChild(card);
        });

        phaseEl.appendChild(phaseTitle);
        phaseEl.appendChild(gridEl);
        roadmapContainer.appendChild(phaseEl);
    });

    // Event Listeners para os sliders criados
    const sliders = document.querySelectorAll('.progress-slider');
    sliders.forEach(slider => {
        slider.addEventListener('input', (e) => {
            const val = e.target.value;
            const stepId = e.target.getAttribute('data-step-id');
            const percentLabel = document.getElementById('perc_' + stepId);
            percentLabel.textContent = val + '%';
            
            const card = e.target.closest('.step-card');
            if(val == 100) {
                card.classList.add('completed');
            } else {
                card.classList.remove('completed');
            }
        });
        
        slider.addEventListener('change', (e) => {
            const val = e.target.value;
            const stepId = e.target.getAttribute('data-step-id');
            localStorage.setItem('progress_' + stepId, val);
        });
    });
}

// Event Listeners para os botões de filtro
filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        filterBtns.forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        
        const filter = e.target.getAttribute('data-filter');
        renderRoadmap(filter);
    });
});

// Animação super rápida no scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

// Initial Render
renderRoadmap('all');

/* =========================================
   SISTEMA DE TABS E HUB DO PROJETO
========================================= */

const navTabs = document.querySelectorAll('.nav-tab');
const viewSections = document.querySelectorAll('.view-section');

// Alternar entre Roadmap e Hub
navTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remover classes ativas
        navTabs.forEach(t => t.classList.remove('active'));
        viewSections.forEach(v => {
            v.classList.remove('active-view');
            v.style.display = 'none';
        });

        // Adicionar classe ativa
        tab.classList.add('active');
        const targetId = tab.getAttribute('data-target');
        const targetView = document.getElementById(targetId);
        targetView.classList.add('active-view');
        targetView.style.display = 'block';
    });
});

// Refer�ncias do Hub
const hubName = document.getElementById('hub-name');
const hubIdea1 = document.getElementById('hub-idea1');
const hubIdea2 = document.getElementById('hub-idea2');
const hubMechanic = document.getElementById('hub-mechanic');
const hubDesign = document.getElementById('hub-design');
const hubLinks = document.getElementById('hub-links');
const addPartBtn = document.getElementById('add-participant-btn');
const partsContainer = document.getElementById('participants-container');
const hubSaveBtn = document.getElementById('hub-save-btn');
const saveStatus = document.getElementById('save-status');

// Helper para criar linha de participante
function createParticipantRow(nameValue = '', roleValue = 'Programador (TI/IA)') {
    const row = document.createElement('div');
    row.className = 'participant-row';
    
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'part-input';
    input.placeholder = 'Nome do Membro';
    input.value = nameValue;

    const select = document.createElement('select');
    select.className = 'part-select';
    
    const options = [
        'Programador (TI/IA)',
        'Artista (PAV)',
        'Publicit�rio/Design',
        'Outro'
    ];
    
    options.forEach(opt => {
        const optionEl = document.createElement('option');
        optionEl.value = opt;
        optionEl.textContent = opt;
        if(opt === roleValue) optionEl.selected = true;
        select.appendChild(optionEl);
    });

    const removeBtn = document.createElement('button');
    removeBtn.className = 'remove-part-btn';
    removeBtn.innerHTML = 'X';
    removeBtn.onclick = () => row.remove();

    row.appendChild(input);
    row.appendChild(select);
    row.appendChild(removeBtn);
    partsContainer.appendChild(row);
}

// L�gica de Carregamento Inicial
function loadHubData() {
    hubName.value = localStorage.getItem('hub-name') || '';
    hubIdea1.value = localStorage.getItem('hub-idea1') || '';
    hubIdea2.value = localStorage.getItem('hub-idea2') || '';
    hubMechanic.value = localStorage.getItem('hub-mechanic') || '';
    hubDesign.value = localStorage.getItem('hub-design') || '';
    hubLinks.value = localStorage.getItem('hub-links') || '';

    const savedParts = JSON.parse(localStorage.getItem('hub-participants')) || [];
    if (savedParts.length > 0) {
        savedParts.forEach(p => createParticipantRow(p.name, p.role));
    } else {
        createParticipantRow(); // Cria um vazio por padr�o
    }
}

// L�gica de Salvamento
hubSaveBtn.addEventListener('click', () => {
    localStorage.setItem('hub-name', hubName.value);
    localStorage.setItem('hub-idea1', hubIdea1.value);
    localStorage.setItem('hub-idea2', hubIdea2.value);
    localStorage.setItem('hub-mechanic', hubMechanic.value);
    localStorage.setItem('hub-design', hubDesign.value);
    localStorage.setItem('hub-links', hubLinks.value);

    // Salvar participantes
    const participants = [];
    const rows = partsContainer.querySelectorAll('.participant-row');
    rows.forEach(row => {
        const name = row.querySelector('.part-input').value;
        const role = row.querySelector('.part-select').value;
        if (name.trim() !== '') {
            participants.push({ name, role });
        }
    });
    localStorage.setItem('hub-participants', JSON.stringify(participants));

    // Mostrar alerta visual "Salvo!"
    saveStatus.classList.add('show');
    setTimeout(() => {
        saveStatus.classList.remove('show');
    }, 2500);
});

addPartBtn.addEventListener('click', () => createParticipantRow());

// Inicia dados ao abrir
loadHubData();
