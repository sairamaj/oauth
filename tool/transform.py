def readAllText(fileName):
    with open(fileName, 'r') as file:
        return file.read()

def transform(parameters, args):
    # Replace with command line input 
    for arg in args:
        parts = arg.split('=')
        if len(parts) > 1:
            parameters[parts[0]] = parts[1]

    # Ask the user for inputs if any after overwriting with command line inputs.
    for k,v in parameters.items():
        if v == '<userinput>':
            parameters[k] = input(f"{k}:")
        elif v == '<fileinput>':
            parameters[k] = readAllText(input(f"{k} (filename):"))
    return parameters