function cleanNonNumeric(i) {
    return i.replace(/\D/g, '');
}

function splitValues(i) {
    let [v1, v2] = i.split('/').map(v => v.trim());
    return { v1, v2 };
}

function parsePercentage(i) {
    let s = i.replace("%", "").replace(",", ".");
        let v = parseFloat(s);
    return v;
}

function parseCurrency(i) {
    let s = i.replace("R$", "").trim().replace(",", ".");
        let v = parseFloat(s);
    return v;
}

function getCards() {
    let div = document.querySelector("#tableConsult > article > div.card-header.text-nowrap.h-px-170.contratos");
    let cards = div.querySelectorAll("div.card.mb-4");
    let r = [];

    cards.forEach((card, i) => {
        let x = i + 2;
        let b = card.querySelector(`div:nth-child(${x}) > div.card-body > div.row.g-1 > div:nth-child(1) > div > div > small`)?.textContent.trim() || null;
        let c = card.querySelector(`div:nth-child(${x}) > div.card-body > div.row.g-1 > div:nth-child(2) > div > div > small`)?.textContent.trim() || null;
        let t = card.querySelector(`div:nth-child(${x}) > div.card-body > div.row.g-1 > div:nth-child(3) > div > div > small`)?.textContent.trim() || null;
        let p = card.querySelector(`div:nth-child(${x}) > div.card-body > div.row.g-1 > div:nth-child(5) > div > div > small`)?.textContent.trim() || null;
        let pz = card.querySelector(`div:nth-child(${x}) > div.card-body > div.row.g-1 > div:nth-child(6) > div > div > small`)?.textContent.trim() || null;
        let a = null;
        let tt = null;

        if (pz) {
            ({ value1: a, value2: tt } = splitValues(pz));
        }

        b = cleanNonNumeric(b);
        t = parsePercentage(t);
        p = parseCurrency(p);
        a = parseInt(a);
        tt = parseInt(tt);
        r.push({b,c,t,p,a,tt});
    });

    return r;
}


function cleanText(text) {
    return text.replace(/[\n\t]/g, '').trim();
}


function getDataMultiCorban() {
    const data = {
        nome: cleanText(document.getElementById("nome_beneficiario").textContent),
        cpf: cleanText(document.getElementById("cpf_beneficiario").textContent),
        beneficio: cleanText(document.getElementById("nb_beneficiario").textContent),
        especie: cleanText(document.getElementById("especie").textContent),
        nascimento: cleanText(document.querySelector("#accordionOne > div > div > div > div:nth-child(1) > div:nth-child(2) > div > div.card-info > small").textContent),
        mae: cleanText(document.querySelector("#accordionOne > div > div > div > div:nth-child(1) > div.col-md-5 > div > div.card-info > p:nth-child(2)").textContent),
        rg: cleanText(document.querySelector("#accordionOne > div > div > div > div:nth-child(1) > div:nth-child(3) > div > div.card-info > small").textContent),
        cep: cleanText(document.querySelector("#accordionOne > div > div > div > div:nth-child(1) > div:nth-child(6) > div:nth-child(3) > div > div.card-info > small").textContent),
        logradouro: cleanText(document.querySelector("#accordionOne > div > div > div > div:nth-child(1) > div:nth-child(6) > div.col-md-4 > div > div.card-info > small").textContent),
        cidade_endereco: cleanText(document.querySelector("#accordionOne > div > div > div > div:nth-child(1) > div:nth-child(6) > div:nth-child(2) > div > div.card-info > small").textContent),
        uf: cleanText(document.querySelector("#accordionOne > div > div > div > div:nth-child(1) > div:nth-child(6) > div.col-md-2 > div > div.card-info > small").textContent),
        banco: cleanNonNumeric(cleanText(document.querySelector("#accordionOne > div > div > div > div:nth-child(1) > div:nth-child(8) > div.col-md-3.mb-2 > div > div.card-info > small").textContent)),
        agencia: cleanText(document.querySelector("#accordionOne > div > div > div > div:nth-child(1) > div:nth-child(8) > div:nth-child(3) > div > div.card-info > small").textContent),
        conta: cleanText(document.querySelector("#accordionOne > div > div > div > div:nth-child(1) > div:nth-child(8) > div:nth-child(4) > div > div.card-info > small").textContent),
        uf_beneficio: cleanText(document.querySelector("#accordionOne > div > div > div > div:nth-child(1) > div:nth-child(8) > div:nth-child(2) > div > div.card-info > small").textContent),
        renda: cleanText(document.querySelector("#tableConsult > article > div:nth-child(4) > div > div > div.col-md-3.mt-3 > div > div > small").textContent),
        dib: cleanText(document.querySelector("#tableConsult > article > div:nth-child(4) > div > div > div:nth-child(3) > div > div > small").textContent),
        margem: document.querySelector("#valor_parcela_mr").textContent,
        rmc: document.querySelector("#valor_parcela_rmc")?.textContent||'0',
        rcc: document.querySelector("#valor_parcela_rcc")?.textContent || '0',
        parcelas: getCards(),
    };

    const dataString = JSON.stringify(data, null, 2);

    navigator.clipboard.writeText(dataString).then(() => {
        window.alert("Dados copiados com sucesso");
    }).catch((err) => {
        window.alert("Erro ao copiar");
    });
    return data;
}
