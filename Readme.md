# Roles (__source__ [OAuth 2 Simplified](https://aaronparecki.com/oauth-2-simplified/))
## The third-party Application:"Client"
  * The client is the application that is attempting to get access to the user's account. It needs to get permission from the user before it can do so.
## The API: "Resource Server"
  * The resource server is the API server used to access the user's information
## The Authorization Server
  * This is the server that presents the interface where the user approves or denies the request. In smaller implementations, this may be the same server as the API server, but larger scale deployments will often build this ias a separate component.
## The User: "Resource Owner"
  * The resource owner is the person who is giving access to some portion of their account.

# Steps
  * Register your app (redirect URIs - used for redirecting users to web server, browser-based, or mobile apps)
  * Will get client Id and client Secret from provider
        client Id - public information
        client secret - private
## Authorization
### grant types
   * Authorization code  ( for web server, browser-based, mobile app)
   * Password (user name and password)
   * Client credentials ( application access)

### scopes
   Scopes define the resources in your system that you want to protect, e.g. APIs.   
   
## Web server app
   * Runs on server ( code is on server)
   * Can use client secret.
   * Get authorization code
   * Get token with the above code. 

# Authorization Flow Development
  * oauth.js        - Authorization server
  * WebServerApp
     * Install https://www.npmjs.com/package/angular2-generator
     * run ng2 init
# Resources
* [OAuth 2 Simplified](https://aaronparecki.com/oauth-2-simplified/)
* [10 Things You Should Know about Tokens](https://auth0.com/blog/ten-things-you-should-know-about-tokens-and-cookies/)
* [Dummy�s guide for the Difference between OAuth Authentication and OpenID] (http://nat.sakimura.org/2011/05/15/dummys-guide-for-the-difference-between-oauth-authentication-and-openid/)

![flow](https://github.com/sairamaj/oauth/blob/master/images/openid.png)