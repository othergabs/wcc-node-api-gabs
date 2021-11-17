const express = require("express");
const app = express();
const port = 8080;

app.use(express.json());

app.get("/", function(request, response) {
    response.send("Dasa Educa - Artigos");
});

app.post("/", function(request, response) {
    console.log(request.body);
    response.send("Dasa Educa - Post");
});

app.put("/:id", function(request, response) {
    // mensagem e titulo
    console.log(request.body, request.body, request.params.id);
    response.send("Dasa Educa - Put");
});

app.delete("/", function(request, response) {
    response.send("Dasa Educa - Delete geral");
});

app.delete("/:id", function (request, response) {
  response.send("Dasa Educa - Delete específico");
});

app.listen(port, function() {
    console.log("Ouvindo a porta: ", port);
});

