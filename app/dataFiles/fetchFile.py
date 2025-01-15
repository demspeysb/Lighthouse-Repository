from google.cloud import storage
import os 

os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = 'app/dataFiles/LighthouseCollectiveAPIKey.json'

client = storage.Client()

bucket = client.get_bucket("docviewertestbucket")

blob = bucket.blob("testdocviewer.docx")

blob.download_to_filename("app/dataFiles/test.docx")