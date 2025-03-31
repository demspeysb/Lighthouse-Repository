#Converts a string delimited by ',' into an array
def stringToArray(input):
    output = input.split(',')
    i=0
    while (i<len(output)):
        if i==len(output)-1:
            output[i] = output[i][2:-2]
        else:
            output[i] = output[i][2:-1]
        i= i+1
    
    print(output)
    
    return(output)

stringToArray()