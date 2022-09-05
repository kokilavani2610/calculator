pipeline {
  agent any
  stages {
    stage('PMD Scan') {
      steps {
        script {
          echo 'test'
          bat '''  
          cd bin
          pmd -d ../src/main -R ../customrule.xml -f text -r ../error.txt --fail-on-violation false
          '''
        }
      }
    }
  }
}
