pipeline {
  agent any
  stages {
    stage('PMD Scan') {
      steps {
        script {
          echo 'test'
          bat '''
          pmd.bat -d c:/src -R rulesets/java/quickstart.xml -f text
          '''
        }
      }
    }
  }
}
