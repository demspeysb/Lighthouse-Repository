touch deploy.sh
#!/bin/bash
set -e  # Exit on any error
set -x  # Print each command

# Navigate to project directory
cd /path/to/your/project || exit

# Pull the latest code from GitHub
git pull origin main  # Replace 'main' with your branch if different

# Install dependencies
npm install  # Replace with pip or other as needed

# Start/restart the application
pm2 restart app.js  # Adjust based on your app

