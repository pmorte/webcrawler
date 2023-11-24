import puppeteer from "puppeteer";
class CrawlerControler{
    async busca_preco(item) {
        console.log(item.item);
        console.log("----------------------");
        var itens = new Array();
        var url = "https://gg.deals/game/";
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        page.setDefaultNavigationTimeout(60000);
        console.log("iniciando busca...");
        var preco = {};
        await page.goto(url+item.item);
        preco = await page.evaluate(()=>{
            var desconto;
            var indexMenorPreco;
            try {
                desconto = document.querySelectorAll('.discount.label')[0].innerHTML;
            } catch (error) {
                desconto = "-";
            }
            if (document.querySelectorAll(".empty-state-text").length == 0) {
                indexMenorPreco = 2;
            } else {
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
            preco.nome = item.item.replace(/-/g," ");

        await browser.close();
        return preco;
    }
}

export default new CrawlerControler();
