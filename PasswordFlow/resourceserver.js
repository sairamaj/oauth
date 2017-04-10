var express = require('express')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var app = express()
var request = require('request');
var debug = require('debug')('resourceserver')


app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

app.get('/protectedresource', function (req, res) {
    debug(' coookie:' + JSON.stringify(req.cookies))
    var accessToken = req.cookies.accesstoken
    debug('access token:' + accessToken)

    if (accessToken === undefined) {

        res.writeHead(302, {
            'Location': 'http://localhost:4000/login.html'
        })
        res.end()
    } else {
        res.send('<h1> now you can access this protected resource</h1>')
    }
})

app.post('/login', function (req, res) {
    var user = req.body.username
    var password = req.body.password
    debug('login: user' + user)
    debug('login: password' + password)

    request.post(
        'http://localhost:5001/token',
        {
            json:
            {
                'grant_type': 'password',
                'username': user,
                'password': password,
                'client_id': 'democlient'
            }
        },
        function (error, response, body) {
            if (error) {
                debug(error)
            } else {
                debug('post/token statusCode:' + response.statusCode)
                if (response.statusCode != 200) {
                    res.redirect('http://localhost:4000/error.html')
                } else {
                    debug(body)
                    res.cookie('accesstoken', body.access_token, { maxAge: 900000, httpOnly: true });
                    res.redirect('http://localhost:4000/protectedresource')
                }
            }
        })
})
debug('listening 4000...')
app.listen(4000);