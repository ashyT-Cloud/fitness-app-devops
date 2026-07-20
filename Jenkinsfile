pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Backend Image') {
            steps {
                sh 'docker build -t fittrack-backend:v1 ./app/backend'
            }
        }

        stage('Veryfy Images') {
            steps {
                sh 'dcoker images | grep fittrack'
            }
        }

    }

    post {
        always {
            echo 'Pipline Finished'
        }

        success {
            echo 'Build Successful!'
        }
        failure {
            echo 'Build Failed'
        }
    }
}
