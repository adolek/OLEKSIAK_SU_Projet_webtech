// Import a module
const http = require('http')
const url = require('url')
const qs = require('querystring')
const handles = require('./handles')

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
*/

const server = http.createServer(handles.serverHandle);
server.listen(8080)