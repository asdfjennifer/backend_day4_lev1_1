const http = require("http")

// request .. Anfrage vom Client
// response ... Antwort an Client
// (request, response) => {}  ... RequestListener (unsere Logik kommt da rein)
const server = http.createServer((request, response) => {
    // logic comes here...

    console.log("neue request:", request.method, request.url)

    const name = request.url.slice(1) || "Client"

    response.write(`<h1>Yo ${name}!</h1>`)
    response.end()

    console.log("habe geantwortet!")
})

const PORT = 9000 // frei wählbar, muss nur verfügbar sein... 0-65535
server.listen(PORT, () => console.log("Server listening on PORT", PORT))