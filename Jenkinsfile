def jobresult
def slackChannel = "pmd-output"
def output
pipeline {
    agent any
   parameters {      
        choice(name: 'DEVICE_TYPE', choices: "Android\niOS", description: 'Mobile device type on which to test')
	choice(name: 'DEVICE', choices: "GalaxyS10\niphone11Quin", description: 'Mobile device on which to test')  
	choice(name: 'TEST_TYPE', choices: "RELEASE\nTEST_PLAN", description: 'Regression Suite or Test Plan')
	string(name: 'TEST_PLAN', defaultValue: 'UAT login', description: 'Scenario to test', trim: true)
        string(name: 'TEST_CASE', defaultValue: 'LOGIN', description: 'Test case to execute', trim: true)
	choice(name: 'RELEASE', choices: "Jenkins_execution_Pack\niOS Jenkins_execution_Pack", description: 'Regression Suite to test')
        string(name: 'TEST_SET', defaultValue: 'Platinum_Pack_2', description: 'Test Set to execute', trim: true)
    }
    stages {	    
        stage('Mutlibranch Job') {		
		steps {
			script {
				jobresult = build job: "Multibranch/main"
				output = "${jobresult.getResult()}"
			        
				   
				   
			}
		}
	}
	    stage('Wellness Script') {
		    steps {
			    script {
				    jobresult= build job: "springboot" , parameters: [string(name: 'BRANCH', value: 'main')], wait: true, propagate: true	
				    output = "${jobresult.getResult()}"
				    
			    }
		    }
	    }
	    stage('Quinnox') {
		    steps {
			    script {
				    jobresult = build job: "QuinnoxPipeline" , parameters: [string(name: 'DEVICE_TYPE', value: params.DEVICE_TYPE), string(name:'DEVICE', value: params.DEVICE),
											       string(name: 'TEST_TYPE' , value: params.TEST_TYPE),string(name: 'TEST_PLAN',value: params.TEST_PLAN),
											string(name: 'TEST_CASE',value: params.TEST_CASE),string(name: 'RELEASE', value: params.RELEASE),
											string(name: 'TEST_SET', value: params.TEST_SET)], wait: true, propagate: true
				    output = "${jobresult.getResult()}"
				    
			    }
		    }
	    }
    }
	post {
        always {
            echo 'This will always run'
        }
        success {
            script {
                echo 'This will run only if successful'
                slackBuildSuccess()
            }    
        }
        failure {
            script {
                echo 'This will run only if failed'
                slackBuildFailure()
            }
        }
        unstable {
            echo 'This will run only if the run was marked as unstable'
        }
        changed {
            echo 'This will run only if the state of the Pipeline has changed'
            echo 'For example, if the Pipeline was previously failing but is now successful'
        }
    }
}
def slackBuildSuccess() {
	slackSend (channel: "#${slackChannel}", color: '#00FF00', tokenCredentialId: 'slack-bot-token', message: "SUCCESSFUL: Job '${env.STAGE_NAME} on [${env.BUILD_NUMBER}] '")
}
def slackBuildFailure() {
	slackSend (channel: "#${slackChannel}", color: '#FF0000', tokenCredentialId: 'slack-bot-token', message: "FAILED: Job '${env.STAGE_NAME} on [${env.BUILD_NUMBER}] '")
}
	
	
					
				    
			  
				
				
				    
				
				
				
				

				

			 
			

		
		
					
						       
						
					
					
					
		
        
