# MediFind AWS Deployment Script (PowerShell)
# This script builds, tags, and pushes Docker images to ECR, then updates ECS services

Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "MediFind AWS Deployment Script" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan

# Get AWS region and account ID
$AWS_REGION = "us-east-1"
try {
    $AWS_ACCOUNT_ID = (aws sts get-caller-identity --query Account --output text)
} catch {
    Write-Host "Error: Unable to get AWS account ID. Please configure AWS CLI." -ForegroundColor Red
    exit 1
}

# ECR repository URLs
$FRONTEND_REPO = "$AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/medifind-frontend"
$BACKEND_REPO = "$AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/medifind-backend"

Write-Host "AWS Account ID: $AWS_ACCOUNT_ID" -ForegroundColor Yellow
Write-Host "AWS Region: $AWS_REGION" -ForegroundColor Yellow
Write-Host ""

# Step 1: Login to ECR
Write-Host "[1/5] Logging in to Amazon ECR..." -ForegroundColor Green
aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin "$AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com"

# Step 2: Build Docker images
Write-Host "[2/5] Building Docker images..." -ForegroundColor Green
Set-Location ..
docker compose build

# Step 3: Tag images for ECR
Write-Host "[3/5] Tagging images for ECR..." -ForegroundColor Green
docker tag medifind-frontend:latest "$FRONTEND_REPO:latest"
docker tag medifind-backend:latest "$BACKEND_REPO:latest"

# Also tag with timestamp for versioning
$TIMESTAMP = Get-Date -Format "yyyyMMdd-HHmmss"
docker tag medifind-frontend:latest "$FRONTEND_REPO:$TIMESTAMP"
docker tag medifind-backend:latest "$BACKEND_REPO:$TIMESTAMP"

# Step 4: Push images to ECR
Write-Host "[4/5] Pushing images to ECR..." -ForegroundColor Green
docker push "$FRONTEND_REPO:latest"
docker push "$FRONTEND_REPO:$TIMESTAMP"
docker push "$BACKEND_REPO:latest"
docker push "$BACKEND_REPO:$TIMESTAMP"

# Step 5: Update ECS services
Write-Host "[5/5] Updating ECS services..." -ForegroundColor Green
aws ecs update-service --cluster medifind-dev-cluster --service medifind-dev-frontend-service --force-new-deployment --region $AWS_REGION
aws ecs update-service --cluster medifind-dev-cluster --service medifind-dev-backend-service --force-new-deployment --region $AWS_REGION

Write-Host ""
Write-Host "=========================================" -ForegroundColor Green
Write-Host "Deployment Complete!" -ForegroundColor Green
Write-Host "=========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Frontend image: $FRONTEND_REPO:latest"
Write-Host "Backend image: $BACKEND_REPO:latest"
Write-Host ""
Write-Host "ECS services are updating. This may take a few minutes."
Write-Host "Check status with: aws ecs describe-services --cluster medifind-dev-cluster --services medifind-dev-frontend-service medifind-dev-backend-service --region $AWS_REGION"
Write-Host ""
Write-Host "Application URL: Run 'terraform output application_url' to get the URL"
