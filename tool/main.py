import sys
import oauth
import json
from pprint import pprint

# Load file
with open('input.json', 'r') as parameters_file:
    content = parameters_file.read()
parameters = json.loads(content)

# Replace with command line input 
for arg in sys.argv[1:]:
    parts = arg.split('=')
    if len(parts) > 1:
        parameters[parts[0]] = parts[1]

# Ask the user for inputs if any after overwriting with command line inputs.
for k,v in parameters.items():
    if v == '<userinput>':
        parameters[k] = input(f"{k}:")

# Get Access token
oauth = oauth.OAuth(parameters['url'], parameters['clientid'], parameters['clientsecret'])
response = oauth.getAccessToken()

pprint(response)
print(response['access_token'])