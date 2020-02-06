$tenantId = "4925b807-9380-4135-93cc-9c23aa7c411b"
$uri = "https://login.microsoftonline.com/$tenantId/oauth2/authorize?"
$secret = "mGUriCicHsF5/4AuKtzIP4xLpv99Zsc/QxFJPVefkz4="
$resource = 'https://sairamajhotmail.onmicrosoft.com/3019f06b-99f1-46d7-b68f-506fc00c5f69'
$appId = "23a4b29f-b137-4d05-8479-ca79958ec077"
$redirectUri = "https://techblue.azurewebsites.net/signin-oidc"

$resource = "23a4b29f-b137-4d05-8479-ca79958ec077"
$request = "$uri" + "client_id=$($appid)" + "&response_type=id_token" + "&redirect_uri=$($redirectUri)" `
+ "&response_mode=form_post" + "&scope=openid" `
+ "&nonce=7362CAEA-9CA5-4B43-9BA3-34D7C303EBA7"
$request

# get access token.
#Invoke-WebRequest -Method Get -Uri $request
