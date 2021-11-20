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

exports.findAllPublished = (request, response) => {
  tabelaArtigos
    .findAll({ where: { publicado: true } })
    .then(function (data) {
      response.send(data);
    })
    .catch(function (error) {
      response
        .status(500)
        .send("Não foi possível buscar os artigos publicados");
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

exports.update = (request, response) => {
  const { body: updates } = request;
  const { id: idArtigo } = request.params;
  const query = { where: { id: idArtigo }, returning: true };
  tabelaArtigos
    .update(updates, query)
    .then(function (data) {
      // quando returning: true, o sequelize nos retorna uma lista com duas coisas:
      // - a quantidade de itens atualizados
      // - a lista dos itens atualizados

      // [0, []]
      // [1, [{artigo atualizado}]]
      const linhasAtualizadas = data[0];
      if (linhasAtualizadas === 0) {
        response
          .status(404)
          .send(
            "Não foi encontrado nenhum registro para ser atualizado a partir do id: " +
              idArtigo
          );
      } else {
        const artigosAtualizados = data[1];
        response.send(artigosAtualizados);
      }
    })
    .catch(function (error) {
      console.log(error);
      response.status(500).send("Ocorreu um erro ao atualizar o arquivo");
    });
};

//FIXME: ajustar implementação do update many
exports.updateMany = (request, response) => {
  const { body: updates } = request;
  // const { id: idArtigo } = request.params;
  const query = {
    returning: true,
    where: { descricao: "descrição do artigo" },
  };

  tabelaArtigos
    .update(updates, query)
    .then(function (data) {
      console.log(data);
      const linhasAtualizadas = data[0];
      if (linhasAtualizadas === 0) {
        response
          .status(404)
          .send("Não foi encontrado nenhum registro para ser atualizado");
      } else {
        const artigosAtualizados = data[1];
        response.send(artigosAtualizados);
      }
    })
    .catch(function (error) {
      response.status(500).send("Ocorreu um erro ao atualizar os artigos");
    });
};

exports.deleteAll = (request, response) => {
  tabelaArtigos
    .destroy({ where: {}, truncate: false })
    .then(function (itemsDeletados) {
      response.send("Foram deletados " + itemsDeletados + "artigos");
    })
    .catch(function (error) {
      response.status(500).send("Ocorreu um erro ao deletar os artigos");
    });
};

exports.delete = (request, response) => {
  const { id: idArtigo } = request.params;
  tabelaArtigos
    .destroy({ where: { id: idArtigo } })
    .then(function (itemsDeletados) {
      if (itemsDeletados === 0) {
        response.send("O item com ID " + idArtigo + "não foi encontrado");
      } else {
        response.send("Artigo " + idArtigo + "deletado com sucesso");
      }
    })
    .catch(function (error) {
      response
        .status(500)
        .send("Ocorreu um erro ao tentar deletar o artigo " + idArtigo);
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
