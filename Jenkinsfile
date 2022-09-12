pipeline {
  agent any
  stages {
    stage('PMD Scan') {
      steps {
        script {
          echo 'test'
          bat '''  
          cd bin
          pmd -d ../src/main -R ../rulesetspmd.xml -f csv -r ../a.csv --fail-on-violation false
          '''
        }
      }
    }
  }
}
