pipeline {
  agent any  
  stages {
    stage('Echo') {
      steps {
        script {
          echo 'test'
        }
      }
    } 
    stage('UAT Scan') {
      steps {
        script {
         bat '''
         cd UAT_script         
         UAT_SCA.bat
         '''
        }
      }
    }   
  }
}
