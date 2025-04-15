import subprocess

result = subprocess.run(
    ["node", "app/api/apiServiceLoader/getUsingSecret.js"],
    capture_output=True,
    text=True,
)

output = result.stdout.strip()

print("Result from JavaScript:", output)