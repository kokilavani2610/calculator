pipeline {
  agent any
  stages {
    stage('PMD Scan') {
      steps {
        script {
          echo 'test'
        }
      }
    }
    stage ('Scan') {
            steps {
               //withSonarQubeEnv(installationName: 'sonarqubeserver', credentialsId: 'sonartoken') {
                echo "sonar"
                }
            }
    }
  }
}
