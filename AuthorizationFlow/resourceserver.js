var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var needle = require('needle');
var request = require('request');

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/protectedresource', function (req, res) {
    res.writeHead(302, {
        'Location': 'http://localhost:5001/auth?response_type=code&client_id=myouthtest&redirect_uri=http://localhost:4000/authcodehandler&scope=demo&state=1234xyz'
    })
    res.end()
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
        { json: { key: 'value' } },
        function (error, response, body) {
            if (error) {
                console.log(error)
            } else {
                console.log(body)
                res.send("<h1> you got the token:" + body.access_token + ' and allowed to access.')
            }
        }
    );


})

console.log('listening 4000...')
app.listen(4000);