var express = require('express')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var app = express()
var request = require('request');

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

app.get('/protectedresource', function (req, res) {
    console.log(' coookie:' + JSON.stringify(req.cookies))
    var accessToken = req.cookies.accesstoken
    console.log('access token:' + accessToken)

    if (accessToken === undefined) {

        res.writeHead(302, {
            'Location': 'http://localhost:5001/auth?response_type=code&client_id=myouthtest&redirect_uri=http://localhost:4000/authcodehandler&scope=demo&state=1234xyz'
        })
        res.end()
    } else {
        res.send('<h1> now you can access this protected resource</h1>')
    }
})

app.get('/authcodehandler/', function (req, res) {
    console.log('code: ' + req.query.code)
    console.log('state: ' + req.query.state)

    // verify the state here.
    /* if (req.query.state != '1234xyz') {
         res.send('<h1>error - state did not match.</h1>')
     }*/

    request.post(
        'http://localhost:5001/token',
        {
            json:
            {
                'grant_type': 'authorization_code',
                'code': code,
                'redirect_uri' : 'need to put here.',
                'client_id' : 'democlient',
                'client_secret' : 'democlientsecret'
            }
        },
        function (error, response, body) {
            if (error) {
                console.log(error)
            } else {
                console.log(body)
                res.cookie('accesstoken', body.access_token, { maxAge: 900000, httpOnly: true });
                res.redirect('http://localhost:4000/protectedresource')
            }
        }
    );


})

console.log('listening 4000...')
app.listen(4000);