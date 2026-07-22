pipeline {
    agent any

    environment {
        BACKEND_IMAGE = "ashytcloud/fittrack-backend"
        FRONTEND_IMAGE = "ashytcloud/fittrack-frontend"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Backend') {
            steps {
                sh """
                docker build -t ${BACKEND_IMAGE}:${BUILD_NUMBER} ./app/backend
                """
            }
        }

        stage('Build Frontend') {
            steps {
                sh """
                docker build -t ${FRONTEND_IMAGE}:${BUILD_NUMBER} ./app/frontend
                """
            }
        }

        stage('Docker Login') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub-creds',
                        usernameVariable: 'DOCKER_USERNAME',
                        passwordVariable: 'DOCKER_PASSWORD'
                    )
                ]) {
                    sh '''
                    echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
                    '''
                }
            }
        }

        stage('Push Backend') {
            steps {
                sh '''
                docker tag ${BACKEND_IMAGE}:${BUILD_NUMBER} ${BACKEND_IMAGE}:latest
                docker push ${BACKEND_IMAGE}:${BUILD_NUMBER}
                docker push ${BACKEND_IMAGE}:latest
                '''
            }
        }

        stage('Push Frontend') {
            steps {
                sh '''
                docker tag ${FRONTEND_IMAGE}:${BUILD_NUMBER} ${FRONTEND_IMAGE}:latest
                docker push ${FRONTEND_IMAGE}:${BUILD_NUMBER}
                docker push ${FRONTEND_IMAGE}:latest
                '''
            }
        }

        stage('Deploy') {
            steps {
                withCredentials([
                    file(
                        credentialsId: 'fittrack-env',
                        variable: 'ENV_FILE'
                    )
                ]) {

                    sh '''
                    set -e

                    mkdir -p /opt/fittrack

                    rm -rf /opt/fittrack/*

                    cp deploy/docker-compose.yml /opt/fittrack/
                    cp "$ENV_FILE" /opt/fittrack/.env

                    cd /opt/fittrack

                    docker compose down --remove-orphans || true

                    docker compose pull

                    docker compose up -d --force-recreate

                    docker image prune -f || true
                    '''
                }
            }
        }
    }

    post {

        always {
            sh 'docker logout || true'
        }

        success {
            echo 'Pipeline Successful'
        }

        failure {
            echo 'Pipeline Failed'
        }
    }
}
