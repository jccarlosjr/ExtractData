function cleanNonNumeric(input) {
    return input.replace(/\D/g, '');
}

function splitValues(input) {
    let [value1, value2] = input.split('/').map(v => v.trim());
    return { value1, value2 };
}

function parsePercentage(input) {
    let sanitized = input.replace("%", "").replace(",", ".");
        let value = parseFloat(sanitized);
    return value;
}

function parseCurrency(input) {
    let sanitized = input.trim().replace(",", ".");
        let value = parseFloat(sanitized);
    return value;
}

function parsePrazosValue(texto){
    let match = texto.match(/(\d+)\/(\d+)/);

    if (match) {
        let aberto = match[1];
        let total = match[2];

        return { aberto, total }
    }
}

function getCards() {
    let divContratos = document.querySelector("#form-propostas > div > section > div > div:nth-child(1)");

    let cards = divContratos.querySelectorAll("div.portlet");

    let results = [];

    cards.forEach((card, index) => {
        let subcard = card.querySelector(`#titlelinha_${index} > div.caption.caption--emprestimos__consulta > div`);
        let taxa = parseFloat(subcard.querySelector(`#linhaBanco--taxa_${index}`).value);
        let bank = subcard.querySelector(`#linhaBanco--banco_${index}`).value;
        let parcela = subcard.querySelector(`#valorParcelaEmp_${index}`).innerText;
        let prazos = subcard.querySelector(`#titlelinha_${index} > div.caption.caption--emprestimos__consulta > div > span:nth-child(8)`).textContent.trim();
        let { aberto, total } = parsePrazosValue(prazos)
        let contract = cleanNonNumeric(subcard.querySelector(`#titlelinha_${index} > div.caption.caption--emprestimos__consulta > div > span.text--contrato`).textContent.trim());

        bank = cleanNonNumeric(bank);
        taxa = taxa;
        parcela = parseCurrency(parcela);
        aberto = parseInt(aberto);
        total = parseInt(total);

        results.push({
            bank,
            contract,
            taxa,
            parcela,
            aberto,
            total
        });
    });

    return results;
}

function cleanText(text) {
    return text.replace(/[\n\t]/g, '').trim();
}

function getDataVanguard() {
    let nascimento = document.getElementById("cliNascimento").innerText;
    let newNascimento = nascimento.slice(0, 10);

    const data = {
        nome: cleanText(document.getElementById("cliNome2").textContent),
        cpf: cleanText(document.getElementById("cliCpf2").textContent),
        beneficio: cleanNonNumeric(document.getElementById("numBeneficio2").textContent),
        especie: cleanText(document.getElementById("especieNB").value),
        dib: cleanText(document.querySelector("#content-dados-cliente > div:nth-child(1) > div.col-md-9 > div > div.portlet-body > div > div:nth-child(1) > table > tbody > tr:nth-child(10) > td.text-right.text-secundary__system")?.textContent),
        nascimento: newNascimento,
        margem: document.querySelector("#content-dados-cliente > div:nth-child(2) > div:nth-child(3) > div > div.progress-info > b")?.textContent||'0',
        rmc: document.querySelector("#content-dados-cliente > div:nth-child(2) > div:nth-child(4) > div > div.progress-info > b")?.textContent||'0',
        rcc: document.querySelector("#content-dados-cliente > div:nth-child(2) > div:nth-child(5) > div > div.progress-info > b")?.textContent||'0',
        parcelas: getCards()
    };

    const dataString = JSON.stringify(data, null, 2);

    navigator.clipboard.writeText(dataString).then(() => {
        window.alert("Dados copiados com sucesso");
    }).catch((err) => {
        window.alert("Erro ao copiar");
    });
    return data;
}
