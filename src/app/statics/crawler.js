//import axios from "axios";

async function get_preco() {
    console.log("iniciando busca js");
    var response = await axios.get("http://localhost:3001/buscapreco");
    var tbValue = document.getElementById("tb_values");
    for (let i = 0; i < response.data.length; i++) {
        var novaLinha = tbValue.insertRow();

        var jogo = novaLinha.insertCell(0);
        var loja = novaLinha.insertCell(1);
        var nome = novaLinha.insertCell(2);
        var atual = novaLinha.insertCell(3);
        var desconto = novaLinha.insertCell(4);
        var menor = novaLinha.insertCell(5);

        jogo.innerHTML = `<img src='${response.data[i].img_jogo}' style='max-width:90px; max-height:55px'>`;
        loja.innerHTML = `<img src='${response.data[i].img_loja}' style='max-width:90px; max-height:35px'>`;
        nome.innerHTML = response.data[i].nome;
        atual.innerHTML = response.data[i].atual;
        desconto.innerHTML = response.data[i].desconto;
        menor.innerHTML = response.data[i].menor;
    }
}

get_preco();