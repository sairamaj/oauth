class ApiResponse:
    def __init__(self):
        self.items = {}

    def addAccessToken(self,accessToken):
        self.items['accesstoken'] = accessToken
    
    def getAccessToken(self):
        return self.items['accesstoken']

