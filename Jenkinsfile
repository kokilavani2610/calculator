pipeline {
  agent any   
  stages {
    stage('Hello') {
      steps {
        script {
            bat '''
              kubectl apply -f pod.yaml
              '''
        }
      }
    }    
  }
}
