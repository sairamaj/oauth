import requests

class OAuth:
    def __init__(self, url, clientId, clientSecret):
        self.url = url
        self.clientId = clientId
        self.clientSecret = clientSecret

    def getAccessToken(self):
        data = {"client_id" :self.clientId, "client_secret" : self.clientSecret}
        return requests.post(self.url, data, verify=False).json()

