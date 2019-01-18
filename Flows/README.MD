![AuthFlows]https://auth0.com/docs/api-auth/which-oauth-flow-to-use

* Background processes uses __Client Credential Grant__.
* If web app executing the logic of getting token on server then __Regular Web App Login Flow__ ( __Authorization code grant flow__) is used. This is safe as Access token is directly passed to web server hosting the application without going through web browser.
* __Resource Owner Password Credential Grant__ used from trusted application (legacy and cannot host in browser). User will enter username and password.

