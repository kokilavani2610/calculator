pipeline {
  agent any
  stages {
    stage('PMD Scan') {
      steps {
        script {
          echo 'test'
          bat '''  
          cd bin
          pmd -d ../src/main -R ../rules.xml -f text -r ../output.txt --fail-on-violation false
          '''
        }
      }
    }
  }
}
