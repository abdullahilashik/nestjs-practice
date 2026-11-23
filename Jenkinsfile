pipeline {
    agent any

    stages {
        stage ('Commit') {
            steps {
                echo 'Preparing repository for CI/CD'
            }
        }

        stage('Dependencies') {
            bat `npm i`
        }

        stage('Build') {
            bat `npm run build`
        }
    }
}