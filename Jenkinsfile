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
         ls
         UAT_SCA.bat
         '''
        }
      }
    }   
  }
}
