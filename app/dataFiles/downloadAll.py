from google.cloud import storage
import os 

os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = 'app/dataFiles/LighthouseCollectiveAPIKey.json'

client = storage.Client()



def downloadAll(fileNameArray, bucketname, pathToSave, client):
    bucket = client.get_bucket(bucketname)

    curFolder = bucketname

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
                    print("An error has occurred")
                    print(curFolder)
            except:
                print(fileNameArray[i])
        #print("An error has occurred")
        i+=1
#Download all test

downloadAll(list_files("lighthouse_dashboard_data", client),"lighthouse_dashboard_data","./app/dataFiles/fileDump", client)
