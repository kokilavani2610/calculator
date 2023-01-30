pipeline {
  agent any
   parameters {
    string(name: 'BRANCH', defaultValue: 'main', description: 'Namespace name', trim: true)
  }
  stages {
    stage('PMD Scan') {
      steps {
        script {
            test
        }
      }
    }    
  }
}
