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


const app = express()
const port = 8080

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(port)
app.use('/birds', birds)

