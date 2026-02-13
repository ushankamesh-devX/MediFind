pipeline {
    agent any

    environment {
        AWS_ACCESS_KEY_ID     = credentials('aws-access-key-id')
        AWS_SECRET_ACCESS_KEY = credentials('aws-secret-access-key')
        AWS_DEFAULT_REGION    = 'us-east-1'
        DOCKER_HUB_CREDS      = credentials('docker-hub-credentials') // Username/Password
        SSH_KEY               = credentials('medifind-ssh-key') // SSH Private Key
        TF_VAR_ssh_public_key = credentials('medifind-ssh-public-key') // SSH Public Key content
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Infrastructure (Terraform)') {
            steps {
                dir('infra') {
                    sh 'terraform init'
                    sh 'terraform validate'
                    // Apply changes automatically (use with caution in prod)
                    sh 'terraform apply -auto-approve'
                    
                    // Extract EC2 IP for Ansible
                    script {
                        def ec2_ip = sh(script: "terraform output -raw ec2_public_ip", returnStdout: true).trim()
                        env.EC2_IP = ec2_ip
                    }
                }
            }
        }

        stage('Build & Push Docker Images') {
            steps {
                script {
                    docker.withRegistry('', 'docker-hub-credentials') {
                        def frontendImage = docker.build("ushankamesh33/medifind-frontend:latest", "./frontend")
                        def backendImage = docker.build("ushankamesh33/medifind-backend:latest", "./backend")
                        
                        frontendImage.push()
                        backendImage.push()
                    }
                }
            }
        }

        stage('Deploy (Ansible)') {
            steps {
                dir('infra/ansible') {
                    // Create dynamic inventory
                    sh "echo '[webservers]\n${env.EC2_IP}' > inventory.ini"
                    
                    // Run Playbook
                    withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', usernameVariable: 'DOCKER_HUB_USERNAME', passwordVariable: 'DOCKER_HUB_PASSWORD')]) {
                        withCredentials([file(credentialsId: 'medifind-ssh-key', variable: 'SSH_KEY_FILE')]) {
                             sh "ansible-playbook -i inventory.ini deploy.yml --private-key ${SSH_KEY_FILE} --extra-vars 'DOCKER_HUB_USERNAME=${DOCKER_HUB_USERNAME} DOCKER_HUB_PASSWORD=${DOCKER_HUB_PASSWORD}'"
                        }
                    }
                }
            }
        }
    }
}
