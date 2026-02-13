#!/bin/bash

# AWS CLI Installation Script for WSL
# Run this script in your WSL terminal: bash install-aws-cli.sh

set -e

echo "========================================="
echo "AWS CLI Installation Script"
echo "========================================="
echo ""

# Check if AWS CLI is already installed
if command -v aws &> /dev/null; then
    echo "✓ AWS CLI is already installed!"
    aws --version
    echo ""
    echo "To configure AWS CLI, run: aws configure"
    exit 0
fi

echo "Installing AWS CLI v2..."
echo ""

# Method 1: Try snap (fastest)
echo "[Method 1] Trying snap installation..."
if command -v snap &> /dev/null; then
    sudo snap install aws-cli --classic
    if [ $? -eq 0 ]; then
        echo "✓ AWS CLI installed successfully via snap!"
        aws --version
        echo ""
        echo "To configure AWS CLI, run: aws configure"
        exit 0
    fi
fi

# Method 2: Download and install from official source
echo "[Method 2] Downloading AWS CLI v2 from official source..."
cd /tmp
rm -f awscliv2.zip
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"

echo "Extracting..."
unzip -o awscliv2.zip

echo "Installing..."
sudo ./aws/install --update

echo "Cleaning up..."
rm -rf aws awscliv2.zip

echo ""
echo "✓ AWS CLI installed successfully!"
aws --version
echo ""
echo "========================================="
echo "Next Steps:"
echo "========================================="
echo "1. Configure AWS CLI:"
echo "   aws configure"
echo ""
echo "2. You'll need:"
echo "   - AWS Access Key ID"
echo "   - AWS Secret Access Key"
echo "   - Default region: us-east-1"
echo "   - Default output format: json"
echo ""
echo "3. Get your AWS credentials from:"
echo "   https://console.aws.amazon.com/iam/"
echo "   → Users → Your User → Security Credentials"
echo "========================================="
