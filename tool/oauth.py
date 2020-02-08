import requests
from exceptions import ApiException
from pprint import pprint

class OAuth:
    def __init__(self, url,bodyParameters):
        self.url = url
        self.bodyParameters = bodyParameters

    def getAccessToken(self):
        result = requests.post(self.url, self.bodyParameters, verify=False)
        if result.status_code == 200:
            return result.json()
        raise ApiException(result.status_code, result.content)
    

