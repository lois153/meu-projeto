const form = document.querySelector("#formMensagem");
const input = document.querySelector("#mensagem");
const erro = document.querySelector("#erro");
const listaMensagens = document.querySelector("#lista");

let mensagens = [];
let editandoIndex = null;

function validarTexto(texto) {

  const txt = texto.trim();

  if (txt === "") {
    return "Digite algo antes de enviar";
  }

  if (txt.length < 3) {
    return "Mínimo de 3 caracteres";
  }

  return "";
}

function render() {

  listaMensagens.innerHTML = "";

  for (let i = 0; i < mensagens.length; i++) {

    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = mensagens[i];

    span.addEventListener("click", () => {

      input.value = mensagens[i];
      input.focus();
      editandoIndex = i;

      erro.textContent =
        "Editando item " + (i + 1) + " (envie para salvar)";
    });

    const btnExcluir = document.createElement("button");
    btnExcluir.type = "button";
    btnExcluir.textContent = "Excluir";

    btnExcluir.addEventListener("click", () => {

      mensagens.splice(i, 1);
      render();
    });

    li.append(span, " ", btnExcluir);
    listaMensagens.append(li);
  }
}

form.addEventListener("submit", (event) => {

  event.preventDefault();

  const textoDigitado = input.value;

  const mensagemErro = validarTexto(textoDigitado);

  if (mensagemErro !== "") {

    erro.textContent = mensagemErro;
    return;
  }

  erro.textContent = "";

  const textoFinal = textoDigitado.trim();

  if (editandoIndex !== null) {

    mensagens[editandoIndex] = textoFinal;
    editandoIndex = null;

  } else {

    mensagens.push(textoFinal);
  }

  render();

  input.value = "";
  input.focus();
});

function falar() {

  alert("Olá! Eu sou um botão com Javascript");
  console.log("O botão foi clicado");
}

const botao = document.getElementById("btnFala");
botao.addEventListener("click", falar);