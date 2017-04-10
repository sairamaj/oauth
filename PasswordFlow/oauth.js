var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var debug = require('debug')('oauth')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(logErrors)

app.post('/token', function (req, res) {
    debug('in post<token>...')
    var body = ''
    req.on('data', function (data) {
        debug('on req.on')
        body += data
    })

    req.on('error', function (err) {
        debug('on error:' + err)
    })

    req.on('end', function (data) {
        debug('on req.end')
        log(req, body)

        var bodyData = JSON.parse(body)
        var user = bodyData.username
        var password = bodyData.password

        debug('user:' + user)
        debug('password:' + password)

        if (user != 'demo' || password != 'demopass') {
            res.status(403).json({ error: 'authorization failed' })
            return
        }

        var tokenResponse = {
            access_token: 'accesstokenhere',
            token_type: 'authorization',
            expires_in: 3600,
            refresh_token: 'refreshtokenhere'
        }

        debug("sending the response" + JSON.stringify(tokenResponse))
        res.status(200).json(tokenResponse)
    })

    debug('returning from post.token')
})

app.listen(5001, function () {
    debug("listening at 5001...")
})

function logErrors(err, req, res, next) {
    console.error(err.stack)
    next(err)
}

function log(req, body) {
    debug("------- body -------")
    debug(body)
    debug("--------------")

    debug("------ url --------")
    debug(req.url)
    debug("--------------")

    debug("------ query--------")
    debug(req.query)
    debug("--------------")
}