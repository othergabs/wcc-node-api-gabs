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
      response
        .status(500)
        .send({ message: "Ocorreu um erro ao salvar o artigo" });
    });
};

exports.findAll = (request, response) => {
  tabelaArtigos
    .findAll()
    .then(function (data) {
      response.send(data);
    })
    .catch(function () {
      response
        .status(500)
        .send({ message: "Ocorreu um erro aos buscar todos os artigos." });
    });
};

exports.findByTitle = (request, response) => {
  const tituloArtigo = request.query.titulo;
  tabelaArtigos
    .findOne({ where: { titulo: tituloArtigo } })
    .then(function (data) {
      if (data) {
        response.send(data);
      } else {
        response.status(404).send({
          message:
            "Não foi possível encontrar um artigo com o titulo: " +
            tituloArtigo,
        });
      }
    })
    .catch(function () {
      response.status(500).send({
        message:
          "Ocorreu um erro ao buscar o artigo com titulo: " + tituloArtigo,
      });
    });
};

exports.findById = (request, response) => {
  const idArtigo = request.query.id;
  tabelaArtigos
    .findByPk(idArtigo)
    .then(function (data) {
      if (data) {
        response.send(data);
      } else {
        response.status(404).send({
          message: "Não foi possível encontrar um artigo com o id: " + idArtigo,
        });
      }
    })
    .catch(function (error) {
      console.log(error);
      response.status(500).send({
        message: "Ocorreu um erro ao buscar o artigo com titulo: " + idArtigo,
      });
    });
};
