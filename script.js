const nomesInput = document.getElementById("nomes");
const modeSelect = document.getElementById("selecao");
const teamsInputGroup = document.getElementById("grupotimes");
const teamsInput = document.getElementById("equipes");
const drawButton = document.getElementById("sorteio");
const result = document.getElementById("resultado");

modeSelect.addEventListener("change", () => {
  if (modeSelect.value === "teams") {
    teamsInputGroup.classList.remove("d-none");
  } else {
    teamsInputGroup.classList.add("d-none");
  }
});

drawButton.addEventListener("click", () => {
  const nomes = nomesInput.value
    .split(/[\n,;]+/)
    .map((name) => name.trim())
    .filter((name) => name.length > 0);
  const mode = modeSelect.value;

  if (nomes.length === 0) {
    result.innerHTML =
      '<div class="alert alert-danger">Por favor, insira ao menos um nome.</div>';
    return;
  }
  if (mode === "teams" && nomes.length < 2) {
    result.innerHTML =
      '<div class="alert alert-danger">Por favor, insira ao menos dois nomes para formar equipes.</div>';
    return;
  }
  if (mode === "teams" && nomes.length < parseInt(teamsInput.value, 10)) {
    result.innerHTML =
      '<div class="alert alert-danger">O número de nomes deve ser maior ou igual ao número de equipes.</div>';
    return;
  }

  if (mode === "individual") {
    const randomName = nomes[Math.floor(Math.random() * nomes.length)];
    result.innerHTML = `<div class="alert alert-success">Nome sorteado: <strong>${randomName}</strong></div>`;
  } else if (mode === "teams") {
    const numTeams = parseInt(teamsInput.value, 10);
    if (isNaN(numTeams) || numTeams < 2) {
      result.innerHTML =
        '<div class="alert alert-danger">Por favor, insira um número válido de equipes.</div>';
      return;
    }

    const shufflednomes = nomes.sort(() => Math.random() - 0.5);
    const teams = Array.from({ length: numTeams }, () => []);
    shufflednomes.forEach((name, index) => {
      teams[index % numTeams].push(name);
    });

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
