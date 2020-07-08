const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;
  const repositorie = { id: uuid(), title, url, techs, likes: 0 };
  repositories.push(repositorie);
  return response.json(repositorie);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;
  const index = repositories.findIndex(repositorie => repositorie.id === id);

  if (index === -1) {
    return response.status(400).json({ error: 'Repositorie not found' });
  }

  const repositorie = {
    id, title, url, techs, likes: repositories[index].likes
  }
  repositories[index] = repositorie;

  return response.json(repositorie);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const index = repositories.findIndex(repositorie => repositorie.id === id);

  if (index === -1) {
    return response.status(400).json({ error: 'Repositorie not found' });
  }
  repositories.splice(index, 1);
  console.log(repositories.splice(index, 1));

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  const index = repositories.findIndex(repositorie => repositorie.id === id);

  if (index === -1) {
    return response.status(400).json({ error: 'Repositorie not found' });
  }


  const repositorie = repositories[index];
  repositorie.likes = repositorie.likes + 1;
  return response.json(repositorie);

});

module.exports = app;
