import sys
import oauth
import json
import api
import config
from exceptions import ApiException
from pprint import pprint

def readAllText(fileName):
    with open(fileName, 'r') as file:
        return file.read()

# Load file
if len(sys.argv) < 2:
    print('usage: main.py configfile [optional key value pairs]')
    exit()

config = config.Config(sys.argv[1])
print(config.apis())
exit()

accessTokenConfig = config.get("accesstoken")
pprint(accessTokenConfig['body'])

bodyParameters = accessTokenConfig['body']
# Replace with command line input 
for arg in sys.argv[2:]:
    parts = arg.split('=')
    if len(parts) > 1:
        bodyParameters[parts[0]] = parts[1]

# Ask the user for inputs if any after overwriting with command line inputs.
for k,v in bodyParameters.items():
    if v == '<userinput>':
        bodyParameters[k] = input(f"{k}:")
    elif v == '<fileinput>':
        bodyParameters[k] = readAllText(input(f"{k} (filename):"))

#pprint(bodyParameters)

# Get Access token
try:

    oauth = oauth.OAuth(accessTokenConfig['url'], bodyParameters )
    response = oauth.getAccessToken()
    pprint(response)
    access_token = response['access_token']
    print(access_token)
    url = config.get('tips')['url']
    api = api.Api(url, access_token,{})
    response = api.get()
    pprint(response)
except ApiException as e:
    print(f'Api exception:{e}')

    