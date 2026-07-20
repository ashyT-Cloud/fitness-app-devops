pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Debug Environment') {
            steps {
                sh '''
                    echo "===== DEBUG ====="
                    echo "User: $(whoami)"
                    echo "PATH: $PATH"
                    which docker || true
                    ls -l /usr/bin/docker || true
                    /usr/bin/docker version || true
                '''
             }
        }

        stage('Build Backend Image') {
            steps {
                sh 'docker build -t fittrack-backend:v1 ./app/backend'
            }
        }

        stage('Veryfy Images') {
            steps {
                sh 'docker images | grep fittrack'
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
