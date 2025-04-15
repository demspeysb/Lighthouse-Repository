import base64
import json

# Read and encode the file content to a base64 string, then write it to a .txt file
with open("app/api/apiServiceLoader/LighthouseCollectiveAPIKey.json", "rb") as file:
    encoded_string = base64.b64encode(file.read()).decode("utf-8")

# Remove the padding '=' character if it exists
encoded_string = encoded_string.rstrip("=")

# Write the encoded string to a text file
with open("app/api/apiServiceLoader/encoded_APIKey.txt", "w") as encoded_file:
    encoded_file.write(encoded_string)

print(f"Encoded string written to 'app/api/apiServiceLoader/encoded_APIKey.txt'")

def decode_base64_to_file(encoded_string: str, output_file: str):
    """
    Decodes a Base64-encoded string and writes the content to a JSON file.
    
    :param encoded_string: Base64-encoded string.
    :param output_file: Path to the output file where the decoded content will be saved.
    """
    # Add padding back if needed
    padding_needed = 4 - len(encoded_string) % 4
    if padding_needed != 4:
        encoded_string += "=" * padding_needed
    
    decoded_bytes = base64.b64decode(encoded_string)
    
    # Decode the bytes into a Python dictionary (assuming the content is a valid JSON)
    decoded_json = json.loads(decoded_bytes.decode('utf-8'))
    
    # Write the decoded JSON back to a file
    with open(output_file, 'w') as json_file:
        json.dump(decoded_json, json_file, indent=4)

    print(f"Decoded JSON written to '{output_file}'")

# Read the encoded string from the txt file and decode it
with open("app/api/apiServiceLoader/encoded_APIKey.txt", "r") as encoded_file:
    encoded_string_from_file = encoded_file.read()

# Decode the string and write back to a json file
decode_base64_to_file(encoded_string_from_file, "app/api/apiServiceLoader/decoded_APIKey.json")
