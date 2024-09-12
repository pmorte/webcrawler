import * as cheerio from 'cheerio';
import axios from "axios";
import https from 'https';

class CrawlerControler{
    async busca_preco(item) {
        var url = "https://gg.deals/game/";
        var browserHeadrs = {
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
            "Accept-Encoding": "gzip, deflate, br",
            "Accept-Language": "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7",
            "Cache-Control": "max-age=0",
            "Cookie": "gg-session=nf1pnnluqk2knvvabcojb1mnjc; firstVisit=1682076914; _gcl_au=1.1.1258868568.1697753819; _gid=GA1.2.732917263.1701365831; gg_csrf=02c73dcacae0df24f673acc83b6497dc41b889ads%3A88%3A%22S0RVeGFlVGt5R0pmY1lEWnV4YloxYXRzUmV5RVFuZEJZHOUMYPMRnOnJ1s8YvudGAovdmjscdLgJuuUF--cPkg%3D%3D%22%3B; _ga_6Z8FV5RM5R=GS1.1.1701486897.455.0.1701486897.0.0.0; _ga=GA1.1.2055441315.1682076919",
            "Sec-Ch-Ua": '"Chromium";v="118", "Opera GX";v="104", "Not=A?Brand";v="99"',
            "Sec-Ch-Ua-Mobile": "?0",
            "Sec-Ch-Ua-Platform": "Windows",
            "Sec-Fetch-Dest": "document",
            "Sec-Fetch-Mode": "navigate",
            "Sec-Fetch-Site": "none",
            "Sec-Fetch-User": "?1",
            "Upgrade-Insecure-Requests": 1,
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36 OPR/104.0.0.0 (Edition std-1)"
        };
        var options = {
            headers: browserHeadrs,
            timeout: 120000,
            httpsAgent: new https.Agent({ keepAlive: true })
        };
        try {
            var pagHtml = await axios.get(url+item.item, options);
            const $ = cheerio.load(pagHtml.data);
            var menor = $('.price-inner.numeric').text().split("R$");
            var gray = $('.price-inner.numeric').text().split("R$");
            if($(".empty-state-text").html() == null) {
                menor = "R$: "+menor[3];
                gray = "R$: "+gray[2];
            }
            else {
                menor = "R$: "+menor[2];
                gray = "-----";
            }
            if (menor.substring(menor.length-4) == "Free" || menor.substring(menor.length-5) == "Free~") {
                menor = "Free";
                gray = gray.split("Free~")[0];
            }
            var preco = {
                "nome": "",
                "atual": $('.price-inner.numeric').html(),
                "menor": menor,
                "img_loja": $(".d-flex.flex-align-center.shop-link").find("a > img").attr("src"),
                "desconto": $(".discount.label").html(),
                "img_jogo": $(".image-game").attr("src"),
                "dataPrice": $(".game-price-active-label").html(),
                "gray": gray
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
