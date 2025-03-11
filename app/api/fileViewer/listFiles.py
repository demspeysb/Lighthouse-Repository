from google.cloud import storage
from datetime import timedelta
import os 
import argparse


os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = 'app/dataFiles/LighthouseCollectiveAPIKey.json'

client = storage.Client()


parser = argparse.ArgumentParser(description='List files in a given bucket')
parser.add_argument("--bucket", type=str)

# Parse arguments
args = parser.parse_args()


def list_files(bucketName, client):
    bucket = client.bucket(bucketName)
    blobs = list(bucket.list_blobs())
    i = 0
    for blob in blobs:
        blobs[i]=blobs[i].name
        i = i+1
    print(blobs)
    return(blobs)
    #return("Python Output")

if __name__ == "__main__":
    list_files(args.bucket, client)