from google.cloud import storage
import os 

os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = 'app/dataFiles/LighthouseCollectiveAPIKey.json'

client = storage.Client()



def dowload_file(filename, bucketname, pathToSave):
    bucket = client.get_bucket(bucketname)

    blob = bucket.blob(filename)

    blob.download_to_filename(pathToSave)