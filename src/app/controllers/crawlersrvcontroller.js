import * as cheerio from 'cheerio';
import axios from "axios";

class CrawlerControler{
    async busca_preco(item) {
        var url = "https://gg.deals/game/";
        try {
            var pagHtml = await axios.get(url+item.item);
            const $ = cheerio.load(pagHtml.data);
            var menor = $('.price-inner.numeric').text().split("R$");
            if($(".empty-state-text").html() == null) {
                menor = "R$: "+menor[3];
            }
            else {
                menor = "R$: "+menor[2];
            }
            if (menor.substring(menor.length-4) == "Free" || menor.substring(menor.length-5) == "Free~") {
                menor = "Free";
            }
            var preco = {
                "nome": "",
                "atual": $('.price-inner.numeric').html(),
                "menor": menor,
                "img_loja": $(".d-flex.flex-align-center.shop-link").find("a > img").attr("src"),
                "desconto": $(".discount.label").html(),
                "img_jogo": $(".image-game").attr("src")
            }
            preco.nome = item.item.replace(/-/g," ");
        }
        catch (error) {
            preco = await this.busca_preco(item);
        }
        return preco;
    }
}

export default new CrawlerControler();
