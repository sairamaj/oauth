## Google OAuth Play ground

## Getting Code
Location: https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=https%3A%2F%2Fdevelopers.google.com%2Foauthplayground&prompt=consent&response_type=code&client_id=407408718192.apps.googleusercontent.com&scope=https%3A%2F%2Fmail.google.com%2Fmail%2Ffeed%2Fatom&access_type=offline
GET /oauthplayground/?code=4/XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX HTTP/1.1


## Exchanging Code for Access token

POST /oauth2/v4/token HTTP/1.1
Host: www.googleapis.com
Content-length: 233
content-type: application/x-www-form-urlencoded
user-agent: google-oauth-playground
code=4%2FXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX&redirect_uri=https%3A%2F%2Fdevelopers.google.com%2Foauthplayground&client_id=407408718192.apps.googleusercontent.com&client_secret=************&scope=&grant_type=authorization_code


## Using Access token
HTTP/1.1 200 OK
Content-length: 266
X-xss-protection: 1; mode=block
X-content-type-options: nosniff
Transfer-encoding: chunked
Expires: Mon, 01 Jan 1990 00:00:00 GMT
Vary: Origin, X-Origin
Server: GSE
-content-encoding: gzip
Pragma: no-cache
Cache-control: no-cache, no-store, max-age=0, must-revalidate
Date: Tue, 30 May 2017 17:54:17 GMT
X-frame-options: SAMEORIGIN
Alt-svc: quic=":443"; ma=2592000; v="38,37,36,35"
Content-type: application/json; charset=UTF-8
{
  "access_token": "ya29.YYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY", 
  "token_type": "Bearer", 
  "expires_in": 3600, 
  "refresh_token": "1/ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZg"
}


------------------------------
GET /mail/feed/atom/ HTTP/1.1
Host: mail.google.com
Content-length: 0
Authorization: Bearer ya29.GltaBFv6t6e6EiL_H9Unwob-7WIbzuA2N0h458zMOJYeFmukcodhecLZpUiwF4Zem_NBsmOqPV3hqruB2TUFZxZA9bbGEPfKlhOKtmzSZo6Q3m-KebeLjqrGH_4Q
HTTP/1.1 200 OK
Content-length: 14336
Expires: Tue, 30 May 2017 17:55:14 GMT
X-content-type-options: nosniff
Content-security-policy: script-src https://clients4.google.com/insights/consumersurveys/ https://www.google.com/js/bg/ 'self' 'unsafe-inline' 'unsafe-eval' https://mail.google.com/_/scs/mail-static/ https://hangouts.google.com/ https://talkgadget.google.com/ https://*.talkgadget.google.com/ https://www.googleapis.com/appsmarket/v2/installedApps/ https://www-gm-opensocial.googleusercontent.com/gadgets/js/ https://docs.google.com/static/doclist/client/js/ https://www.google.com/tools/feedback/ https://s.ytimg.com/yts/jsbin/ https://www.youtube.com/iframe_api https://ssl.google-analytics.com/ https://apis.google.com/_/scs/abc-static/ https://apis.google.com/js/ https://clients1.google.com/complete/ https://apis.google.com/_/scs/apps-static/_/js/ https://ssl.gstatic.com/inputtools/js/ https://ssl.gstatic.com/cloudsearch/static/o/js/ https://www.gstatic.com/feedback/js/ https://www.gstatic.com/common_sharing/static/client/js/ https://www.gstatic.com/og/_/js/;frame-src https://clients4.google.com/insights/consumersurveys/ https://calendar.google.com/accounts/ 'self' https://accounts.google.com/ https://apis.google.com/u/ https://apis.google.com/_/streamwidgets/ https://clients6.google.com/static/ https://content.googleapis.com/static/ https://mail-attachment.googleusercontent.com/ https://www.google.com/calendar/ https://calendar.google.com/calendar/ https://docs.google.com/ https://drive.google.com https://*.googleusercontent.com/docs/securesc/ https://feedback.googleusercontent.com/resources/ https://www.google.com/tools/feedback/ https://support.google.com/inapp/ https://*.googleusercontent.com/gadgets/ifr https://hangouts.google.com/ https://talkgadget.google.com/ https://*.talkgadget.google.com/ https://www-gm-opensocial.googleusercontent.com/gadgets/ https://plus.google.com/ https://wallet.google.com/gmail/ https://www.youtube.com/embed/ https://clients5.google.com/pagead/drt/dn/ https://clients5.google.com/ads/measurement/jn/ https://www.gstatic.com/mail/ww/ https://www.gstatic.com/mail/intl/ https://clients5.google.com/webstore/wall/ https://ci3.googleusercontent.com/ https://apis.google.com/additnow/ https://www.gstatic.com/mail/promo/ https://notifications.google.com/ https://mail-payments.google.com/mail/payments/;report-uri https://mail.google.com/mail/cspreport;object-src https://mail-attachment.googleusercontent.com/swfs/ https://mail-attachment.googleusercontent.com/attachment/
Transfer-encoding: chunked
Set-cookie: COMPASS=gmail=CmUACWuJV45Hd3OeTu7YKzPKj72_tYzhOI4OJzmswvikl2kOnoDCs5CDpqnOsRLy5quGMAapiCmteM_1BeDeClmY6-JB6n6Bg_bSjRRgVeB2fFQDvT8rHOp0ck1hpKc4rpRI1vSeGBDAgLfJBRpuAAlriVclAkZUJcRFIm5VN9dyjoTd1Z6jgJ55BomIBpfU0VlrRYv2bCV129nR1DMpdfWJrn4BCqn_e0RhxhbKB9tnIBHb5L04_vIm0FYIiS2R3NjE5fm5funkWm7858R-X_IkzJAldnTJ0kdS2k0; expires=Fri, 09-Jun-2017 17:55:14 GMT; path=/mail; Secure; HttpOnly
Strict-transport-security: max-age=10886400; includeSubdomains
Server: GSE
X-xss-protection: 1; mode=block
Cache-control: private, max-age=0
Date: Tue, 30 May 2017 17:55:14 GMT
X-frame-options: SAMEORIGIN
Alt-svc: quic=":443"; ma=2592000; v="38,37,36,35"
Content-type: text/xml; charset=UTF-8
-content-encoding: gzip
Content-location: https://mail.google.com/mail/feed/atom/
<?xml version="1.0" encoding="UTF-8"?><feed version="0.3" xmlns="http://purl.org/atom/ns#"><title>