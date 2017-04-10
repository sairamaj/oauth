## Flow
![flow](https://github.com/sairamaj/oauth/blob/master/AuthorizationFlow/oauth-authorization-flow.png|alt=flow)

1. user -> resource server: http://localhost:4000/protectedresource
2. resource server: < no token ?? and redirects to auth server )
3. browser: gets 302 and redirect url
4. browser -> auth server: http://localhost:5000/auth?response_type=code&client_id=myouthtest&redirect_uri=http://localhost:4000
/authcodehandler&scope=demo&state=1234xyz
5. auth server: shows the login page
6. user: enters id and password.
7. auth server: validates it and uses: 302 and redirect utl http://localhost:4000/authhandler...
8. browser: gets 302 and redirect url and calls http://localhost:4000/authhandler
9. resource server: uses post to get token with code obtained
10. resource server -> browser: send the protected resource info.
11. resource server -> browser: redirects: http://localhost:5001/auth
