//import axios from "axios";

async function get_preco() {
    console.log("iniciando busca js");
    var response = await axios.get("http://localhost:3001/buscapreco");
    var tbValue = document.getElementById("tb_values");
    for (let i = 0; i < response.data.length; i++) {
        var novaLinha = tbValue.insertRow();

        var loja = novaLinha.insertCell(0);
        var Nome = novaLinha.insertCell(1);
        var atual = novaLinha.insertCell(2);
        var menor = novaLinha.insertCell(3);

        loja.innerHTML = "loja";
        Nome.innerHTML = response.data[i].nome;
        atual.innerHTML = response.data[i].atual;
        menor.innerHTML = response.data[i].menor;
    }
}

get_preco();