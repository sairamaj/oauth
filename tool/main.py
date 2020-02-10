import sys
import json
import config
from exceptions import ApiException
from pprint import pprint
from transform import transform
from command import Command

# Load file
if len(sys.argv) < 2:
    print("usage: main.py configfile [optional key value pairs]")
    exit()

config = config.Config(sys.argv[1])
accessTokenConfig = config.get("accesstoken")
pprint(accessTokenConfig["body"])
bodyParameters = transform(accessTokenConfig["body"], sys.argv[2:])
pprint(bodyParameters)

cmd = Command()
quit = False
while quit == False:
    pprint(config.apis())
    command = input(">>")

    if command == "quit":
        quit = True
    else:
        try:
            apiConfig = config.get(command)
            print(apiConfig)
            cmd.execute(command, apiConfig["url"], bodyParameters)
        except ValueError as v:
            print(v)
