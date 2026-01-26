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

                    docker push ${IMAGE_NAME}/medifind-frontend:${IMAGE_TAG}
                    docker push ${IMAGE_NAME}/medifind-backend:${IMAGE_TAG}
                """
            }
        }
    }

    post {
        always {
            sh 'docker compose down || true'
            sh 'docker system prune -f || true'
        }
        success {
            echo 'Pipeline succeeded! Images pushed to Docker Hub.'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}