// rotas do sistema de artigos

/*
    GET
        - Obter todos os artigos
        - Obter um artigo especifico
        - Obter todos os artigos publicados
    POST
        - Criar um novo artigo
    PUT
        - Publicar meu artigo
    DELETE
        - Deletar um artigo
*/

module.exports = (app) => {
  const artigosController = require("../controllers/artigos.controller");
  let router = require("express").Router();

  /*
  implementação equivalente (e mais verbosa)
  router.post("/", function (request, response) {
    artigosController.create(request, response);
  });
  */

  router.post("/", artigosController.create);

  router.get("/", artigosController.findAll);

  router.get("/findByTitle", artigosController.findByTitle);

  router.get("/findById", artigosController.findById);

  // router.get("/findById/:id", artigosController.findByPk);

  app.use("/artigos", router);
};
