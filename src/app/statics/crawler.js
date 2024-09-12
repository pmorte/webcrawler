//import axios from "axios";

async function get_preco() {
    itens = ['the-gardens-between', 'minoria', 'bastion', 'stray',
        'shantae-and-the-pirate-s-curse', 'shantae-half-genie-hero-ultimate-edition',
        'shantae-and-the-seven-sirens', 'owlboy', 'nier-automata-game-of-the-yorha-edition',
        'momodora-reverie-under-the-moonlight', 'chasm', 'eiyuden-chronicle-rising', 'project-colonies-mars-2120',
        'shieldmaiden', 'heroine-anthem-zero', 'teenage-mutant-ninja-turtles-shredders-revenge',
        'mega-man-11-rokkuman11-yun-mingno-chi-che', 'mega-man-x-dive-offline', 'kitaria-fables',
        'enslaved-odyssey-to-the-west-premium-edition','forgotton-anne', "state-of-decay-2-juggernaut-edition",
        '9-years-of-shadows', 'assassin-s-creed-origins-gold-edition', 'assassin-s-creed-odyssey-gold-edition',
        'assassins-creed-valhalla-complete-edition', 'strange-brigade', 'forza-horizon-4-ultimate-edition',
        'marvels-spider-man-remastered', 'marvels-spider-man-miles-morales'];
    for (let i = 0; i < itens.length; i++) {
        var response = await axios.get("buscapreco/online/"+itens[i]);
        var tbValue = document.getElementById("tb_values");
        var novaLinha = tbValue.insertRow();

        var jogo = novaLinha.insertCell(0);
        var loja = novaLinha.insertCell(1);
        var nome = novaLinha.insertCell(2);
        var atual = novaLinha.insertCell(3);
        var desconto = novaLinha.insertCell(4);
        var menor = novaLinha.insertCell(5);
        var gray = novaLinha.insertCell(6);
        var dataPrice = novaLinha.insertCell(7);

        jogo.innerHTML = `<img src='${response.data.img_jogo}' style='max-width:90px; max-height:55px'>`;
        loja.innerHTML = `<img src='${response.data.img_loja}' style='max-width:90px; max-height:35px'>`;
        nome.innerHTML = response.data.nome;
        atual.innerHTML = response.data.atual;
        desconto.innerHTML = response.data.desconto;
        menor.innerHTML = response.data.menor;
        gray.innerHTML = response.data.gray;
        dataPrice.innerHTML = response.data.dataPrice;
    }
}

get_preco();