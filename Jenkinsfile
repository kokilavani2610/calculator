pipeline {
  agent any
  stages {
    stage('PMD Scan') {
      steps {
        script {
          echo 'test'
          bat '''
          pmd.bat -d src/main -R rulesets/java/customrule.xml -f text
          '''
        }
      }
    }
  }
}
