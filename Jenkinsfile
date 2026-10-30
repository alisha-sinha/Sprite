pipeline {
    agent any

    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                // Installs Node modules defined in package.json
                bat 'npm install'
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                // Installs the required browser binaries for Playwright
                bat 'npx playwright install'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                // Executes your automated test suite
                bat 'npx playwright test'
            }
        }
    }
}