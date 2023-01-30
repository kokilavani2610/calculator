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
			         invokeResult(output,slackChannel)  
				   
				   
			}
		}
	}
	    stage('Wellness Script') {
		    steps {
			    script {
				    jobresult= build job: "springboot" , parameters: [string(name: 'BRANCH', value: 'main')],wait: true, propagate: true	    
				     
				    echo "output"
				    echo "${jobresult.getResult()}"
				    output = "${jobresult.getResult()}"
				    echo "${output}"
				    if("${output}" != 'SUCCESS'){
						catchError(stageResult: 'FAILURE', buildResult: 'SUCCESS'){
						      slackSend (channel: "#${slackChannel}", color: '#FF0000', tokenCredentialId: 'slack-bot-token', message: "FAILED: Job '${env.STAGE_NAME} on [${env.BUILD_NUMBER}] '")
					}
					}else{
						slackSend (channel: "#${slackChannel}", color: '#00FF00', tokenCredentialId: 'slack-bot-token', message: "SUCCESSFUL: Job '${env.STAGE_NAME} on [${env.BUILD_NUMBER}] '")
					}
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
				    invokeResult(output,slackChannel)
			    }
		    }
	    }
    }
}
def invokeResult(buildresult,slackChannel) {
	
					if("${buildresult}" != 'SUCCESS'){
						catchError(stageResult: 'FAILURE', buildResult: 'SUCCESS'){
						      slackSend (channel: "#${slackChannel}", color: '#FF0000', tokenCredentialId: 'slack-bot-token', message: "FAILED: Job '${env.STAGE_NAME} on [${env.BUILD_NUMBER}] '")
					}
					}else{
						slackSend (channel: "#${slackChannel}", color: '#00FF00', tokenCredentialId: 'slack-bot-token', message: "SUCCESSFUL: Job '${env.STAGE_NAME} on [${env.BUILD_NUMBER}] '")
					}
}

				    
			  
				
				
				    
				
				
				
				

				

			 
			

		
		
					
						       
						
					
					
					
		
        
