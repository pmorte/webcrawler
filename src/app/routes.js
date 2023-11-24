import { Router } from "express";
import crawlercontroller from "./controllers/crawlercontroller.js";

const router = Router();

router.get('/', (request, response) => {
    response.sendFile('index.html', { root: "." });
  })

router.get('/buscapreco/:item', async (req, res) =>{
    var precos = await crawlercontroller.busca_preco(req.params);
    res.json(precos);
})

export default router;