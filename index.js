const express = require('express')

const server = express()

server.use(express.json())

const projects = []

function checkIdExists(req, res, next) {
  const { id } = req.params

  const project = projects.find(item => item.id == id);

  if (!project) {
    return res.status(400).json({ error: 'Projeto não encontrado' });
  }

  return next();
}

server.use((req, res, next) => {
  console.count('Numero de requisições realizadas: ')
  return next()
})

server.get('/projects', (req, res) => {

  return res.json(projects)

})


server.post('/projects', (req, res) => {

  const { title, id } = req.body

  const newPost = { title, id, tasks: [] }

  projects.push(newPost)

  return res.json(newPost)
})

server.put('/projects/:id', checkIdExists, (req, res) => {
  const { id } = req.params
  const { title } = req.body

  const project = projects.find(item => item.id == id)
  project.title = title

  return res.json(project)
})

server.delete('/projects/:id', checkIdExists, (req, res) => {
  const { id } = req.params

  const index = projects.findIndex(project => project.id == id)

  projects.splice(index, 1)

  return res.send()
})

server.post('/projects/:id/tasks', checkIdExists, (req, res) => {
  const { id } = req.params
  const { title } = req.body

  const project = projects.find(project => project.id == id)
  project.tasks.push(title)

  return res.json(project)
})


server.listen(3333)