config = require("./oauth2-config")
goauth2 = require("google-oauth2")(config)

scope = "https://www.googleapis.com/auth/userinfo.profile"

goauth2.getAuthCode(scope, (err, auth_code) => {
    if (err) {
        console.log(err)
    } else {
        console.log("auth code is:")
        console.log(auth_code)
    }
})
