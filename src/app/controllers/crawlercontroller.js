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
                return{
                    "nome": "",
                    "atual": document.querySelectorAll('.price-inner.numeric')[0].innerHTML,
                    "menor": document.querySelectorAll('.price-inner.numeric')[2].innerHTML
                }
            });
            preco[i].nome = itens[i].replace(/-/g," ");
        }
        await browser.close();
        return preco;
    }
}

export default new CrawlerControler();
