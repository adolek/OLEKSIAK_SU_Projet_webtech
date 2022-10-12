// PROJECT UNTIL PART 5//

/*
const url = require('url')
const qs = require('querystring')


// Necessary imports
module.exports = {
    serverHandle: function (req, res) {
        const route = url.parse(req.url)
        const path = route.pathname 
        const params = qs.parse(route.query)
      
        res.writeHead(200, {'Content-Type': 'text/plain'});
      
        if (path === '/hello' && 'name' in params) {
          res.write('Hello ' + params['name'])
        } else {
          res.write('Hello anonymous')
        }
        
        res.end();
    } 
  }
*/


// PROJECT AFTER PART 5//

  const url = require('url')
  const qs = require('querystring')
  const about = require('./content/about.json')

  const content = '<!DOCTYPE html>' +
  '<html>' +
  '    <head>' +
  '        <meta charset="utf-8" />' +
  '        <title>How /hello works ?</title>' +
  '    </head>' + 
  '    <body>' +
  '       <p>\'/hello\' takes a name query parameter and:<ul><li>random names reply hello [name]</li><li>your own name replies with a short intro of yourself!</li></ul></p>' +
  '    </body>' +
  '</html>'
  

  
  // Necessary imports
  module.exports = {
      serverHandle: function (req, res) {
          const route = url.parse(req.url)
          const path = route.pathname 
          const params = qs.parse(route.query)
        
          res.writeHead(200, {'Content-Type': 'text/plain'});
          
          if(path === '/'){
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(content)
          }
          else if (path === '/hello' && 'name' in params) {
            res.write('Hello ' + params['name'])
          } 
          else if(path==='/hello'){
            res.write('Hello Adrien and David')
          }
          else if(path==='/about' ){
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.write(JSON.stringify(about))
          
            console.log(about);
          }
          else{
            res.write('404: Page not found.')
          }
          
          res.end();
      } 
    }  