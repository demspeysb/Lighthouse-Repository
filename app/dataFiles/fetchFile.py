from google.cloud import storage
import os 

os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = 'app/dataFiles/LighthouseCollectiveAPIKey.json'

client = storage.Client()

class folder():
    def __init__(self, folderName, contents):
       self.folderName = folderName
       self.contents = contents
    def download():
        print('Test')

class folder():
    def __init__(self, folderName, contents):
       self.folderName = folderName
       self.contents = contents
    def download():
        print('Test')



def download_file(filename, bucketname, pathToSave, client):
    bucket = client.get_bucket(bucketname)

    blob = bucket.blob(filename)

    blob.download_to_filename(pathToSave)

def list_files(bucketName, client):
    bucket = client.bucket(bucketName)
    blobs = list(bucket.list_blobs())
    i = 0
    for blob in blobs:
        blobs[i]=blobs[i].name
        i = i+1
    #print(blobs)
    return(blobs)
#list_files("lighthouse_dashboard_data", client)
def downloadAll(fileNameArray, bucketname, pathToSave, client):
    bucket = client.get_bucket(bucketname)

    curFolder = bucketname
    folderList = []

    i=0
    while i< len(fileNameArray):
        try:
            blob = bucket.blob(fileNameArray[i])
            blob.download_to_filename(pathToSave +"/"+fileNameArray[i])
        except:
            try:
                if fileNameArray[i].rfind("/"):
                    blob = bucket.blob(fileNameArray[i])
                    curFolder = fileNameArray[i][:fileNameArray[i].rfind("/")]
                    blob.download_to_filename(pathToSave +"/"+fileNameArray[i][fileNameArray[i].rfind("/"):])
                else:
                    print("An error has occurred in " + curFolder)
                    #print(curFolder)
            except:
                print(curFolder)
                folderList.append(curFolder)
                #print(folderList)
        #print("An error has occurred")
        i+=1
    print(folderList)
    return(folderList)
#Download all test

#downloadAll(list_files("lighthouse_dashboard_data", client),"lighthouse_dashboard_data","./app/dataFiles/fileDump", client)
list_files("lighthouse_dashboard_data", client)



#Think of a list to store folder and file objects

