pipeline {
  agent any   
  stages {
    stage('Hello') {
      steps {
        script {
            bat '''
              kubectl -v
              '''
        }
      }
    }    
  }
}
