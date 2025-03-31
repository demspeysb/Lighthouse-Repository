from google.cloud import storage
from datetime import timedelta
import os 
import argparse

os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = 'app/dataFiles/LighthouseCollectiveAPIKey.json'

#Gets arguments from command line request
parser = argparse.ArgumentParser(description='Runs GenerateURL.py')
parser.add_argument("--bucket", type=str)
parser.add_argument("--blob", type=str)
parser.add_argument("--expirationMins", type=int,default=1)

# Parse arguments
args = parser.parse_args()

#This methods creates a signed URL so one can get data from the bucket
def generate_signed_url(bucket_name, blob_name, expiration_minutes):
    """Generates a v4 signed URL for accessing a blob."""
    storage_client = storage.Client()
    bucket = storage_client.bucket(bucket_name)
    blob = bucket.blob(blob_name)

    url = blob.generate_signed_url(
        version="v4",
        expiration=timedelta(minutes=expiration_minutes),
        method="GET",
    )
    print(url)
    return url

#Lists files inside a bucket.
#Returns an array
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
# Call the function with the parsed arguments
if __name__ == "__main__":
    generate_signed_url(args.bucket, args.blob, args.expirationMins)