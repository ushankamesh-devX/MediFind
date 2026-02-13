#!/bin/bash
# Quick deployment script for WSL
# Runs the complete deployment process

set -e

echo "========================================="
echo "  MediFind - Quick Deploy"
echo "========================================="
echo ""

# Get script directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

# Run the ECR push script
bash "${SCRIPT_DIR}/push-to-ecr.sh"

echo ""
echo "Deployment initiated!"
echo "Monitor progress in AWS Console or use:"
echo "  aws ecs describe-services --cluster medifind-dev-cluster --services medifind-dev-frontend-service medifind-dev-backend-service --region us-east-1"
