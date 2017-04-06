Flow
----
todo: sequence diagram:

user -> resource server: http://localhost:4000/protectedresource
resource server: < no token ?? and redirects to auth server )
browser: gets 302 and redirect url
browser -> auth server: http://localhost:5000/auth?response_type=code&client_id=myouthtest&redirect_uri=http://localhost:4000
/authcodehandler&scope=demo&state=1234xyz
auth server: shows the login page
user: enters id and password.
auth server: validates it and uses: 302 and redirect utl http://localhost:4000/authhandler...
browser: gets 302 and redirect url and calls http://localhost:4000/authhandler
resource server: uses post to get token with code obtained
resource server -> browser: send the protected resource info.

resource server -> browser: redirects: http://localhost:5001/auth

