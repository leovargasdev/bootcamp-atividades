const express = require('express');

const server = express();
server.use(express.json());

const projects = []; // tupla = { id: "1", title: 'Novo projeto', tasks: [] };
let resquestsAPP = 0;

// Contador de nº de requisições
server.use((req, res, next) => {
  resquestsAPP++;
  console.log(`Requisição nº: ${resquestsAPP}, Método: ${req.method}`);
  return next();
});

// Busca o um projeto apartir do id, caso não encontrar retorna o erro 400 e interrompe a aplicação
function checkProject(req, res, next){
  const { id } = req.params;
  
  const project = projects.findIndex(p => p.id == id);

  if(project === -1){ // Se o projeto não for encontrado o retorno do findIndex é -1
    return res.status(400).json({error: "Projeto não encontrado"});
  }
  
  req.params.indexProject = project;
  next();
};

// Novo Projeto
server.post('/projects', (req, res) => {
  const { id, title } = req.body;
  projects.push({ id, title, tasks: [] });
  return res.json(projects);
});

// Listagem dos projetos
server.get('/projects', (req, res) => {
  return res.json(projects);
});

// Projeto
server.get('/projects/:id', checkProject, (req, res) => {
  return res.json(projects[req.params.indexProject]);
});

// Editar Projeto
server.put('/projects/:id', checkProject, (req, res) => {
  const { indexProject } = req.params;
  const { title } = req.body;
  projects[indexProject].title = title;
  return res.json(projects[indexProject]);
});

// Add task ao Projeto
server.post('/projects/:id/tasks', checkProject, (req, res) => {
  const { indexProject } = req.params;
  const { title } = req.body;
  projects[indexProject]['tasks'].push(title);
  return res.json(projects[indexProject]);
});

// Remover Projeto
server.delete('/projects/:id', checkProject, (req, res) => {
  const { indexProject } = req.params;
  projects.splice(indexProject, 1);
  return res.json(projects);
});

server.listen(3333);