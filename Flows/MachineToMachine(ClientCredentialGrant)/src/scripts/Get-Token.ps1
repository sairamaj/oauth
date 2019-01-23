$clientId = "client"
$ClientSecret = "secret"

<#POST https://api.authorization-server.com/token
    grant_type=client_credentials&
    client_id=CLIENT_ID&
    client_secret=CLIENT_SECRET
#>

$uri = 'http://localhost:5000/connect/token'
$body = @{}
$body["grant_type"] = "client_credentials"
$body["client_id"] = "client"
$body["client_secret"] = "secret"

# get access token.
$response = Invoke-WebRequest -Method Post -Uri $uri -Body $body 
$tokenInfo = ConvertFrom-Json $response.Content
$tokenInfo.access_token

# access api with access token.
$apiUrl = 'http://localhost:5002/api/identity'
$headers = @{"Authorization"="bearer "+  $tokenInfo.access_token}
Invoke-RestMethod -Uri $apiUrl -Headers $headers

