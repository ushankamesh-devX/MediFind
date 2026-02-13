# AWS & Jenkins Setup Guide for MediFind

This guide will walk you through setting up your AWS account, creating the infrastructure (EC2), and configuring Jenkins to deploy your application automatically.

## Prerequisites
- AWS Account (Free Tier)
- GitHub Account
- Docker Hub Account
- WSL (Windows Subsystem for Linux) installed

---

## Step 1: AWS Account & Security (One-Time Setup)

### 1. Create AWS Account
1.  Go to [aws.amazon.com/free](https://aws.amazon.com/free/).
2.  Click **Create a Free Account** and follow the instructions.
3.  **Wait 24 hours** for full activation (usually faster).

### 2. Create Admin User (IAM)
1.  Log in to the [AWS Console](https://console.aws.amazon.com/console/home) as Root.
2.  Go to **IAM** service.
3.  Click **Users** -> **Create user**.
4.  Username: `medifind-admin`.
5.  Attach policies directly: Search for and select `AdministratorAccess`.
6.  Create user.

### 3. Generate Access Keys
1.  Click on the `medifind-admin` user you just created.
2.  Go to **Security credentials** tab.
3.  Scroll to **Access keys** -> **Create access key**.
4.  Select **CLI** -> Check confirmation -> **Next**.
5.  **Download the .csv file**. You will need these keys for Jenkins and Terraform.
    *   `Access Key ID`
    *   `Secret Access Key`

---

## Step 2: Configure Local Environment (WSL)

Open your WSL terminal:

### 1. Install Credentials
Run `aws configure` and enter the keys from the CSV file:
```bash
aws configure
# AWS Access Key ID: [Paste from CSV]
# AWS Secret Access Key: [Paste from CSV]
# Default region: us-east-1
# Default output format: json
```

### 2. Verify Terraform
Ensure Terraform is installed and working:
```bash
terraform -version
```

---

## Step 3: Provision Infrastructure (Create EC2)

This step uses the code I wrote to create the Server (EC2), Database (RDS), and Network.

1.  Navigate to the infra directory:
    ```bash
    cd d:/DevOPs/MediFind/infra
    ```

2.  Initialize Terraform:
    ```bash
    terraform init
    ```

3.  Create the SSH Key Pair (Important!):
    You need to generate a public key for the EC2 instance.
    ```bash
    # Generate a key pair named 'deployer-key' with no passphrase
    ssh-keygen -t rsa -b 4096 -f ~/.ssh/deployer-key -N ""
    ```
    The key fingerprint is:

SHA256:2njQV8ae926GYVztTDjN3tfG4h5qpmCYfvkLwswVuU8 ushankamesh@KAMESH

4.  **Deploy Infrastructure**:
    Run this command to create the resources on AWS. We pass the public key we just updated.
    ```bash
    terraform apply -var="ssh_public_key=$(cat ~/.ssh/deployer-key.pub)"
    ```
    *   Type `yes` when prompted.
    *   **Wait** for it to finish (approx 5-10 mins for RDS).

5.  **Save the Output**:
    After it finishes, you will see green outputs like `ec2_public_ip` and `rds_endpoint`. **Save these!**

---
3.91.14.84
medifind-dev-db.cypo24u02pwh.us-east-1.rds.amazonaws.com

## Step 4: Configure Jenkins

Now we connect Jenkins to AWS and Docker Hub.

### 1. Open Jenkins
Go to your Jenkins Dashboard (e.g., `localhost:8080`).

### 2. Install Plugins (If missing)
Manage Jenkins -> Plugins -> Install:
- `Docker Pipeline`
- `Ansible`
- `Pipeline: AWS Steps` (optional but good)

### 3. Add Credentials
Go to **Manage Jenkins** -> **Credentials** -> **System** -> **Global credentials (unrestricted)** -> **Add Credentials**.

Add the following 5 credentials EXACTLY as named:

| Kind | ID | Username | Password/Secret | Description |
| :--- | :--- | :--- | :--- | :--- |
| **Secret text** | `aws-access-key-id` | - | *Your AWS Access Key ID* | AWS Access Key |
| **Secret text** | `aws-secret-access-key` | - | *Your AWS Secret Key* | AWS Secret Key |
| **Username with password** | `docker-hub-credentials` | *Your DockerHub ID* | *Your DockerHub Password* | Docker Hub |
| **Secret text** | `medifind-ssh-public-key` | - | *Content of ~/.ssh/deployer-key.pub* | Public Key for Terraform |
| **SSH Username with private key** | `medifind-ssh-key` | `ubuntu` | *Private Key* (Select "Enter directly" and paste content of `~/.ssh/deployer-key`) | Private Key for Ansible |

---

## Step 5: Run the Pipeline

1.  Create a new **Pipeline** job named `MediFind-Deploy`.
2.  Scroll to **Pipeline** section.
3.  Definition: **Pipeline script from SCM**.
4.  SCM: **Git**.
5.  Repository URL: *Path to your repo* (or local path like `file:///d/DevOPs/MediFind` if testing locally, but usually a GitHub URL).
6.  Script Path: `Jenkinsfile`.
7.  Click **Save**.
8.  Click **Build Now**.

---

## Troubleshooting

### "Permission denied (publickey)"
- Check that the `medifind-ssh-key` credential in Jenkins contains the **Private Key** (`~/.ssh/deployer-key`) and NOT the public key.
- Ensure the `terraform apply` step successfully added the **Public Key** (`~/.ssh/deployer-key.pub`) to the EC2 instance.

### "Docker command not found"
- Ensure the Jenkins agent (computer running Jenkins) has Docker installed.
- Or, if running inside a container, ensure the Docker socket is mounted.

### "Terraform error"
- Check the Console Output in Jenkins for specific errors.
- Ensure `aws-access-key-id` and `aws-secret-access-key` are correct.
