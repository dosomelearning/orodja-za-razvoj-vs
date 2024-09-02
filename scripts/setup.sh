#!/bin/bash

# Script to create the necessary project directories

# Check if the script is being run in the root project directory
if [ ! -f "package.json" ]; then
  echo "Error: Please run this script from the root of your project directory."
  exit 1
fi

# Create the directories
mkdir -p src/assets
mkdir -p src/components
mkdir -p src/pages
mkdir -p src/context
mkdir -p src/data
mkdir -p src/hooks
mkdir -p src/styles
mkdir -p src/services
mkdir -p src/locales
mkdir -p src/docs

echo "Directories created successfully."
