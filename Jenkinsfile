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
    stage('Slack Upload'){
      steps {
        slackUploadFile filePath: 'C:\\Users\\003HCC744\\.jenkins\\jobs\\pmd-github\\workspace', initialComment: 'trying to uploading file'
      }
    }
  }
}
