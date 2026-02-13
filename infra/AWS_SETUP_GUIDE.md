# AWS Setup Guide for MediFind

This guide will help you set up your AWS account and deploy the MediFind application.

## Step 1: Create AWS Account

1. **Go to AWS Free Tier**: https://aws.amazon.com/free/
2. **Click "Create a Free Account"**
3. **Fill in your details**:
   - Email address
   - Password
   - AWS account name (e.g., "MediFind-Dev")
4. **Contact Information**:
   - Select "Personal" account type
   - Fill in your details
5. **Payment Information**:
   - Add credit/debit card (required for verification)
   - You won't be charged if you stay within Free Tier limits
6. **Identity Verification**:
   - Verify via phone call or SMS
7. **Select Support Plan**:
   - Choose "Basic Support - Free"
8. **Complete Sign-up**

## Step 2: Access AWS Console

1. Go to https://console.aws.amazon.com/
2. Sign in with your email and password
3. You're now in the AWS Management Console!

## Step 3: Create IAM User (Security Best Practice)

**Don't use root account for daily tasks!**

1. **Go to IAM Console**: https://console.aws.amazon.com/iam/
2. **Click "Users"** → **"Create user"**
3. **User details**:
   - Username: `medifind-admin`
   - Check "Provide user access to AWS Management Console"
4. **Permissions**:
   - Select "Attach policies directly"
   - Add these policies:
     - `AdministratorAccess` (for full access)
     - Or for minimal permissions:
       - `AmazonEC2ContainerRegistryFullAccess`
       - `AmazonECS_FullAccess`
       - `AmazonRDSFullAccess`
       - `AmazonVPCFullAccess`
       - `IAMFullAccess`
       - `ElasticLoadBalancingFullAccess`
5. **Create user**
6. **Download credentials** (CSV file)

## Step 4: Create Access Keys

1. **In IAM Console**, click on your user (`medifind-admin`)
2. **Go to "Security credentials" tab**
3. **Scroll to "Access keys"**
4. **Click "Create access key"**
5. **Select use case**: "Command Line Interface (CLI)"
6. **Check the confirmation box**
7. **Click "Create access key"**
8. **Download the CSV file** or copy:
   - Access key ID
   - Secret access key
   
**⚠️ IMPORTANT: Save these credentials securely! You can't view the secret key again.**

## Step 5: Install AWS CLI

### Windows (PowerShell as Administrator)

**Option 1: Direct Download**
```powershell
# Download installer
Invoke-WebRequest -Uri "https://awscli.amazonaws.com/AWSCLIV2.msi" -OutFile "AWSCLIV2.msi"

# Install
msiexec.exe /i AWSCLIV2.msi /qn
```

**Option 2: Using Chocolatey**
```powershell
choco install awscli
```

**Verify installation:**
```powershell
aws --version
```

You should see something like: `aws-cli/2.x.x Python/3.x.x Windows/10`

## Step 6: Configure AWS CLI

```powershell
aws configure
```

**Enter your credentials:**
```
AWS Access Key ID [None]: <YOUR_ACCESS_KEY_ID>
AWS Secret Access Key [None]: <YOUR_SECRET_ACCESS_KEY>
Default region name [None]: us-east-1
Default output format [None]: json
```

**Verify configuration:**
```powershell
aws sts get-caller-identity
```

You should see your account ID and user ARN.

## Step 7: Install Terraform

### Windows (PowerShell as Administrator)

**Option 1: Using Chocolatey**
```powershell
choco install terraform
```

**Option 2: Manual Download**
1. Go to https://www.terraform.io/downloads
2. Download Windows AMD64 version
3. Extract `terraform.exe`
4. Move to `C:\Program Files\Terraform\`
5. Add to PATH:
   ```powershell
   $env:Path += ";C:\Program Files\Terraform"
   [Environment]::SetEnvironmentVariable("Path", $env:Path, [System.EnvironmentVariableTarget]::Machine)
   ```

**Verify installation:**
```powershell
terraform --version
```

## Step 8: Check Your Free Tier Status

1. **Go to AWS Billing Console**: https://console.aws.amazon.com/billing/
2. **Click "Free Tier"** in the left menu
3. **Review your usage**:
   - You get 750 hours/month of RDS db.t3.micro
   - 750 hours/month of EC2 t2.micro (not used in our setup)
   - Limited ECS Fargate hours
   - 5GB CloudWatch Logs

## Step 9: Set Up Billing Alerts (Recommended)

1. **Go to CloudWatch Console**: https://console.aws.amazon.com/cloudwatch/
2. **Click "Alarms"** → **"Billing"**
3. **Create alarm**:
   - Metric: "Total Estimated Charge"
   - Threshold: $10 (or your preferred limit)
   - Email: Your email address
4. **Confirm subscription** via email

## Step 10: Deploy MediFind Infrastructure

Now you're ready to deploy! Follow the main README:

```powershell
cd d:\DevOPs\MediFind\infra
terraform init
terraform plan
terraform apply
```

## Understanding AWS Free Tier Limits

### What's Free (First 12 Months):
- ✅ **RDS**: 750 hours/month of db.t3.micro
- ✅ **RDS Storage**: 20GB
- ✅ **ECS Fargate**: Limited hours (check current limits)
- ✅ **ECR**: 500MB storage/month
- ✅ **CloudWatch Logs**: 5GB ingestion, 5GB archive

### What Costs Money:
- ⚠️ **NAT Gateway**: ~$32/month (~$0.045/hour + data transfer)
- ⚠️ **Application Load Balancer**: ~$16/month (~$0.0225/hour)
- ⚠️ **Data Transfer**: Outbound data beyond 100GB/month
- ⚠️ **ECS Fargate**: Beyond free tier hours

### Estimated Monthly Cost:
- **Minimal usage**: $50-60/month
- **Moderate usage**: $60-80/month
- **Heavy usage**: $80-100/month

## Cost Saving Tips

1. **Stop services when not in use**:
   ```powershell
   # Stop ECS services
   aws ecs update-service --cluster medifind-dev-cluster --service medifind-dev-frontend-service --desired-count 0
   aws ecs update-service --cluster medifind-dev-cluster --service medifind-dev-backend-service --desired-count 0
   ```

2. **Destroy infrastructure when done testing**:
   ```powershell
   terraform destroy
   ```

3. **Use AWS Budgets** to set spending limits

## Troubleshooting

### "aws: command not found"
- Restart PowerShell after installing AWS CLI
- Check PATH environment variable

### "Unable to locate credentials"
- Run `aws configure` again
- Verify access keys are correct

### "Access Denied" errors
- Ensure IAM user has necessary permissions
- Check if you're using the correct AWS region

### Billing concerns
- Check AWS Billing Dashboard regularly
- Set up billing alerts
- Review Free Tier usage

## Next Steps

After successful AWS setup:
1. ✅ Deploy infrastructure with Terraform
2. ✅ Push Docker images to ECR
3. ✅ Access your application via ALB URL
4. ✅ Monitor costs and usage

## Support Resources

- **AWS Free Tier**: https://aws.amazon.com/free/
- **AWS Documentation**: https://docs.aws.amazon.com/
- **AWS Support**: https://console.aws.amazon.com/support/
- **Terraform AWS Provider**: https://registry.terraform.io/providers/hashicorp/aws/

## Security Best Practices

1. ✅ Never share your access keys
2. ✅ Use IAM users, not root account
3. ✅ Enable MFA (Multi-Factor Authentication)
4. ✅ Rotate access keys regularly
5. ✅ Use AWS Secrets Manager for sensitive data
6. ✅ Review security groups regularly
7. ✅ Enable CloudTrail for audit logging

---

**Ready to deploy?** Go back to [infra/README.md](./README.md) for deployment steps!
