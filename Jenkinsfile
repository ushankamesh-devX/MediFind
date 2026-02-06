pipeline {
    agent any

    environment {
        // Replace with your Docker Hub username
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-credentials')
        IMAGE_NAME = 'ushankamesh33'  // Your Docker Hub username
        IMAGE_TAG = "${BUILD_NUMBER}"
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out code from GitHub...'
                checkout scm
            }
        }

        stage('Build Docker Images') {
            steps {
                echo 'Building Docker images using docker compose...'
                sh 'docker compose build'
            }
        }

        stage('Test App (Smoke Test)') {
            steps {
                echo 'Starting containers to test...'
                sh 'docker compose up -d'
                sh 'sleep 15'  // Wait for services to be fully ready
                sh 'curl -f http://localhost:3000 || exit 1'  // Frontend
                sh 'curl -f http://localhost:5000/health || exit 1'  // Backend health endpoint
                sh 'docker compose down'
            }
        }

        stage('Push to Docker Hub') {
            steps {
                echo 'Logging in to Docker Hub...'
                sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'

                echo 'Tagging and pushing images...'
                sh """
                    docker tag medifind-ci-cd-frontend ${IMAGE_NAME}/medifind-frontend:${IMAGE_TAG}
                    docker tag medifind-ci-cd-backend ${IMAGE_NAME}/medifind-backend:${IMAGE_TAG}
                    docker tag medifind-ci-cd-frontend ${IMAGE_NAME}/medifind-frontend:latest
                    docker tag medifind-ci-cd-backend ${IMAGE_NAME}/medifind-backend:latest

                    docker push ${IMAGE_NAME}/medifind-frontend:${IMAGE_TAG}
                    docker push ${IMAGE_NAME}/medifind-backend:${IMAGE_TAG}
                    docker push ${IMAGE_NAME}/medifind-frontend:latest
                    docker push ${IMAGE_NAME}/medifind-backend:latest
                """
            }
        }

        stage('Deploy Infrastructure with Terraform') {
            steps {
                echo 'Deploying AWS infrastructure with Terraform...'
                withCredentials([
                    string(credentialsId: 'aws-access-key-id', variable: 'AWS_ACCESS_KEY_ID'),
                    string(credentialsId: 'aws-secret-access-key', variable: 'AWS_SECRET_ACCESS_KEY')
                ]) {
                    dir('infra') {
                        sh '''
                            terraform init
                            terraform plan -out=tfplan
                            terraform apply -auto-approve tfplan
                            terraform output -raw instance_public_ip > ../ec2_ip.txt
                        '''
                    }
                }
            }
        }

        stage('Configure Server with Ansible') {
            steps {
                echo 'Configuring EC2 server and deploying application...'
                withCredentials([
                    sshUserPrivateKey(credentialsId: 'ec2-ssh-key', keyFileVariable: 'SSH_KEY')
                ]) {
                    sh '''
                        # Get EC2 IP from Terraform output
                        EC2_IP=$(cat ec2_ip.txt)
                        
                        # Create inventory file
                        echo "[medifind_servers]" > inventory_dynamic
                        echo "$EC2_IP" >> inventory_dynamic
                        echo "" >> inventory_dynamic
                        echo "[medifind_servers:vars]" >> inventory_dynamic
                        echo "ansible_user=ubuntu" >> inventory_dynamic
                        echo "ansible_ssh_private_key_file=$SSH_KEY" >> inventory_dynamic
                        echo "ansible_python_interpreter=/usr/bin/python3" >> inventory_dynamic
                        
                        # Install Ansible if not present
                        which ansible-playbook || sudo apt-get update && sudo apt-get install -y ansible
                        
                        # Install required Ansible collections
                        ansible-galaxy collection install -r requirements.yml || true
                        
                        # Wait for SSH to be available
                        sleep 30
                        
                        # Run Ansible playbook
                        ANSIBLE_HOST_KEY_CHECKING=False ansible-playbook -i inventory_dynamic playbook.yml
                    '''
                }
            }
        }
    }

    post {
        always {
            sh 'docker compose down || true'
            sh 'docker system prune -f || true'
        }
        success {
            echo 'Pipeline succeeded! Application deployed to AWS.'
            script {
                def ec2Ip = readFile('ec2_ip.txt').trim()
                echo "Application is live at: http://${ec2Ip}:3000"
                echo "Also accessible at: http://www.medifind.kamesh.me (once DNS propagates)"
            }
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}