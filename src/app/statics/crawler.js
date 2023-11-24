//import axios from "axios";

async function get_preco() {
    console.log("iniciando busca js");
    itens = ['item-1', 'item-procurado-ii'];
    for (let i = 0; i < itens.length; i++) {
        var response = await axios.get("http://localhost:3001/buscapreco/"+itens[i]);
        var tbValue = document.getElementById("tb_values");
        var novaLinha = tbValue.insertRow();

        var jogo = novaLinha.insertCell(0);
        var loja = novaLinha.insertCell(1);
        var nome = novaLinha.insertCell(2);
        var atual = novaLinha.insertCell(3);
        var desconto = novaLinha.insertCell(4);
        var menor = novaLinha.insertCell(5);

        jogo.innerHTML = `<img src='${response.data.img_jogo}' style='max-width:90px; max-height:55px'>`;
        loja.innerHTML = `<img src='${response.data.img_loja}' style='max-width:90px; max-height:35px'>`;
        nome.innerHTML = response.data.nome;
        atual.innerHTML = response.data.atual;
        desconto.innerHTML = response.data.desconto;
        menor.innerHTML = response.data.menor;   
    }
}

get_preco();