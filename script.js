const valorUsuario = document.querySelector("#valor");
const moedaUsuario = document.querySelector("#moedas");
const btn = document.querySelector("#btn");

// Evento para chamar a função ao clicar no botão
btn.addEventListener("click", pegarMoeda);

function pegarMoeda() {
    const moeda = moedaUsuario.value;

    if (!moeda) {
        alert("Selecione uma moeda!");
        return;
    }

    if (!valorUsuario.value || isNaN(valorUsuario.value)) {
        alert("Digite um valor válido!");
        return;
    }

    fetch(`https://economia.awesomeapi.com.br/json/last/${moeda}`)
        .then((res) => res.json())
        .then((data) => {
            displayResultado(data, moeda);
        })
        .catch(() => {
            alert("Erro ao buscar os dados da API.");
        });
}

function displayResultado(data, moeda) {
    const chave = moeda.replace("-", "");
    const info = data[chave];

    if (!info) {
        alert("Erro ao encontrar a moeda retornada pela API.");
        return;
    }

    const valorAtual = parseFloat(info.bid);
    const valorDigitado = parseFloat(valorUsuario.value);

    const cotacao = (valorAtual * valorDigitado)
        .toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

    const divRes = document.querySelector(".display-res");
    const divContainer = document.querySelector(".container");

    divContainer.classList.add("style-container");

    divRes.innerHTML = `
        <div class="resultado">
            <p>${chave.replace("BRL", "")} ${valorDigitado} = ${cotacao}</p>
        </div>
    `;
}