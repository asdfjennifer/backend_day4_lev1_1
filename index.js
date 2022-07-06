const fs = require("fs")
const http = require("http")

const errorHtml = fs.readFileSync("assets/error.html")

// Plan
// GET / --> "index.html"
// GET /<dateiName>.html --> <dateiName>.html
// ansonsten --> error.html

function sendFileOrError(path, response) {
    fs.readFile(path, (err, data) => {
        if (err) {
            response.end(errorHtml) // antworten mit der error.html seite..
            return
        }
        response.end(data.toString()) // data als string und direkt senden...
    })
}

const server = http.createServer((request, response) => {
    console.log("neue request", request.method, request.url)

    if (request.url === "/") {
        sendFileOrError("assets/index.html", response)
    } else {
        const filePath = "assets" + request.url
        sendFileOrError(filePath, response) //  request.url ist zb: "/about.html"
    }
})

const PORT = 9000
server.listen(PORT, () => console.log("Server listening on port", PORT))