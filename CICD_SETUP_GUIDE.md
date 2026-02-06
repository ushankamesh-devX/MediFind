# MediFind CI/CD Setup Guide
**Complete Guide for Jenkins + DockerHub Integration**

---

## 📋 Prerequisites Checklist

- ✅ WSL installed on Windows
- ✅ Git installed
- ⏳ Docker Desktop for Windows
- ⏳ DockerHub account
- ⏳ Jenkins (local or server)

---

## 🐳 Step 1: Install Docker Desktop for Windows

### Installation:
1. **Download Docker Desktop:**
   - Visit: https://www.docker.com/products/docker-desktop
   - Download the Windows version

2. **Install Docker Desktop:**
   - Run the installer
   - **Important:** Enable WSL 2 integration during installation
   - Restart your computer when prompted

3. **Configure Docker Desktop:**
   - Open Docker Desktop
   - Go to **Settings** → **Resources** → **WSL Integration**
   - Enable integration with your WSL distro (usually Ubuntu)
   - Click **Apply & Restart**

4. **Verify Installation:**
   ```bash
   # In WSL terminal
   docker --version
   docker compose version
   ```

---

## 🌐 Step 2: Setup DockerHub Account

### Create Account:
1. Go to https://hub.docker.com/
2. Sign up for a free account
3. Verify your email

### Create Repositories:
You need to create 2 repositories for your images:

1. **Login to DockerHub**
2. Click **"Create Repository"**
3. Create these repositories:
   - Repository name: `medifind-frontend`
   - Visibility: Public (or Private if you prefer)
   - Click **Create**

4. Repeat for second repository:
   - Repository name: `medifind-backend`
   - Visibility: Public (or Private)
   - Click **Create**

### Generate Access Token:
1. Click your **profile icon** → **Account Settings**
2. Go to **Security** → **Access Tokens**
3. Click **New Access Token**
4. Name it: `jenkins-medifind`
5. **Copy and save the token** (you won't see it again!)

**Your DockerHub username:** `ushankamesh33` (from your Jenkinsfile)

---

## 🔧 Step 3: Install Jenkins

### Option A: Jenkins on Windows (Recommended for local development)

1. **Install Java (Required for Jenkins):**
   ```powershell
   # In PowerShell (Run as Administrator)
   winget install Microsoft.OpenJDK.17
   ```

2. **Download Jenkins:**
   - Visit: https://www.jenkins.io/download/
   - Download **Windows installer** (.msi file)

3. **Install Jenkins:**
   - Run the installer
   - Default port: `8080`
   - Complete the installation wizard

4. **Initial Setup:**
   - Open browser: http://localhost:8080
   - Get initial admin password:
     ```powershell
     # In PowerShell
     Get-Content "C:\Program Files\Jenkins\secrets\initialAdminPassword"
     ```
   - Install suggested plugins
   - Create your admin user

### Option B: Jenkins on WSL/Linux

```bash
# In WSL terminal
# Install Java
sudo apt update
sudo apt install openjdk-17-jdk -y

# Add Jenkins repository
curl -fsSL https://pkg.jenkins.io/debian-stable/jenkins.io-2023.key | sudo tee \
  /usr/share/keyrings/jenkins-keyring.asc > /dev/null

echo deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] \
  https://pkg.jenkins.io/debian-stable binary/ | sudo tee \
  /etc/apt/sources.list.d/jenkins.list > /dev/null

# Install Jenkins
sudo apt update
sudo apt install jenkins -y

# Start Jenkins
sudo systemctl start jenkins
sudo systemctl enable jenkins

# Get initial password
sudo cat /var/lib/jenkins/secrets/initialAdminPassword
```

Access Jenkins: http://localhost:8080

---

## 🔐 Step 4: Configure Jenkins

### Install Required Plugins:

1. Go to **Manage Jenkins** → **Plugins** → **Available Plugins**
2. Search and install:
   - ✅ **Docker Pipeline**
   - ✅ **Docker**
   - ✅ **Git**
   - ✅ **GitHub**
   - ✅ **Pipeline**
3. Click **Install** and restart Jenkins

### Add DockerHub Credentials:

1. Go to **Manage Jenkins** → **Credentials** → **System** → **Global credentials**
2. Click **Add Credentials**
3. Fill in:
   - **Kind:** Username with password
   - **Username:** `ushankamesh33` (your DockerHub username)
   - **Password:** [Paste your DockerHub access token]
   - **ID:** `dockerhub-credentials` (must match Jenkinsfile)
   - **Description:** DockerHub Credentials
4. Click **Create**

### Configure Docker in Jenkins:

1. **Manage Jenkins** → **System**
2. Scroll to **Docker**
3. Add Docker installation:
   - Name: `docker`
   - Install automatically: ✅ (or specify Docker path)
4. Click **Save**

---

## 🚀 Step 5: Create Jenkins Pipeline

### Method 1: Pipeline from SCM (Recommended)

1. **Push your code to GitHub** (if not already done):
   ```bash
   cd /mnt/d/Git/MediFind
   git add .
   git commit -m "Add Jenkins pipeline"
   git push origin main
   ```

2. **Create Jenkins Job:**
   - Click **New Item**
   - Enter name: `MediFind-Pipeline`
   - Select **Pipeline**
   - Click **OK**

3. **Configure Pipeline:**
   - Scroll to **Pipeline** section
   - **Definition:** Pipeline script from SCM
   - **SCM:** Git
   - **Repository URL:** Your GitHub repo URL
   - **Branch:** `*/main` (or your branch name)
   - **Script Path:** `Jenkinsfile`
   - Click **Save**

### Method 2: Direct Pipeline Script

1. Create new Pipeline job
2. In **Pipeline** section:
   - **Definition:** Pipeline script
   - Copy-paste your Jenkinsfile content
   - Click **Save**

---

## 🧪 Step 6: Test Docker Build Locally (Before Jenkins)

Before running Jenkins, test your Docker setup locally:

```bash
cd /mnt/d/Git/MediFind

# Build images
docker compose build

# Test the build
docker compose up -d

# Check if services are running
docker compose ps

# Test endpoints
curl http://localhost:3000  # Frontend
curl http://localhost:5000/health  # Backend

# Stop services
docker compose down
```

If this works, Jenkins should work too!

---

## 🎯 Step 7: Run Your First Jenkins Build

1. **Go to your Jenkins job:** `MediFind-Pipeline`
2. Click **Build Now**
3. Watch the **Console Output** for progress

### What the Pipeline Does:

1. ✅ **Checkout:** Pulls code from GitHub
2. ✅ **Build:** Creates Docker images for frontend & backend
3. ✅ **Test:** Runs smoke tests (checks if apps start)
4. ✅ **Push:** Pushes images to DockerHub

### Expected Output:

```
Stage: Checkout ✓
Stage: Build Docker Images ✓
Stage: Test App (Smoke Test) ✓
Stage: Push to Docker Hub ✓
Pipeline succeeded! Images pushed to Docker Hub.
```

---

## 🔍 Step 8: Verify on DockerHub

1. Login to https://hub.docker.com/
2. Check your repositories:
   - `ushankamesh33/medifind-frontend`
   - `ushankamesh33/medifind-backend`
3. You should see new tags with build numbers (e.g., `:1`, `:2`, etc.)

---

## 🐛 Troubleshooting

### Issue: Docker not found in Jenkins

**Solution:**
```bash
# Make sure Docker is in PATH
# In Jenkins: Manage Jenkins → System → Environment Variables
# Add: PATH=/usr/local/bin:/usr/bin:/bin
```

### Issue: Permission denied for Docker

**Solution (Linux/WSL):**
```bash
# Add Jenkins user to docker group
sudo usermod -aG docker jenkins
sudo systemctl restart jenkins
```

### Issue: Cannot connect to Docker daemon

**Solution:**
- Make sure Docker Desktop is running
- In Docker Desktop settings, enable "Expose daemon on tcp://localhost:2375"

### Issue: Build fails at npm install

**Solution:**
- Check your `package.json` files
- Try building locally first: `docker compose build`

### Issue: Health check fails

**Solution:**
- Make sure your backend has a `/health` endpoint
- Check `server.js` for health endpoint implementation

---

## 📊 Pipeline Flow Diagram

```
GitHub Repository
      ↓
   Jenkins
      ↓
  Checkout Code
      ↓
Build Docker Images
      ↓
  Run Tests
      ↓
Tag Images (build number)
      ↓
Push to DockerHub
      ↓
✅ Images Available!
```

---

## 🎨 Your Docker Images

After successful build, you can pull and run your images:

```bash
# Pull images
docker pull ushankamesh33/medifind-frontend:1
docker pull ushankamesh33/medifind-backend:1

# Run them
docker run -p 3000:80 ushankamesh33/medifind-frontend:1
docker run -p 5000:5000 ushankamesh33/medifind-backend:1
```

---

## 🔄 Continuous Integration Workflow

1. **Make code changes** in your project
2. **Commit and push** to GitHub:
   ```bash
   git add .
   git commit -m "Your changes"
   git push origin main
   ```
3. **Jenkins automatically detects** the change (if webhook configured)
4. **Or manually trigger:** Click "Build Now" in Jenkins
5. **New images** are built and pushed to DockerHub
6. **Deploy** using the new image tags

---

## 🎯 Next Steps

1. ✅ **Setup GitHub Webhook** (for automatic builds on push)
   - GitHub repo → Settings → Webhooks
   - Add webhook: `http://your-jenkins-url:8080/github-webhook/`

2. ✅ **Add Deployment Stage** to Jenkinsfile
   - Deploy to staging/production server
   - Use Docker Swarm or Kubernetes

3. ✅ **Add More Tests**
   - Unit tests
   - Integration tests
   - E2E tests

4. ✅ **Setup Notifications**
   - Email notifications on build failure
   - Slack integration

---

## 📝 Quick Reference Commands

```bash
# Start Docker Desktop
# (Just open the application)

# Build locally
docker compose build

# Run locally
docker compose up -d

# View logs
docker compose logs -f

# Stop services
docker compose down

# Clean up
docker system prune -a

# Jenkins service (WSL/Linux)
sudo systemctl start jenkins
sudo systemctl status jenkins
sudo systemctl stop jenkins
```

---

## ✅ Summary

You now have:
- ✅ Docker Desktop installed and configured
- ✅ DockerHub account with repositories
- ✅ Jenkins installed and configured
- ✅ CI/CD pipeline that builds and pushes images
- ✅ Automated testing in the pipeline

**Your images are now automatically built and pushed to DockerHub on every build!** 🎉

---

## 📞 Need Help?

- **Jenkins Docs:** https://www.jenkins.io/doc/
- **Docker Docs:** https://docs.docker.com/
- **DockerHub:** https://hub.docker.com/

Happy Building! 🚀
