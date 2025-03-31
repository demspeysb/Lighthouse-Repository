from google.cloud import storage
from datetime import timedelta
import os 

os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = 'app/dataFiles/LighthouseCollectiveAPIKey.json'

#Generates a signed url from which a user can access the file
def generate_signed_url(bucket_name, blob_name, expiration_minutes=5):
    """Generates a v4 signed URL for accessing a blob."""
    storage_client = storage.Client()
    bucket = storage_client.bucket(bucket_name)
    blob = bucket.blob(blob_name)

    url = blob.generate_signed_url(
        version="v4",
        expiration=timedelta(minutes=expiration_minutes),
        method="GET",
    )
    return url

# Example usage:
bucket_name = "client_001"
blob_name = "Original_documents/ICS 202 Incident Objectives FILLABLE.pdf"
signed_url = generate_signed_url(bucket_name, blob_name)
print(f"Generated GET signed URL: {signed_url}")
#auth_url = get_auth_url(bucket_name, blob_name)
#print(f"Authenticated URL: {auth_url}")