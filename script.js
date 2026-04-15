const phases = [
    {
        title: "Fase 1: Ideia e Planejamento",
        steps: [
            {
                id: 1,
                title: "CriaÃ§Ã£o do GDD",
                team: "Geral (MecÃ¢nica e Design)",
                type: "all",
                color: "var(--all-color)",
                desc: "Nessa parte, a galera escreve tudo o que o jogo vai ter: os poderes, como ganha, como perde e qual Ã© a histÃ³ria. Ã‰ tipo a 'bÃ­blia' do projeto pra todo mundo saber o que estÃ¡ acontecendo sem precisar perguntar toda hora. Se o plano mudar no meio, o documento tem que ser atualizado pra ninguÃ©m programar coisa errada.",
                reason: "Sem um plano escrito, cada um faz o que quer e, no final, as partes do jogo nÃ£o se encaixam."
            },
            {
                id: 2,
                title: "AnÃ¡lise de Viabilidade",
                team: "CÃ³digo (TI e IA)",
                type: "ti",
                color: "var(--ti-color)",
                desc: "O pessoal de TI e IA senta pra decidir se o que o PAV quer fazer (tipo um grÃ¡fico pesadÃ£o) roda de verdade na engine escolhida. Eles testam se os scripts de IA nÃ£o vÃ£o travar o jogo ou deixar tudo lento demais no computador da galera. Ã‰ a hora de ver se a ideia de vocÃªs Ã© possÃ­vel de fazer ou se Ã© viagem demais.",
                reason: "Evita que vocÃªs percam semanas fazendo algo que o computador nÃ£o aguenta rodar depois."
            },
            {
                id: 3,
                title: "Guia de Estilo Visual",
                team: "Arte (PAV)",
                type: "art",
                color: "var(--art-color)",
                desc: "O pessoal de PAV monta um mural com fotos, cores e desenhos que mostram como o jogo vai ser: se Ã© sombrio, colorido ou pixel art. Eles definem as regras visuais pra que o jogo tenha uma cara Ãºnica e nÃ£o pareÃ§a um monte de desenhos aleatÃ³rios misturados. Isso ajuda o TI a saber como configurar as luzes e cores do jogo no cÃ³digo.",
                reason: "Garante que o jogo seja bonito e que todas as fases pareÃ§am do mesmo universo."
            },
            {
                id: 4,
                title: "Identidade da Marca",
                team: "Design (Publicidade)",
                type: "art",
                color: "var(--art-color)",
                desc: "A pessoa de Publicidade pensa num nome que chame atenÃ§Ã£o e numa logo que seja marcante para o projeto. Ela estuda o que a galera da nossa idade gosta de jogar pra ver se o jogo de vocÃªs tem chance de bombar. Ã‰ o comeÃ§o de transformar o cÃ³digo e o desenho em um produto que as pessoas queiram baixar.",
                reason: "Um jogo bom com nome ruim ou sem marca ninguÃ©m clica pra ver como Ã©."
            },
            {
                id: 5,
                title: "ConfiguraÃ§Ã£o do RepositÃ³rio",
                team: "CÃ³digo (TI)",
                type: "ti",
                color: "var(--ti-color)",
                desc: "O TI cria o lugar (tipo um GitHub) onde todo mundo vai subir os arquivos, separando cÃ³digo, som e desenho. Eles criam regras pra ninguÃ©m apagar o arquivo do outro sem querer ou mandar um arquivo com nome estranho tipo 'final_v2_agora_vai'. Ã‰ a parte da organizaÃ§Ã£o que salva a vida de todo mundo no final.",
                reason: "Sem isso, vira uma confusÃ£o de arquivos e vocÃªs perdem horas procurando onde tÃ¡ a Ãºltima versÃ£o do jogo."
            }
        ]
    },
    {
        title: "Fase 2: ProtÃ³tipo e LÃ³gica Base",
        steps: [
            {
                id: 6,
                title: "Greyboxing (Fase Cinza)",
                team: "MecÃ¢nica (TI)",
                type: "ti",
                color: "var(--ti-color)",
                desc: "O TI cria as fases usando sÃ³ quadrados e cÃ­rculos cinzas pra ver se os saltos e o caminho estÃ£o legais. O pessoal de PAV fica de olho pra ver o tamanho que os desenhos dos personagens precisam ter pra caber nesses espaÃ§os. Ã‰ a hora de testar se o jogo Ã© divertido mesmo antes de ele estar bonito.",
                reason: "Ã‰ mais fÃ¡cil mudar um quadrado de lugar do que ter que refazer um desenho inteiro porque a fase ficou curta."
            },
            {
                id: 7,
                title: "ProgramaÃ§Ã£o de Movimento",
                team: "CÃ³digo (TI)",
                type: "ti",
                color: "var(--ti-color)",
                desc: "Aqui o TI foca em fazer o personagem andar, pular e interagir com as coisas de um jeito que nÃ£o seja travado. Eles ajustam a velocidade e a gravidade pra que o jogador sinta que tem o controle total da situaÃ§Ã£o. Enquanto isso, o PAV jÃ¡ comeÃ§a a rascunhar as primeiras animaÃ§Ãµes baseadas nessas velocidades.",
                reason: "Se o controle do personagem for ruim, o jogador desiste nos primeiros 10 segundos, nÃ£o importa o grÃ¡fico."
            },
            {
                id: 8,
                title: "LÃ³gica de IA Inimiga",
                team: "CÃ³digo (IA)",
                type: "ti",
                color: "var(--ti-color)",
                desc: "O pessoal de IA programa a lÃ³gica simples pros vilÃµes: eles precisam saber quando o jogador chega perto pra comeÃ§ar a perseguir. Eles criam as 'regras de decisÃ£o', tipo: 'se o jogador pular, atire' ou 'se ele chegar perto, bata'. Ã‰ o que faz o jogo deixar de ser um deserto e comeÃ§ar a ter perigo de verdade.",
                reason: "Inimigos parados ou burros deixam o jogo sem graÃ§a e sem nenhum desafio pro jogador."
            },
            {
                id: 9,
                title: "Efeitos de Som Base",
                team: "PAV",
                type: "art",
                color: "var(--art-color)",
                desc: "O PAV grava ou procura sons curtos pra cada aÃ§Ã£o: barulho de tiro, de moeda caindo ou do personagem pulando. O TI coloca esses sons no cÃ³digo pra que eles toquem exatamente na hora que a aÃ§Ã£o acontece na tela. Isso dÃ¡ uma sensaÃ§Ã£o de que o jogo tÃ¡ 'vivo' e respondendo ao jogador.",
                reason: "O som ajuda o jogador a entender o que aconteceu sem ele precisar ler nada na tela."
            },
            {
                id: 10,
                title: "Desenho da Interface (UI)",
                team: "Design (Publicidade/PAV)",
                type: "art",
                color: "var(--art-color)",
                desc: "A Publicidade e o PAV desenham a barra de vida, o inventÃ¡rio e o menu inicial pra ficarem fÃ¡ceis de usar. O TI programa pra que, quando o personagem tome dano, a barrinha de vida diminua de verdade na tela. Ã‰ a camada que explica ao usuÃ¡rio o que estÃ¡ acontecendo com a saÃºde e os itens dele.",
                reason: "Se o jogador nÃ£o souber quanta vida tem ou onde clicar pra comeÃ§ar, ele fica frustrado e fecha o jogo."
            }
        ]
    },
    {
        title: "Fase 3: Deixando o Jogo Bonito",
        steps: [
            {
                id: 11,
                title: "CriaÃ§Ã£o de Assets Finais",
                team: "Arte (PAV)",
                type: "art",
                color: "var(--art-color)",
                desc: "O PAV joga fora os blocos cinzas e coloca os desenhos oficiais, cenÃ¡rios detalhados e personagens coloridos. Eles fazem as texturas e os detalhes que dÃ£o personalidade pro jogo, seguindo o estilo definido na Etapa 3. O TI ajuda a importar tudo pra dentro da engine sem deixar o jogo pesado demais.",
                reason: "Ã‰ o visual que atrai o jogador e faz ele querer explorar o mundo que vocÃªs criaram."
            },
            {
                id: 12,
                title: "NavegaÃ§Ã£o de IA (Pathfinding)",
                team: "CÃ³digo (IA)",
                type: "ti",
                color: "var(--ti-color)",
                desc: "O time de IA programa como os inimigos desviam de buracos e paredes pra chegar atÃ© o jogador sem ficar travados. Eles usam cÃ³digos pra IA entender qual Ã© o caminho mais curto e inteligente dentro do mapa. Isso evita que os vilÃµes fiquem andando contra a parede que nem baratas tontas.",
                reason: "Uma IA que sabe navegar deixa o jogo muito mais profissional e difÃ­cil de vencer."
            },
            {
                id: 13,
                title: "AnimaÃ§Ãµes de Personagem",
                team: "Arte (PAV)",
                type: "art",
                color: "var(--art-color)",
                desc: "O PAV faz os frames do personagem correndo, batendo e caindo pra que tudo pareÃ§a fluido e natural. O TI liga esses desenhos ao cÃ³digo pra que, quando vocÃª aperta o botÃ£o, a animaÃ§Ã£o certa comece na hora. Ã‰ aqui que o personagem ganha vida e parece que ele realmente estÃ¡ se movendo.",
                reason: "AnimaÃ§Ãµes bem feitas fazem o jogo parecer profissional e nÃ£o um projeto travado."
            },
            {
                id: 14,
                title: "MÃºsica e AmbiÃªncia",
                team: "Arte (PAV)",
                type: "art",
                color: "var(--art-color)",
                desc: "O PAV compÃµe ou escolhe mÃºsicas que combinam com o clima das fases e cria sons de fundo, como vento ou mÃ¡quinas. O TI faz com que o som mude de volume dependendo de onde o jogador estÃ¡ no mapa (distÃ¢ncia). Ã‰ o que preenche o silÃªncio e cria a atmosfera do jogo.",
                reason: "A mÃºsica certa mexe com o sentimento do jogador e deixa a experiÃªncia muito mais imersiva."
            },
            {
                id: 15,
                title: "Efeitos Especiais (VFX)",
                team: "PAV e CÃ³digo (TI)",
                type: "all",
                color: "var(--all-color)",
                desc: "O pessoal de PAV e TI cria as partÃ­culas: fumaÃ§a saindo do pÃ©, explosÃµes, faÃ­scas ou brilhos de magia. Esses efeitos nÃ£o tÃªm fÃ­sica, servem sÃ³ pra deixar as aÃ§Ãµes mais 'impactantes' e bonitas visualmente. Ã‰ o 'tempero' final que faz as lutas e aÃ§Ãµes parecerem poderosas.",
                reason: "Sem efeitos, as aÃ§Ãµes do jogo parecem 'secas', tirando a empolgaÃ§Ã£o de realizar ataques ou ganhar prÃªmios."
            }
        ]
    },
    {
        title: "Fase 4: Sistemas e HistÃ³ria",
        steps: [
            {
                id: 16,
                title: "Script de HistÃ³ria",
                team: "Design e CÃ³digo (TI)",
                type: "all",
                color: "var(--all-color)",
                desc: "O PAV e o TI criam momentos onde o jogo para um pouco pra mostrar um diÃ¡logo ou algo quebrando no cenÃ¡rio. SÃ£o pequenos textos ou cenas que explicam por que o personagem estÃ¡ ali e qual Ã© a missÃ£o dele. Isso dÃ¡ um motivo pro jogador querer chegar atÃ© o final da fase.",
                reason: "A histÃ³ria faz o jogador se importar com o personagem e querer ver o que acontece depois."
            },
            {
                id: 17,
                title: "Ã�udio DinÃ¢mico",
                team: "PAV e CÃ³digo (TI)",
                type: "all",
                color: "var(--all-color)",
                desc: "O PAV faz a mÃºsica mudar sozinha: se o bicho pegar, a mÃºsica fica rÃ¡pida; se a Ã¡rea estiver limpa, ela volta a ser calma. O TI programa essa transiÃ§Ã£o pra ser suave, sem cortes que estraguem o clima do momento. Ã‰ um nÃ­vel a mais de qualidade que mostra que o grupo Ã© dedicado.",
                reason: "A mÃºsica reativa manipula a adrenalina do jogador na hora certa do combate."
            },
            {
                id: 18,
                title: "IA de Combate em Grupo",
                team: "CÃ³digo (IA)",
                type: "ti",
                color: "var(--ti-color)",
                desc: "A galera de IA faz os inimigos trabalharem juntos: enquanto um atira de longe, o outro tenta cercar o jogador por trÃ¡s. Eles param de agir sozinhos e comeÃ§am a ter tÃ¡ticas de equipe pra dificultar a vida de quem estÃ¡ jogando. Isso obriga o jogador a pensar em estratÃ©gias e nÃ£o sÃ³ sair batendo.",
                reason: "Inimigos coordenados criam um desafio muito mais inteligente e satisfatÃ³rio de vencer."
            },
            {
                id: 19,
                title: "Sistema de EvoluÃ§Ã£o (XP)",
                team: "MecÃ¢nica (TI)",
                type: "ti",
                color: "var(--ti-color)",
                desc: "O TI cria a lÃ³gica de coletar itens que aumentam a forÃ§a ou dÃ£o novos poderes pro personagem conforme ele joga. Eles fazem as contas de quanto o jogador precisa evoluir pra conseguir passar de um chefe difÃ­cil. A Publicidade confere se esses nomes de poderes sÃ£o legais e fÃ¡ceis de entender.",
                reason: "Ganhar coisas novas e ficar mais forte Ã© o que vicia o jogador e faz ele querer continuar."
            },
            {
                id: 20,
                title: "RevisÃ£o de Textos",
                team: "Design (Publicidade)",
                type: "art",
                color: "var(--art-color)",
                desc: "A Publicidade revisa todos os diÃ¡logos e nomes de menus pra conferir se nÃ£o tem erro de portuguÃªs ou gÃ­rias erradas. Eles garantem que a histÃ³ria faÃ§a sentido e que as instruÃ§Ãµes de como jogar estejam bem claras. Ã‰ a etapa de garantir que a comunicaÃ§Ã£o do jogo estÃ¡ perfeita.",
                reason: "Erro de portuguÃªs ou texto confuso faz o projeto parecer desleixado e mal feito."
            }
        ]
    },
    {
        title: "Fase 5: Polimento e Testes",
        steps: [
            {
                id: 21,
                title: "OtimizaÃ§Ã£o de Performance",
                team: "CÃ³digo (TI) e PAV",
                type: "all",
                color: "var(--all-color)",
                desc: "O TI limpa o cÃ³digo pra tirar coisas inÃºteis e o PAV diminui o peso das imagens sem perder a qualidade. Eles testam se o jogo abre rÃ¡pido e se nÃ£o vai travar no navegador ou esquentar o PC. Ã‰ garantir que o jogo seja 'leve' pra qualquer um conseguir jogar sem problemas.",
                reason: "NinguÃ©m gosta de jogo que fica dando 'lag' ou que demora 10 minutos pra carregar."
            },
            {
                id: 22,
                title: "Balanceamento de Dificuldade",
                team: "MecÃ¢nica (TI)",
                type: "ti",
                color: "var(--ti-color)",
                desc: "A galera joga o prÃ³prio jogo vÃ¡rias vezes pra ver se o primeiro boss nÃ£o estÃ¡ impossÃ­vel ou se o jogo estÃ¡ fÃ¡cil demais. Eles mudam os nÃºmeros de dano e vida atÃ© achar o ponto certo onde o jogo Ã© difÃ­cil, mas justo. Ã‰ a etapa onde vocÃªs decidem o nÃ­vel do desafio.",
                reason: "Um jogo desequilibrado ou irrita o jogador (muito difÃ­cil) ou dÃ¡ tÃ©dio (muito fÃ¡cil)."
            },
            {
                id: 23,
                title: "PÃ³s-Processamento Visual",
                team: "Arte (PAV)",
                type: "art",
                color: "var(--art-color)",
                desc: "O PAV passa um 'filtro' no jogo inteiro pra deixar as cores mais bonitas ou o clima mais cinematogrÃ¡fico (tipo luzes e sombras). Eles ajustam o brilho pra que tudo combine perfeitamente com a trilha sonora e com a histÃ³ria. Ã‰ o toque final de arte que deixa o jogo com cara de profissional.",
                reason: "Pequenos ajustes de luz podem mudar totalmente a 'vibe' do jogo e deixÃ¡-lo muito mais atraente."
            },
            {
                id: 24,
                title: "Debugging (CaÃ§a aos Bugs)",
                team: "Geral (TI e IA)",
                type: "all",
                color: "var(--all-color)",
                desc: "Todo mundo do grupo vira 'testador' e tenta quebrar o jogo de todas as formas: pulando onde nÃ£o deve ou apertando vÃ¡rios botÃµes. O TI anota tudo o que deu errado e vai consertando um por um atÃ© o jogo estar liso. Ã‰ a garantia de que nÃ£o vai travar na hora da apresentaÃ§Ã£o.",
                reason: "Bugs na hora da nota acabam com a moral do grupo, entÃ£o tem que testar muito."
            },
            {
                id: 25,
                title: "Mixagem de Ã�udio Final",
                team: "Arte (PAV)",
                type: "art",
                color: "var(--art-color)",
                desc: "O PAV ajusta o volume de tudo: a mÃºsica nÃ£o pode ser mais alta que o som do tiro, e os efeitos nÃ£o podem sumir. Eles garantem que todos os Ã¡udios tenham a mesma qualidade e que o som nÃ£o estoure no fone. Ã‰ o polimento final da parte auditiva do projeto.",
                reason: "Um som desregulado incomoda o jogador e tira toda a imersÃ£o que vocÃªs criaram."
            }
        ]
    },
    {
        title: "Fase 6: LanÃ§amento e Marketing",
        steps: [
            {
                id: 26,
                title: "Materiais de DivulgaÃ§Ã£o",
                team: "Design (Publicidade/PAV)",
                type: "art",
                color: "var(--art-color)",
                desc: "A Publicidade e o PAV gravam as melhores jogadas e editam um trailer curto de 30 segundos com mÃºsica empolgante. Eles tiram prints das partes mais bonitas do jogo pra usar na capa ou em posts. Ã‰ o material que vocÃªs vÃ£o usar pra 'vender' o peixe de vocÃªs pro pessoal.",
                reason: "A maioria das pessoas decide se vai jogar um jogo sÃ³ de olhar as fotos ou o trailer rÃ¡pido."
            },
            {
                id: 27,
                title: "PÃ¡gina do Jogo",
                team: "Design (Publicidade)",
                type: "art",
                color: "var(--art-color)",
                desc: "A Publicidade cria uma pÃ¡gina (no GitHub Pages ou Itch.io) com a descriÃ§Ã£o do jogo e o link pra jogar. Eles escrevem um texto chamativo explicando o projeto e colocando os nomes dos integrantes. Ã‰ a casa oficial do jogo de vocÃªs na internet.",
                reason: "Ter um lugar oficial passa muito mais confianÃ§a e facilita pras pessoas compartilharem o link."
            },
            {
                id: 28,
                title: "Testes de Compatibilidade",
                team: "CÃ³digo (TI)",
                type: "all",
                color: "var(--all-color)",
                desc: "O TI testa o link do jogo em diferentes navegadores (Chrome, Edge) e em outros computadores pra ver se funciona em tudo. O PAV confere se o desenho nÃ£o ficou esticado ou esquisito em telas de tamanhos diferentes. Ã‰ a garantia de que o jogo funciona pra todo mundo.",
                reason: "Evita aquela surpresa ruim de 'no meu PC funciona, mas no do professor nÃ£o'."
            },
            {
                id: 29,
                title: "Fechamento do Build Final",
                team: "CÃ³digo (TI)",
                type: "ti",
                color: "var(--ti-color)",
                desc: "O grupo decide que nÃ£o vai mais mexer em nada e gera o arquivo final do jogo. Eles conferem se todos os nomes dos integrantes estÃ£o nos crÃ©ditos e salvam uma cÃ³pia segura de tudo. Ã‰ o momento de 'trancar' o projeto e se preparar pra entrega.",
                reason: "Ficar mudando coisa de Ãºltima hora sempre gera bug novo, entÃ£o Ã© melhor parar e garantir o que jÃ¡ funciona."
            },
            {
                id: 30,
                title: "LanÃ§amento e Feedback",
                team: "Geral",
                type: "all",
                color: "var(--all-color)",
                desc: "VocÃªs liberam o link pro pessoal jogar e ficam de olho no que a galera estÃ¡ falando (se acharam difÃ­cil, fÃ¡cil ou legal). A Publicidade anota os comentÃ¡rios pra vocÃªs saberem o que deu certo pro prÃ³ximo projeto. Ã‰ a hora de ver o fruto do trabalho de vocÃªs sendo usado de verdade.",
                reason: "Aprender com o que os outros dizem Ã© o que faz vocÃªs virarem desenvolvedores melhores no futuro."
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

// Event Listeners para os botÃµes de filtro
filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        filterBtns.forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        
        const filter = e.target.getAttribute('data-filter');
        renderRoadmap(filter);
    });
});

// AnimaÃ§Ã£o super rÃ¡pida no scroll
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

// Referências do Hub
const hubName = document.getElementById('hub-name');
const hubMechanic = document.getElementById('hub-mechanic');
const hubDesign = document.getElementById('hub-design');
const hubLinks = document.getElementById('hub-links');
const addPartBtn = document.getElementById('add-participant-btn');
const partsContainer = document.getElementById('participants-container');
const addIdeaBtn = document.getElementById('add-idea-btn');
const ideasContainer = document.getElementById('ideas-container');
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
        'Publicitário/Design',
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

// Helper para criar área de texto dinâmica para Ideias
function createIdeaRow(ideaValue = '') {
    const row = document.createElement('div');
    row.className = 'participant-row'; // Reaproveitando estilos de flex layout
    
    const textarea = document.createElement('textarea');
    textarea.className = 'hub-textarea part-input';
    textarea.placeholder = 'Escreva aqui o conceito da ideia...';
    textarea.style.minHeight = '80px';
    textarea.value = ideaValue;

    const removeBtn = document.createElement('button');
    removeBtn.className = 'remove-part-btn';
    removeBtn.innerHTML = 'X';
    removeBtn.style.alignSelf = 'flex-start';
    removeBtn.style.padding = '0.5rem 1rem';
    removeBtn.onclick = () => row.remove();

    row.appendChild(textarea);
    row.appendChild(removeBtn);
    ideasContainer.appendChild(row);
}

// Lógica de Carregamento Inicial
function loadHubData() {
    hubName.value = localStorage.getItem('hub-name') || '';
    hubMechanic.value = localStorage.getItem('hub-mechanic') || '';
    hubDesign.value = localStorage.getItem('hub-design') || '';
    hubLinks.value = localStorage.getItem('hub-links') || '';

    const savedParts = JSON.parse(localStorage.getItem('hub-participants')) || [];
    if (savedParts.length > 0) {
        savedParts.forEach(p => createParticipantRow(p.name, p.role));
    } else {
        createParticipantRow(); // Cria um vazio por padrão
    }

    const savedIdeas = JSON.parse(localStorage.getItem('hub-ideas')) || [];
    if (savedIdeas.length > 0) {
        savedIdeas.forEach(i => createIdeaRow(i));
    } else {
        createIdeaRow(); // Cria uma ideia padrão
    }
}

// Lógica de Salvamento
hubSaveBtn.addEventListener('click', () => {
    localStorage.setItem('hub-name', hubName.value);
    localStorage.setItem('hub-mechanic', hubMechanic.value);
    localStorage.setItem('hub-design', hubDesign.value);
    localStorage.setItem('hub-links', hubLinks.value);

    // Salvar participantes
    const participants = [];
    const pRows = partsContainer.querySelectorAll('.participant-row');
    pRows.forEach(row => {
        const name = row.querySelector('.part-input').value;
        const role = row.querySelector('.part-select').value;
        if (name.trim() !== '') {
            participants.push({ name, role });
        }
    });
    localStorage.setItem('hub-participants', JSON.stringify(participants));

    // Salvar ideias
    const ideas = [];
    const iRows = ideasContainer.querySelectorAll('.participant-row textarea');
    iRows.forEach(textarea => {
        if (textarea.value.trim() !== '') {
            ideas.push(textarea.value);
        }
    });
    localStorage.setItem('hub-ideas', JSON.stringify(ideas));

    // Mostrar alerta visual "Salvo!"
    saveStatus.classList.add('show');
    setTimeout(() => {
        saveStatus.classList.remove('show');
    }, 2500);
});

addPartBtn.addEventListener('click', () => createParticipantRow());
addIdeaBtn.addEventListener('click', () => createIdeaRow());

// Inicia dados ao abrir
loadHubData();
