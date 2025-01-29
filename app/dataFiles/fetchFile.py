from google.cloud import storage
import os 

os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = 'app/dataFiles/LighthouseCollectiveAPIKey.json'

client = storage.Client()



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
    print(blobs)
list_files("docviewertestbucket", client)