const http = require('http');
const url = require('url');
const queryString = require('querystring');
const weather = require('../src/Weather');

const port = 3001;

const server = http.createServer((req,res) => {
    res.setHeader('Access-Control-Allow-Origin','*')
    res.setHeader('Content-Type','application/json')

    const parsedUrl = url.parse(req.url);
    const parsedQuery = queryString.parse(parsedUrl.query);

    if (!parsedQuery.parsedLocation) {
        res.statusCode = 400;
        res.end(JSON.stringify({
            error: "Want to have location"
        }))
    }

    weather(parsedQuery.parsedLocation)
    .then(data => {
        res.statusCode = 200;
        res.end(JSON.stringify(data))
    })
    .catch(e => {
        res.statusCode = 500;
        res.end(JSON.stringify({
            error: "An error occurred"
        }));
    })

})

server.listen(port,() => {
    console.log("Server is running "+port);
})