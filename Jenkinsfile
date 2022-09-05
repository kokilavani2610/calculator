pipeline {
  agent any
  stages {
    stage('PMD Scan') {
      steps {
        script {
          echo 'test'
          bat '''          
          pmd -dir . -f csv -R customrule.xml
          '''
        }
      }
    }
  }
}
