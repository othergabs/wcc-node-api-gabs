// regras de negócio do sistema de artigos
const database = require("../models");
const tabelaArtigos = database.artigos;

// Cria um novo artigo
exports.create = (request, response) => {
  // object destructuring ou desestruturação de objeto
  const { titulo, descricao, publicado } = request.body;
  const artigo = {
    titulo, // titulo: titulo
    descricao,
    publicado,
  };

  if (!titulo) {
    return response
      .status(400)
      .send("O artigo precisa conter ao menos o título definido");
  }

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
  const { titulo: tituloArtigo } = request.query;

  if (!tituloArtigo) {
    response
      .status(400)
      .send("Não foi possível buscar um artigo pois o título não foi enviado.");
  }
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
  const { id: idArtigo } = request.query;

  if (!idArtigo) {
    response
      .status(400)
      .send("Não foi possível buscar um artigo pois o ID não foi informado");
  }

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

// exemplo de atribuição e renomeação

const desestruturaObj = () => {
  const objExemplo = { id: 1 };
  // renomear por desestruturação
  const { id: idObj } = objExemplo;
  // atribuir valor valor por desestruturação
  const { name = "N/A" } = objExemplo;
};
