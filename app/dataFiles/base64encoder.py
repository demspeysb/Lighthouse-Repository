import base64

with open("app/dataFiles/LighthouseCollectiveAPIKey.json", "rb") as file:
    encoded_string = base64.b64encode(file.read()).decode("utf-8")
print(encoded_string)

def decode_base64_to_file(encoded_string: str):
    """
    Decodes a Base64-encoded string and writes the content to a file.
    
    :param encoded_string: Base64-encoded string.
    :param output_file: Path to the output file where the decoded content will be saved.
    """
    decoded_bytes = base64.b64decode(encoded_string)
    print(decoded_bytes)

decode_base64_to_file(encoded_string)