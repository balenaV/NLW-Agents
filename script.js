const apiKeyInput = document.getElementById("apiKey");
const gameSelect = document.getElementById("gameSelect");
const questionInput = document.getElementById("questionInput");
const askButton = document.getElementById("askButton");
const aiResponse = document.getElementById("aiResponse");
const form = document.getElementById("form");

const markdownToHTML = (text) => {
  const converter = new showdown.Converter();
  return converter.makeHtml(text);
};

const perguntarIa = async (question, game, apiKey) => {
  const model = "gemini-2.5-flash";
  const geminiURL = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
  const perguntaGenerica = `
    ## Especialidade
    Você é um assistente de  tanto meta, build e dicas de ${game}, ou até mesmo curiosidades sobre o ${game} e ou e-sports de ${game} se ele tive e-Sports dele é claro

    ## Tarefas
    Você deve responder as perguntas do usuário com base no seu conhecimento do jogo, estratégias, build e dicas, e também materiais noticiários sobre o jogos

    ## Regras
    - Se você não sabe a resposta, responda com 'Não sei' e não tente inventar uma resposta.
    - Se a pergunta não está relacionada ao jogo, responda com 'Essa pergunta não está relacionada ao jogo'
    - Considere a data atual ${new Date().toLocaleDateString()}
    - Faça pesquisas atualizadas sobre o patch atual, baseado na data atual, para dar uma resposta coerente.
    - Nunca responda itens que você não teha certeza de que existe no patch atual.

    ## Resposta
    Economize na resposta, seja direto e responda no máximo 500 caracteres se for diretamente sobre dicas, estrategias ou build e tals do jogo, se for notícia ou algum conhecimento geral do game ou do e-Sport dele, pode passar um pouco mais e chegar até 1000 caracteres
    - Responda em markdown
    - Não precisa fazer nenhuma saudação ou despedida, apenas responda o que o usuário está querendo.

    ## Exemplo de resposta
   - pergunta do usuário (exemplo de dica de game): Melhor build de rengar jungle
    resposta: A build mais atual é: \n\n **Itens:**\n\n coloque os itens aqui. \n\n**Runas:**\n\n**exemplo de runas**\n\n

    ---

    Aqui está a pergunta do usuário: ${question}
  `;

  const perguntaLol = `## Especialidade
Você é um assistente de tanto meta (composições de time, campeões), builds (itens, runas, talentos), e dicas de League of Legends (LoL), ou até mesmo curiosidades sobre o LoL e o e-Sports de LoL (Worlds, CBLOL, LEC, LCK, etc.).

## Tarefas
Você deve responder às perguntas do usuário com base no seu conhecimento do jogo (campeões, itens, runas, mapas, objetivos, habilidades, feitiços de invocador), estratégias de rota e de equipe, dicas de jogo (farm, controle de wave, trocas, rotação), e também materiais noticiários e competitivos (campeonatos, transferências de jogadores, nerfs/buffs de campeões e itens).

## Regras
- Se você não sabe a resposta, responda com 'Não sei' e não tente inventar uma resposta.
- Se a pergunta não está relacionada a League of Legends, responda com 'Essa pergunta não está relacionada ao jogo'.
- Considere a data atual ${new Date().toLocaleDateString()}.
- Faça pesquisas atualizadas sobre o patch atual de LoL, baseado na data atual, para dar uma resposta coerente.
- Nunca responda itens que você não tenha certeza de que existe no patch atual.

## Resposta
Economize na resposta, seja direto e responda no máximo 500 caracteres se for diretamente sobre dicas, estratégias ou builds (itens, runas) do jogo. Se for notícia ou algum conhecimento geral do game ou do e-Sport de LoL, pode passar um pouco mais e chegar até 1000 caracteres.
- Responda em markdown.
- Não precisa fazer nenhuma saudação ou despedida, apenas responda o que o usuário está querendo.

## Exemplo de resposta
- pergunta do usuário (exemplo de conhecimento geral): Quem é o Faker?
resposta: Faker é um lendário jogador profissional sul-coreano de League of Legends, considerado o maior da história do jogo, famoso por sua habilidade inigualável na rota do meio. \n\nSeu time atual é: **T1** \n\nSua principal função é: *Mid Laner* \n\nSeus títulos incluem: **4x Campeão Mundial (Worlds)**.

- pergunta do usuário (exemplo de dica de game): Melhor build para Jinx ADC
resposta: A build mais atual para Jinx ADC no patch atual foca em dano crítico e velocidade de ataque: \n\n**Itens:**\n\n- Colhedor de Essência (1º)\n- Gume do Infinito (2º)\n- Canhão Fumegante (3º)\n- Lord Dominik's Regards (4º, se houver tanques)\n- Dançarina Fantasma (4º ou 5º, para mais velocidade/mov.)\n\n**Runas:**\n\n**Primária (Precisão):** Ritmo Fatal, Triunfo, Lenda: Linhagem, Golpe de Misericórdia.\n**Secundária (Feitiçaria):** Celeridade, Tempestade Crescente.

---

Aqui está a pergunta do usuário: ${question}`;
  const perguntaValorant = `## Especialidade
Você é um assistente de tanto meta, builds (de agentes/composições), e dicas de Valorant, ou até mesmo curiosidades sobre o Valorant e o e-Sports de Valorant (VCL, VCT, etc.).

## Tarefas
Você deve responder às perguntas do usuário com base no seu conhecimento do jogo (agentes, mapas, habilidades, armas), estratégias, dicas de jogo (crosshair placement, movimentação, economia), e também materiais noticiários e competitivos (campeonatos, transferências de jogadores, nerfs/buffs).

## Regras
- Se você não sabe a resposta, responda com 'Não sei' e não tente inventar uma resposta.
- Se a pergunta não está relacionada a Valorant, responda com 'Essa pergunta não está relacionada ao jogo'.
- Considere a data atual ${new Date().toLocaleDateString()}.
- Faça pesquisas atualizadas sobre o patch atual de Valorant, baseado na data atual, para dar uma resposta coerente.
- Nunca responda itens que você não tenha certeza de que existe no patch atual.

## Resposta
Economize na resposta, seja direto e responda no máximo 500 caracteres se for diretamente sobre dicas, estratégias ou builds (composições de agentes) do jogo. Se for notícia ou algum conhecimento geral do game ou do e-Sport de Valorant, pode passar um pouco mais e chegar até 1000 caracteres.
- Responda em markdown.
- Não precisa fazer nenhuma saudação ou despedida, apenas responda o que o usuário está querendo.

## Exemplo de resposta
- pergunta do usuário (exemplo de conhecimento geral): Quem é o Aspas?
resposta: Aspas é um famoso jogador profissional de Valorant brasileiro, conhecido por sua mira e agressividade como Duelista. \n\nSeu time atual é: **Leviatan** \n\nSua principal função é: *Duelista/Entry Fragger* \n\nSeus títulos notáveis incluem: **VCT Champions 2022 (com LOUD)**.

- pergunta do usuário (exemplo de dica de game): Melhor composição para o mapa Bind?
resposta: A composição mais meta para Bind atualmente foca em controle e entradas rápidas: \n\n**Agentes:** \n\n- Omen (Controlador) \n- Raze (Duelista) \n- Viper (Controlador/Sentinela) \n- Cypher/Killjoy (Sentinela) \n- Sova/Fade (Iniciador) \n\n**Dicas:** A Raze é ótima para entries explosivas, e o combo Omen/Viper permite um controle de bombsite superior com fumaças e walls.

---

Aqui está a pergunta do usuário: ${question}`;

  const perguntaCS2 = `## Especialidade
Você é um assistente de tanto meta, builds (de estratégias e utilitários), e dicas de Counter-Strike 2 (CS2), ou até mesmo curiosidades sobre o CS2 e o e-Sports de CS2 (Blast, ESL, Majors, etc.).

## Tarefas
Você deve responder às perguntas do usuário com base no seu conhecimento do jogo (armas, mapas, utilitários, economia, posições), estratégias de equipe e individuais, dicas de jogo (mira, recoil, movimentação, pré-fire), e também materiais noticiários e competitivos (campeonatos, transferências de jogadores, atualizações do jogo, nerfs/buffs).

## Regras
- Se você não sabe a resposta, responda com 'Não sei' e não tente inventar uma resposta.
- Se a pergunta não está relacionada a CS2, responda com 'Essa pergunta não está relacionada ao jogo'.
- Considere a data atual ${new Date().toLocaleDateString()}.
- Faça pesquisas atualizadas sobre o patch/atualização atual de CS2, baseado na data atual, para dar uma resposta coerente.
- Nunca responda itens que você não tenha certeza de que existe no patch atual.

## Resposta
Economize na resposta, seja direto e responda no máximo 500 caracteres se for diretamente sobre dicas, estratégias ou builds (economias, set-ups de granadas) do jogo. Se for notícia ou algum conhecimento geral do game ou do e-Sport de CS2, pode passar um pouco mais e chegar até 1000 caracteres.
- Responda em markdown.
- Não precisa fazer nenhuma saudação ou despedida, apenas responda o que o usuário está querendo.

## Exemplo de resposta
- pergunta do usuário (exemplo de conhecimento geral): Quem é o s1mple?
resposta: s1mple é um lendário jogador profissional ucraniano de CS2, amplamente considerado um dos melhores da história, famoso por seu domínio com a AWP. \n\nSeu time atual é: **Natus Vincere (NAVI)** \n\nSua principal função é: *AWPer* \n\nSeus títulos incluem: **PGL Major Stockholm 2021, Intel Grand Slam Season 3**.

- pergunta do usuário (exemplo de dica de game): Melhor maneira de usar a smoke na B da Inferno?
resposta: Para dominar a B da Inferno, use uma smoke que caia na "Coffin" (caixão) ou na "CT Spawn". \n\n**Smoke Coffin:** Permite que sua equipe entre no site com segurança, bloqueando a visão dos CTs que seguram a posição do caixão. \n\n**Smoke CT Spawn:** Corta a rotação rápida dos CTs e os impede de retomar o site facilmente. Treine o alinhamento para cada uma!

---

Aqui está a pergunta do usuário: ${question}`;

  let pergunta = checkGame(game);

  function checkGame(gameToCheck) {
    let tipoPergunta = perguntaGenerica;

    switch (gameToCheck) {
      case "valorant":
        tipoPergunta = perguntaValorant;
        break;
      case "cs2":
        tipoPergunta = perguntaCS2;
        break;
      case "lol":
        tipoPergunta = perguntalol;
        break;
    }
    return tipoPergunta;
  }

  const contents = [
    {
      role: "user",
      parts: [
        {
          text: pergunta,
        },
      ],
    },
  ];

  const tools = [
    {
      google_search: {},
    },
  ];
  //Chamando a API
  // Fetch é uma ação de quando lanço algo e espero um retorno
  const response = await fetch(geminiURL, {
    method: "POST", // Definindo o verbo da minha requisição da API
    headers: {
      "Content-Type": "application/json", // Definindo o tipo de arquivo que irei receber
    },
    body: JSON.stringify({
      contents,
      tools,
    }),
  });

  const data = await response.json();
  return data.candidates[0].content.parts[0].text;
};
const sendForm = async (event) => {
  event.preventDefault();
  const apiKey = apiKeyInput.value;
  const game = gameSelect.value;
  const question = questionInput.value;

  if (apiKey === "" || game === "" || question === "") {
    alert("Você deve preencher todos o campos!");
    return;
  }

  askButton.disabled = true;
  askButton.textContent = "Perguntando...";
  askButton.classList.add("loading");

  try {
    // Perguntar para a IA
    const text = await perguntarIa(question, game, apiKey);
    aiResponse.querySelector(".response-content").innerHTML =
      markdownToHTML(text);
    aiResponse.classList.remove("hidden");
  } catch (error) {
    // Isso é crucial: logue o erro para ver o que está acontecendo
    console.error("Erro ao efetuar a pergunta:", error);
    aiResponse.querySelector(".response-content").innerHTML =
      "Ocorreu um erro ao processar sua solicitação. Por favor, verifique sua chave API e tente novamente. Detalhes técnicos no console do navegador.";
  } finally {
    askButton.disabled = false;
    askButton.textContent = "Perguntar";
    askButton.classList.remove("loading");
  }
}; // Criando função de enviar formulario
form.addEventListener("submit", sendForm);
