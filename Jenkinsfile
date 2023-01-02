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
stage("git-push") {
               steps {
	       		withCredentials([gitUsernamePassword(credentialsId: 'github_credentials', gitToolName: 'Default')]) {
           
                    bat '''
		     git config --global user.email "kokilavani688@gmail.com"
                     git config --global user.name "kokilavani2610"
		     
		     git branch -a
		     git checkout autodeploy
	             git status
	             git add scripts/job-list.csv

                     git commit -m "update changes"
		     
		     git push https://github.com/kokilavani2610/calculator.git autodeploy
		     
	           '''
		   }
		 }
           }
