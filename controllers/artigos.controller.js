// regras de negócio do sistema de artigos
const database = require("../models");
const tabelaArtigos = database.artigos;

// Cria um novo artigo
exports.create = (request, response) => {
  const artigo = {
    titulo: request.body.titulo,
    descricao: request.body.descricao,
    publicado: request.body.publicado,
  };
  // a promise pode ser resolvida
  // ou ela pode ser rejeitada (exemplo: ocorreu um erro ao tentar salvar)

  tabelaArtigos
    .create(artigo)
    .then(function () {
      response.send("Artigo criado com sucesso");
    })
    .catch(function (error) {
      response.status(500).send("Ocorreu um erro ao salvar o artigo");
    });
};

exports.findAll = (request, response) => {
  tabelaArtigos
    .findAll()
    .then(function (data) {
      response.send(data);
    })
    .catch(function () {
      response.status(500).send("Ocorreu um erro aos buscar todos os artigos.");
    });
};
