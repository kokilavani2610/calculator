pipeline {
  agent any
  stages {
    stage('PMD Scan') {
      steps {
        script {
          echo 'test'
          bat '''          
          pmd -d src/main -R customrule.xml -r error.txt
          '''
        }
      }
    }
  }
}
