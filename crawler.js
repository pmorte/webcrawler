import puppeteer from 'puppeteer';
async function busca_preco() {
    var itens = new Array();
    itens = ['a-lenda-do-heroi', 'cat-quest', 'cat-quest-ii', 'kitaria-fables', 'minoria',
    'shantae-and-the-pirate-s-curse', 'shantae-half-genie-hero-ultimate-edition',
    'shantae-and-the-seven-sirens', 'owlboy', 'nier-automata-game-of-the-yorha-edition',
    'momodora-reverie-under-the-moonlight', 'bloodstained-ritual-of-the-night', 'forgotton-anne'];
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    console.log("iniciando busca...");
    for (let i = 0; i < itens.length; i++) {
        var url = `https://gg.deals/game/${itens[i]}`;
        await page.goto(url);
        var preco = await page.evaluate(()=>{
            return{
                "atual": document.querySelectorAll('.price-inner.numeric')[0].innerHTML,
                "menor": document.querySelectorAll('.price-inner.numeric')[2].innerHTML
            }
        });
        console.log(`${itens[i].replace(/-/g," ")}: ${preco.atual} - menor: ${preco.menor} \n`);
    }
}

busca_preco();