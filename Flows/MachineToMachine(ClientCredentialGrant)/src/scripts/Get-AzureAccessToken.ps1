$clientId = "client"
$ClientSecret = "secret"

<#POST https://api.authorization-server.com/token
    grant_type=client_credentials&
    client_id=CLIENT_ID&
    client_secret=CLIENT_SECRET
#>

<#
    Parse-JWTtoken is taken from: https://www.michev.info/Blog/Post/2140/decode-jwt-access-and-id-tokens-via-powershell
#>
function Parse-JWTtoken {
 
    [cmdletbinding()]
    param([Parameter(Mandatory=$true)][string]$token)
 
    #Validate as per https://tools.ietf.org/html/rfc7519
    #Access and ID tokens are fine, Refresh tokens will not work
    if (!$token.Contains(".") -or !$token.StartsWith("eyJ")) { Write-Error "Invalid token" -ErrorAction Stop }
 
    #Header
    $tokenheader = $token.Split(".")[0]
    #Fix padding as needed, keep adding "=" until string length modulus 4 reaches 0
    while ($tokenheader.Length % 4) { Write-Verbose "Invalid length for a Base-64 char array or string, adding ="; $tokenheader += "=" }
    Write-Verbose "Base64 encoded (padded) header:"
    Write-Verbose $tokenheader
    #Convert from Base64 encoded string to PSObject all at once
    Write-Verbose "Decoded header:"
    [System.Text.Encoding]::ASCII.GetString([system.convert]::FromBase64String($tokenheader)) | ConvertFrom-Json | fl | Out-Default
 
    #Payload
    $tokenPayload = $token.Split(".")[1]
    #Fix padding as needed, keep adding "=" until string length modulus 4 reaches 0
    while ($tokenPayload.Length % 4) { Write-Verbose "Invalid length for a Base-64 char array or string, adding ="; $tokenPayload += "=" }
    Write-Verbose "Base64 encoded (padded) payoad:"
    Write-Verbose $tokenPayload
    #Convert to Byte array
    $tokenByteArray = [System.Convert]::FromBase64String($tokenPayload)
    #Convert to string array
    $tokenArray = [System.Text.Encoding]::ASCII.GetString($tokenByteArray)
    Write-Verbose "Decoded array in JSON format:"
    Write-Verbose $tokenArray
    #Convert from JSON to PSObject
    $tokobj = $tokenArray | ConvertFrom-Json
    Write-Verbose "Decoded Payload:"
    
    return $tokobj
}

$tenantId = "4925b807-9380-4135-93cc-9c23aa7c411b"
$uri = "https://login.microsoftonline.com/$tenantId/oauth2/token"
$secret = "mGUriCicHsF5/4AuKtzIP4xLpv99Zsc/QxFJPVefkz4="
$resource = 'https://sairamajhotmail.onmicrosoft.com/3019f06b-99f1-46d7-b68f-506fc00c5f69'
$appId = "23a4b29f-b137-4d05-8479-ca79958ec077"

$encodedSecret = [System.Web.HttpUtility]::UrlEncode($secret)
$body = @{}
$body["grant_type"] = "client_credentials"
$body["client_id"] = $appId
$body["client_secret"] = $secret
$body["resource"] = $resource

# get access token.
$response = Invoke-WebRequest -Method Post -Uri $uri -Body $body 
$tokenInfo = ConvertFrom-Json $response.Content
$tokenInfo.access_token

Parse-JWTtoken -token $tokenInfo.access_token
