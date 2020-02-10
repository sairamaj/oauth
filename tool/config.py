import json

class Config:
    def __init__(self,config):
        self.config = json.loads(self.readAllText(config))

    def get(self,name):
        return self.config[name]

    def readAllText(self,fileName):
        with open(fileName, 'r') as file:
            return file.read()

