#!/bin/bash

# MediFind AWS Deployment Script
# This script builds, tags, and pushes Docker images to ECR, then updates ECS services

set -e

echo "========================================="
echo "MediFind AWS Deployment Script"
echo "========================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Get AWS region and account ID
AWS_REGION=$(terraform output -raw aws_region 2>/dev/null || echo "us-east-1")
AWS_ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)

if [ -z "$AWS_ACCOUNT_ID" ]; then
    echo -e "${RED}Error: Unable to get AWS account ID. Please configure AWS CLI.${NC}"
    exit 1
fi

# ECR repository URLs
FRONTEND_REPO="${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/medifind-frontend"
BACKEND_REPO="${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/medifind-backend"

echo -e "${YELLOW}AWS Account ID: ${AWS_ACCOUNT_ID}${NC}"
echo -e "${YELLOW}AWS Region: ${AWS_REGION}${NC}"
echo ""

# Step 1: Login to ECR
echo -e "${GREEN}[1/5] Logging in to Amazon ECR...${NC}"
aws ecr get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com

# Step 2: Build Docker images
echo -e "${GREEN}[2/5] Building Docker images...${NC}"
cd ..
docker compose build

# Step 3: Tag images for ECR
echo -e "${GREEN}[3/5] Tagging images for ECR...${NC}"
docker tag medifind-frontend:latest ${FRONTEND_REPO}:latest
docker tag medifind-backend:latest ${BACKEND_REPO}:latest

# Also tag with timestamp for versioning
TIMESTAMP=$(date +%Y%m%d-%H%M%S)
docker tag medifind-frontend:latest ${FRONTEND_REPO}:${TIMESTAMP}
docker tag medifind-backend:latest ${BACKEND_REPO}:${TIMESTAMP}

# Step 4: Push images to ECR
echo -e "${GREEN}[4/5] Pushing images to ECR...${NC}"
docker push ${FRONTEND_REPO}:latest
docker push ${FRONTEND_REPO}:${TIMESTAMP}
docker push ${BACKEND_REPO}:latest
docker push ${BACKEND_REPO}:${TIMESTAMP}

# Step 5: Update ECS services
echo -e "${GREEN}[5/5] Updating ECS services...${NC}"
aws ecs update-service --cluster medifind-dev-cluster --service medifind-dev-frontend-service --force-new-deployment --region ${AWS_REGION}
aws ecs update-service --cluster medifind-dev-cluster --service medifind-dev-backend-service --force-new-deployment --region ${AWS_REGION}

echo ""
echo -e "${GREEN}=========================================${NC}"
echo -e "${GREEN}Deployment Complete!${NC}"
echo -e "${GREEN}=========================================${NC}"
echo ""
echo -e "Frontend image: ${FRONTEND_REPO}:latest"
echo -e "Backend image: ${BACKEND_REPO}:latest"
echo ""
echo -e "ECS services are updating. This may take a few minutes."
echo -e "Check status with: aws ecs describe-services --cluster medifind-dev-cluster --services medifind-dev-frontend-service medifind-dev-backend-service --region ${AWS_REGION}"
echo ""
echo -e "Application URL: $(terraform output -raw application_url 2>/dev/null || echo 'Run terraform output application_url')"
