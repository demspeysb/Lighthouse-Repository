import os
import json
import base64
import tempfile

# Retrieve the base64-encoded credentials
credentials_base64 = os.getenv("GOOGLE_APPLICATION_CREDENTIALS_BASE64")

if not credentials_base64:
    raise ValueError("Environment variable GOOGLE_APPLICATION_CREDENTIALS_BASE64 is not set")

# Decode and write to a temporary file
credentials_json = base64.b64decode(credentials_base64).decode("utf-8")

with tempfile.NamedTemporaryFile(delete=False, suffix=".json") as temp_file:
    temp_file.write(credentials_json.encode("utf-8"))
    temp_file_path = temp_file.name

# Set the GOOGLE_APPLICATION_CREDENTIALS variable to point to this temp file
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = temp_file_path
