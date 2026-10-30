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
                bat 'npm install'
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                bat 'npx playwright install'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                // Allows the pipeline to continue even if tests fail so reports can generate
                catchError(buildResult: 'FAILURE', societalResult: 'SUCCESS') {
                    bat 'npx playwright test'
                }
            }
        }
    }

    post {
        always {
            // Publishes the Playwright HTML report to the Jenkins dashboard
            publishHTML([
                allowMissing: false,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright Test Report'
            ])
        }
    }
}
