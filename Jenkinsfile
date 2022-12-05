pipeline {
  agent any
  parameters {
    string(name: 'BRANCH', defaultValue: 'main', description: 'Namespace name', trim: true)
  }
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
//     stage('Slack Upload'){
//       steps {
//         slackUploadFile filePath: 'a.csv', initialComment: 'trying to uploading file'
//       }
//     }
    stage ('Scan and Build Jar File') {
            steps {
               withSonarQubeEnv(installationName: 'sonarqubeserver', credentialsId: 'sonartoken') {
                echo "sonar"
                }
            }
        }
  }
}
