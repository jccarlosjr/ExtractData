(async function () {
    try {
      const response = await fetch("https://cdn.jsdelivr.net/gh/jccarlosjr/ExtractData@main/new_exp.json", { cache: "no-store" });
      if (!response.ok) throw new Error("Erro ao buscar repositório.");
  
      const data = await response.json();
      const expirationDate = new Date(data.expires);
      const now = new Date();
  
      if (now > expirationDate) {
        alert("Error");
        throw new Error("Error.");
      }
    } catch (e) {
      console.error("Error", e);
      alert("Error");
      throw new Error("Error");
    }
  
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
        let sanitized = input.replace("R$", "").trim().replace(",", ".");
            let value = parseFloat(sanitized);
        return value;
    }
    
    function getCards() {
        let div_contratos = document.querySelector("#tableConsult > article > div.card-header.text-nowrap.h-px-170.contratos");
        let cards = div_contratos.querySelectorAll("div.card.mb-4");
    
        let results = [];
    
        cards.forEach((card, index) => {
            let x = index + 2;
    
            let bank = card.querySelector(
                `div:nth-child(${x}) > div.card-body > div.row.g-1 > div:nth-child(1) > div > div > small`
            )?.textContent.trim() || null;
    
            let contract = card.querySelector(
                `div:nth-child(${x}) > div.card-body > div.row.g-1 > div:nth-child(2) > div > div > small`
            )?.textContent.trim() || null;
    
            let taxa = card.querySelector(
                `div:nth-child(${x}) > div.card-body > div.row.g-1 > div:nth-child(3) > div > div > small`
            )?.textContent.trim() || null;
    
            let parcela = card.querySelector(
                `div:nth-child(${x}) > div.card-body > div.row.g-1 > div:nth-child(5) > div > div > small`
            )?.textContent.trim() || null;
    
            let prazos = card.querySelector(
                `div:nth-child(${x}) > div.card-body > div.row.g-1 > div:nth-child(6) > div > div > small`
            )?.textContent.trim() || null;
    
            let aberto = null;
            let total = null;
    
            if (prazos) {
                ({ value1: aberto, value2: total } = splitValues(prazos));
            }
    
            bank = cleanNonNumeric(bank);
            taxa = parsePercentage(taxa);
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
    
    
    function changeBtn(){
        let div = document.getElementById("container_notifications");
        div.innerHTML = `<button class="btn btn-primary btn-sm" id="getDataMtcb">Copiar Dados do Cliente</button>`
        let btn = document.getElementById("getDataMtcb");
        btn.addEventListener("click", getDataMultiCorban);
    }
    
    setInterval(changeBtn, 2000)
})();
