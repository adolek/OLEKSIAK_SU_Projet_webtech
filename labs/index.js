// Import a module
const http = require('http')
const url = require('url')
const qs = require('querystring')
const handles = require('./handles')
const {serverHandle} = require('./handles')
const express = require('express')
const birds = require('./birds')


/*
// Define a string constant concatenating strings
const content = '<!DOCTYPE html>' +
'<html>' +
'    <head>' +
'        <meta charset="utf-8" />' +
'        <title>ECE AST</title>' +
'    </head>' + 
'    <body>' +
'       <p>Hello there!</p>' +
'    </body>' +
'</html>'


const server = http.createServer(handles.serverHandle);
server.listen(8080)

http.createServer(serverHandle).listen(port,  _ => {
    console.log(`Server is running at http://localhost:${port}`)
})*/

let db = {
    articles: [
      {
        id: '6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b',
        title: 'My article',
        content: 'Content of the article.',
        date: '04/10/2022',
        author: 'Liz Gringer'
      },
      // ...
    ],
    comments: [
      {
        id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
        timestamp: 1664835049,
        content: 'Content of the comment.',
        articleId: '6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b',
        author: 'Bob McLaren'
      },
      // ...
    ]
  }


const app = express()
const port = 8080
const searchId = '6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b'
const article = db.articles.find( article => article.id === searchId)

app.get('/articles', function (req, res) {
  res.send(db.articles)
})

app.get('/articles:{$article}', function (req, res) {
  res.send(article)
})

app.listen(port)
//app.use('/birds', birds)

