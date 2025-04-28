// Obtém os elementos do DOM necessários para manipulação
const nomesInput = document.getElementById("nomes");
const modeSelect = document.getElementById("selecao");
const teamsInputGroup = document.getElementById("grupotimes");
const teamsInput = document.getElementById("equipes");
const drawButton = document.getElementById("sorteio");
const result = document.getElementById("resultado");

// Adiciona um evento para alterar a exibição do campo de equipes com base no modo selecionado
modeSelect.addEventListener("change", () => {
  if (modeSelect.value === "teams") {
    // Mostra o campo de entrada para o número de equipes
    teamsInputGroup.classList.remove("d-none");
  } else {
    // Esconde o campo de entrada para o número de equipes
    teamsInputGroup.classList.add("d-none");
  }
});

// Adiciona um evento para realizar o sorteio ao clicar no botão
drawButton.addEventListener("click", () => {
  // Obtém os nomes inseridos, separa por quebra de linha, vírgula ou ponto e vírgula, e remove espaços extras
  const nomes = nomesInput.value
    .split(/[\n,;]+/)
    .map((name) => name.trim())
    .filter((name) => name.length > 0);

  // Obtém o modo selecionado (individual ou equipes)
  const mode = modeSelect.value;

  // Verifica se há pelo menos um nome inserido
  if (nomes.length === 0) {
    result.innerHTML =
      '<div class="alert alert-danger">Por favor, insira ao menos um nome.</div>';
    return;
  }

  // Verifica se há pelo menos dois nomes para o modo de equipes
  if (mode === "teams" && nomes.length < 2) {
    result.innerHTML =
      '<div class="alert alert-danger">Por favor, insira ao menos dois nomes para formar equipes.</div>';
    return;
  }

  // Verifica se o número de nomes é suficiente para o número de equipes
  if (mode === "teams" && nomes.length < parseInt(teamsInput.value, 10)) {
    result.innerHTML =
      '<div class="alert alert-danger">O número de nomes deve ser maior ou igual ao número de equipes.</div>';
    return;
  }

  // Sorteio individual
  if (mode === "individual") {
    // Seleciona um nome aleatório da lista
    const randomName = nomes[Math.floor(Math.random() * nomes.length)];
    // Exibe o nome sorteado
    result.innerHTML = `<div class="alert alert-success">Nome sorteado: <strong>${randomName}</strong></div>`;
  } 
  // Sorteio por equipes
  else if (mode === "teams") {
    // Obtém o número de equipes
    const numTeams = parseInt(teamsInput.value, 10);

    // Verifica se o número de equipes é válido
    if (isNaN(numTeams) || numTeams < 2) {
      result.innerHTML =
        '<div class="alert alert-danger">Por favor, insira um número válido de equipes.</div>';
      return;
    }

    // Embaralha os nomes aleatoriamente
    const shufflednomes = nomes.sort(() => Math.random() - 0.5);

    // Cria um array de equipes vazio
    const teams = Array.from({ length: numTeams }, () => []);

    // Distribui os nomes entre as equipes de forma equilibrada
    shufflednomes.forEach((name, index) => {
      teams[index % numTeams].push(name);
    });

    // Exibe as equipes formadas
    result.innerHTML = teams
      .map(
        (team, index) => `
                    <div class="alert alert-info">
                        <strong>Equipe ${index + 1}:</strong> ${team.join(", ")}
                    </div>
                `
      )
      .join("");
  }
});
