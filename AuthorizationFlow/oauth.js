var express = require('express')
var app = express()
var bodyParser = require('body-parser')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(logErrors)
/*
  gets all the urls 
    auth
    token
    user
*/
app.get('/', (req, res) => {
  var urls = {
    auth: "http://localhost:5001/auth",
    token: "http://localhost:5001/token",
    user: "http://localhost:5001/user"
  }
  res.status(200).json(urls)
});

function onsuccess(res, code, state, uri){
    var url = uri + "?code=' + code + '&state=" + state
    res.redirect(url)
}

app.post('/oauthlogin', (req, res) => {
  console.log('oautlogin:')
  var user = req.body.username
  var password = req.body.password
  console.log('user:' + user + ' password:' + password)

  var url = 'http://localhost:4000/authcodehandler' + "?code=abc&state=" + '1234xy' // todo: need to get the status from original qu ery.

  console.log('redirecting ...')
  res.redirect(url)
  console.log('redirected successfully...')

});

/*
  auth url
  generates a code and redirects to the source. 
*/
app.get('/auth', function (req, res) {
  
  res.redirect('/loginatoauth.html')
  return

  var body = ""
  req.on('data', function (data) {
    body += data
  })

  req.on('end', function () {
    log(req, body)

    console.log("redirecting to :" + req.query.redirect_uri);
    var url = req.query.redirect_uri + "?code=abc&state=" + req.query.state
    console.log("redirecting...")
    res.redirect(url)
    console.log("redirected successfully")
  })
})

/*
  once authorization code is given server will call this to get a token.
*/
app.post('/token', function (req, res) {
  console.log('in post<token>...')

  var body = ''
  req.on('data', function (data) {
    console.log('on req.on')
    body += data
  })

  req.on('error', function(err){
    console.log('on error:'+ err)
  })

  req.on('end', function (data) {
    console.log('on req.end')
    log(req, body)

    var tokenResponse = {
      access_token: 'accesstokenhere',
      token_type: 'authorization',
      expires_in: 3600,
      refresh_token: 'refreshtokenhere'
    }

    console.log("sending the response" + JSON.stringify(tokenResponse))
    res.status(200).json(tokenResponse)
  })

  console.log('returning from post.token')
})

app.get('/user', function (req, res) {

  req.on('data', function (data) {
  })

  req.on('end', function (data) {
    var userResponse = {
      id: 'demouser',
      email: 'demouser@abc.com'
    }
    console.log("sending the response" + JSON.stringify(userResponse))
    res.status(200).json(userResponse)
  })
})

app.listen(5001, function () {
  console.log("listening at 5001...")
})

function logErrors (err, req, res, next) {
  console.error(err.stack)
  next(err)
}

function log(req, body) {
  console.log("--------------")
  console.log(body)
  console.log("--------------")

  console.log("------ url --------")
  console.log(req.url)
  console.log("--------------")

  console.log("------ query--------")
  console.log(req.query)
  console.log("--------------")
}