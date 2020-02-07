import sys
import oauth
import json
from pprint import pprint

# Load file
if len(sys.argv) < 2:
    print('usage: main.py configfile [optional key value pairs]')
    exit()

configFile = sys.argv[1]
with open(configFile, 'r') as parameters_file:
    content = parameters_file.read()
config = json.loads(content)
pprint(config['body'])

bodyParameters = config['body']

# Replace with command line input 
for arg in sys.argv[2:]:
    parts = arg.split('=')
    if len(parts) > 1:
        bodyParameters[parts[0]] = parts[1]

# Ask the user for inputs if any after overwriting with command line inputs.
for k,v in bodyParameters.items():
    if v == '<userinput>':
        bodyParameters[k] = input(f"{k}:")

pprint(bodyParameters)

# Get Access token
oauth = oauth.OAuth(config['url'], bodyParameters )
response = oauth.getAccessToken()

pprint(response)
print(response['access_token'])