# MediFind AWS Infrastructure

This directory contains Terraform configuration to deploy the MediFind application to AWS using ECS Fargate, RDS MySQL, and Application Load Balancer.

## Architecture

```
Internet → ALB → ECS Fargate (Frontend + Backend) → RDS MySQL
           ↓
       CloudWatch Logs
```

**Components:**
- **VPC**: Custom VPC with public and private subnets across 2 AZs
- **ECS Fargate**: Serverless container orchestration
- **RDS MySQL**: Managed database (db.t3.micro, 20GB)
- **ALB**: Application Load Balancer for routing
- **ECR**: Docker image repositories
- **CloudWatch**: Application logs

## Prerequisites

### 1. Install AWS CLI

**Windows (PowerShell):**
```powershell
# Download and install AWS CLI
msiexec.exe /i https://awscli.amazonaws.com/AWSCLIV2.msi
```

**Verify installation:**
```powershell
aws --version
```

### 2. Configure AWS Credentials

**Create AWS Account** (if you don't have one):
- Go to https://aws.amazon.com/free/
- Sign up for AWS Free Tier
- Complete account verification

**Configure AWS CLI:**
```powershell
aws configure
```

You'll need:
- **AWS Access Key ID**: Get from AWS Console → IAM → Users → Security Credentials
- **AWS Secret Access Key**: Shown when creating access key
- **Default region**: `us-east-1`
- **Default output format**: `json`

**Verify configuration:**
```powershell
aws sts get-caller-identity
```

### 3. Install Terraform

**Windows (PowerShell):**
```powershell
# Using Chocolatey
choco install terraform

# OR download from https://www.terraform.io/downloads
```

**Verify installation:**
```powershell
terraform --version
```

### 4. Install Docker

Docker should already be installed (you're using it with docker-compose).

## Deployment Steps

### Step 1: Initialize Terraform

```powershell
cd d:\DevOPs\MediFind\infra
terraform init
```

This downloads required providers (AWS).

### Step 2: Review the Plan

```powershell
terraform plan
```

This shows what resources will be created. Review carefully!

### Step 3: Apply Infrastructure

```powershell
terraform apply
```

Type `yes` when prompted. This will:
- Create VPC, subnets, security groups
- Create RDS MySQL database (~10 minutes)
- Create ECS cluster
- Create ALB
- Create ECR repositories

**⏱️ Estimated time: 15-20 minutes**

### Step 4: Note Important Outputs

After `terraform apply` completes, save these outputs:

```powershell
terraform output
```

Important values:
- `application_url` - Your app URL
- `ecr_frontend_repository_url` - Frontend image repo
- `ecr_backend_repository_url` - Backend image repo

### Step 5: Build and Push Docker Images

**Option A: Using PowerShell Script (Recommended)**
```powershell
cd d:\DevOPs\MediFind\infra\scripts
.\deploy.ps1
```

**Option B: Manual Steps**
```powershell
# Login to ECR
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <ACCOUNT_ID>.dkr.ecr.us-east-1.amazonaws.com

# Build images
cd d:\DevOPs\MediFind
docker compose build

# Tag images
docker tag medifind-frontend:latest <FRONTEND_REPO_URL>:latest
docker tag medifind-backend:latest <BACKEND_REPO_URL>:latest

# Push images
docker push <FRONTEND_REPO_URL>:latest
docker push <BACKEND_REPO_URL>:latest
```

### Step 6: Update ECS Services

```powershell
aws ecs update-service --cluster medifind-dev-cluster --service medifind-dev-frontend-service --force-new-deployment --region us-east-1

aws ecs update-service --cluster medifind-dev-cluster --service medifind-dev-backend-service --force-new-deployment --region us-east-1
```

### Step 7: Access Your Application

```powershell
terraform output application_url
```

Visit the URL in your browser. It may take 2-3 minutes for services to become healthy.

## Updating the Application

After making code changes:

```powershell
cd d:\DevOPs\MediFind\infra\scripts
.\deploy.ps1
```

This rebuilds, pushes images, and updates ECS services.

## Monitoring

### Check ECS Service Status
```powershell
aws ecs describe-services --cluster medifind-dev-cluster --services medifind-dev-frontend-service medifind-dev-backend-service --region us-east-1
```

### View Logs
```powershell
# Frontend logs
aws logs tail /ecs/medifind-dev-frontend --follow --region us-east-1

# Backend logs
aws logs tail /ecs/medifind-dev-backend --follow --region us-east-1
```

### Check Database
```powershell
terraform output rds_endpoint
```

## Cost Optimization (Free Tier)

**Free Tier Eligible Resources:**
- ✅ RDS db.t3.micro (750 hours/month)
- ✅ 20GB RDS storage
- ✅ ECS Fargate (limited free tier)
- ✅ ECR storage (500MB)
- ✅ CloudWatch Logs (5GB)

**Resources with Costs:**
- ⚠️ NAT Gateway (~$32/month) - **Biggest cost**
- ⚠️ Application Load Balancer (~$16/month)
- ⚠️ ECS Fargate beyond free tier

**Estimated Monthly Cost: $50-80**

### To Minimize Costs:

1. **Remove NAT Gateway** (use public subnets for ECS):
   - Edit `main.tf`, change ECS services to use public subnets
   - Set `assign_public_ip = true`

2. **Use smaller tasks**:
   - Frontend: 256 CPU, 512 MB memory
   - Backend: 256 CPU, 512 MB memory

3. **Stop when not in use**:
   ```powershell
   aws ecs update-service --cluster medifind-dev-cluster --service medifind-dev-frontend-service --desired-count 0 --region us-east-1
   aws ecs update-service --cluster medifind-dev-cluster --service medifind-dev-backend-service --desired-count 0 --region us-east-1
   ```

## Troubleshooting

### ECS Tasks Not Starting

Check task logs:
```powershell
aws ecs describe-tasks --cluster medifind-dev-cluster --tasks <TASK_ARN> --region us-east-1
```

### Database Connection Issues

Verify security groups allow ECS → RDS traffic on port 3306.

### Images Not Found

Ensure images are pushed to ECR:
```powershell
aws ecr describe-images --repository-name medifind-frontend --region us-east-1
aws ecr describe-images --repository-name medifind-backend --region us-east-1
```

### ALB Health Checks Failing

- Frontend: Check `/` returns 200
- Backend: Check `/health` returns 200

## Cleanup (Destroy Infrastructure)

**⚠️ WARNING: This deletes everything!**

```powershell
terraform destroy
```

Type `yes` to confirm. This removes all AWS resources and stops billing.

## File Structure

```
infra/
├── main.tf           # Main infrastructure configuration
├── variables.tf      # Input variables
├── outputs.tf        # Output values
├── README.md         # This file
└── scripts/
    ├── deploy.sh     # Deployment script (bash)
    └── deploy.ps1    # Deployment script (PowerShell)
```

## Support

For issues:
1. Check CloudWatch logs
2. Verify AWS credentials
3. Ensure Docker images are built correctly
4. Check security group rules

## Next Steps

1. **Custom Domain**: Add Route 53 domain and ACM certificate
2. **HTTPS**: Add SSL certificate to ALB
3. **CI/CD**: Integrate with Jenkins for automated deployments
4. **Monitoring**: Add CloudWatch alarms
5. **Backup**: Configure automated RDS snapshots
