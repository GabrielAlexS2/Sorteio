function toggleDeficienciaDescricao() {
    const select = document.getElementById("deficiencia");
    const container = document.getElementById(
      "deficienciaDescricaoContainer"
    );
    container.style.display = select.value === "Sim" ? "block" : "none";
  }

  function gerarPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const form = document.getElementById("formulario");
    const formData = new FormData(form);

    let y = 10;
    formData.forEach((value, key) => {
      doc.text(`${key}: ${value}`, 10, y);
      y += 10;
    });

    doc.save("formulario.pdf");
  }

  (function () {
    emailjs.init("WljVguni1z5DZjiQr");
  })();

  function enviarEmail() {
    const requiredFields = [
      "nome",
      "email",
      "telefone",
      "cidade",
      "estado",
      "cep",
      "etnia",
      "deficiencia",
      "cnpj",
      "nomeEmpresa",
      "sobreEmpresa",
      "mensagem",
    ];

    for (const field of requiredFields) {
      const value = document.getElementById(field).value;
      if (!value) {
        alert(`Por favor, preencha o campo: ${field}`);
        return;
      }
    }

    const params = {
      nome: document.getElementById("nome").value,
      email: document.getElementById("email").value,
      telefone: document.getElementById("telefone").value,
      cidade: document.getElementById("cidade").value,
      estado: document.getElementById("estado").value,
      cep: document.getElementById("cep").value,
      etnia: document.getElementById("etnia").value,
      deficiencia: document.getElementById("deficiencia").value,
      deficienciaDescricao:
        document.getElementById("deficienciaDescricao").value || "N/A",
      cnpj: document.getElementById("cnpj").value,
      nomeEmpresa: document.getElementById("nomeEmpresa").value,
      sobreEmpresa: document.getElementById("sobreEmpresa").value,
      mensagem: document.getElementById("mensagem").value,
    };

    const serviceID = "service_sidynyo";
    const templateID = "template_m69h9a4";

    emailjs.send(serviceID, templateID, params).then(
      () => {
        alert("Email enviado com sucesso!");
      },
      (error) => {
        alert("Erro ao enviar email: " + error.text);
      }
    );
  }