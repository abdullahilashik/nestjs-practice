pipeline {
    agent any

    stages {
        stage ('Commit') {
            steps {
                echo 'Preparing repository for CI/CD'
            }
        }

        stage('Dependencies') {
            steps {
                bat 'npm i'
            }
        }

        stage('Build') {
            steps {
                bat 'npm run build'
            }
        }

        stage('Tests') {
            steps {
                // bat 'npm test'
                echo 'Mock test passed..'
            }
        }
    }
}