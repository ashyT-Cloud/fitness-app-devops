pipeline {
    agent any

    environment {
        DOCKER_USER = "ashytcloud"
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

        stage('Build Frontned') {
            steps {
                sh """
                docker build -t ${FRONTEND_IMAGE}:${BUILD_NUMBER} ./app/frontend
                """
            }
        }

        stage('Docker Login') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'DOCKER_USERNAME',
                    passwordVariable: 'DOCKER_PASSWORD'
                )]) {
                    sh '''
                    echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
                    '''
                }
            }
        }

        stage('Pish Backend') {
            steps {
                sh '''
                docker push ${BACKEND_IMAGE}:${BUILD_NUMBER}
                '''
            }
        }

        stage('Push Frontend') {
            steps {
                sh '''
                docker push ${FRONTEND_IMAGE}:${BUILD_NUMBER}
                '''
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
