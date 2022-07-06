const fs = require("fs")
const http = require("http")

// Plan
// GET / --> index.html zurückgeben
// GET /about --> about.html zurückgeben
// ansonsten --> error.html zurückgeben

function sendFileContent(path, response) {
    fs.readFile(path, (err, data) => {
        if (err) {
            response.end("Error at server side...")
            return
        }

        const html = data.toString()
        response.write(html)
        response.end()
    })
}

const server = http.createServer((request, response) => {
    console.log("neue request", request.method, request.url) // request logger

    if (request.url === "/") {
        // send index.html ...
        sendFileContent("assets/index.html", response)
    } else if (request.url === "/about") {
        // send about.html ...
        sendFileContent("assets/about.html", response)
    } else {
        // send error.html
        sendFileContent("assets/error.html", response)
    }
})

const PORT = 9000
server.listen(PORT, () => console.log("Server listening on Port", PORT))