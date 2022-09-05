pipeline {
  agent any
  stages {
    stage('PMD Scan') {
      steps {
        script {
          echo 'test'
          bat '''          
          pmd -d ../src/main -R ../customrule.xml -f text -r ../error.txt --fail-on-violation false
          '''
        }
      }
    }
  }
}
