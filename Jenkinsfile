pipeline {
    agent any
    
    tools {nodejs "node"}
    
    environment {
        deployDir = '/var/www/my-app' // Change to your deployment directory
    }

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main', credentialsId: '998f90e1-cbe3-4efb-a0fe-203ec595dc87', url: 'https://github.com/Zaid-018/E-Pathshala-clone.git'
            }
        }

        stage('Build') {
            steps {
                sh 'npm build'
               
            }
        }

        stage('Test') {
            steps {
                sh 'npm test'
                
            }
        }

        stage('Deploy') {
            steps {
                // Copy the build files to the deployment directory
                sh "cp -r build/* ${deployDir}/"

                // Optionally, restart your application (e.g., using PM2 or another process manager)
                //sh "pm2 restart my-app" // Replace 'my-app' with your application name if using PM2
            }
        }
    }

    post {
        success {
            echo 'Build succeeded!'
        }
        failure {
            echo 'Build failed!'
        }
    }
}
