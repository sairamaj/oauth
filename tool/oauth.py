import requests
from pprint import pprint

class OAuth:
    def __init__(self, url,bodyParameters):
        self.url = url
        self.bodyParameters = bodyParameters

    def getAccessToken(self):
       #data = {"client_id" :self.clientId, "client_secret" : self.clientSecret}
        print('__________________')
        pprint(self.bodyParameters)
        print('__________________')
        return requests.post(self.url, self.bodyParameters, verify=False).json()

