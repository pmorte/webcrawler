import puppeteer from "puppeteer";
class CrawlerControler{
    async busca_preco() {
        var itens = new Array();
        itens = ['item-1', 'item-procurado-ii'];
        var url = "https://gg.deals/game/";
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        page.setDefaultNavigationTimeout(60000);
        console.log("iniciando busca...");
        var preco = [];
        for (let i = 0; i < itens.length; i++) {
            await page.goto(url+itens[i]);
            preco[i] = await page.evaluate(()=>{
                var desconto;
                var indexMenorPreco;
                try {
                    desconto = document.querySelectorAll('.discount.label')[0].innerHTML;
                    indexMenorPreco = 2;
                } catch (error) {
                    desconto = "-";
                    indexMenorPreco = 1;
                }
                return{
                    "nome": "",
                    "atual": document.querySelectorAll('.price-inner.numeric')[0].innerHTML,
                    "menor": document.querySelectorAll('.price-inner.numeric')[indexMenorPreco].innerHTML,
                    "img_loja": document.querySelectorAll(".d-flex.flex-align-center.shop-link")[0]
                    .getElementsByTagName("img")[0].currentSrc,
                    "desconto": desconto,
                    "img_jogo": document.getElementsByClassName("image-game")[0].src
                }
            });
            preco[i].nome = itens[i].replace(/-/g," ");
        }
        await browser.close();
        return preco;
    }
}

export default new CrawlerControler();
