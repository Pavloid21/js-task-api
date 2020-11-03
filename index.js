let express = require('express');
let app = express();

app.use(express.static(__dirname))

let data = []

for (let i = 0; i < 100; i++) {
    data.push(`Table item #${i}`)
}

app.get('/data', function(req, res) {
    const { page = 0, limit = 10 } = req.query

    let lastPage = data.length % limit > 0 ?
        Math.floor(data.length / limit) : 
        (data.length / limit) - 1

    if (page > lastPage || page < 0) {
        res.sendStatus(404)
    } else {
        res.json({
            data: data.slice(page * limit, page * limit + +limit),
            totalCount: data.length,
            lastPage
        })
    }
})

app.listen(8080);