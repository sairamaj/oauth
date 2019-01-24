$clientId = "client"
$ClientSecret = "secret"

<#

POST https://api.authorization-server.com/token
  grant_type=password&
  username=USERNAME&
  password=PASSWORD&
  client_id=CLIENT_ID

  some times client_secret may be used as well.
#>

$uri = 'http://localhost:5000/connect/token'
$body = @{}
$body["grant_type"] = "password"
$body["client_id"] = "ro.client"
$body["client_secret"] = "secret"
$body["UserName"] = "alice"
$body["Password"] = "password"

# get access token.
$response = Invoke-WebRequest -Method Post -Uri $uri -Body $body 
$tokenInfo = ConvertFrom-Json $response.Content
$tokenInfo.access_token

# access api with access token.
$apiUrl = 'http://localhost:5001/api/identity'
$headers = @{"Authorization"="bearer "+  $tokenInfo.access_token}
Invoke-RestMethod -Uri $apiUrl -Headers $headers

