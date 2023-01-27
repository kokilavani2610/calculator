pipeline {
    agent any
   parameters {      
        choice(name: 'DEVICE_TYPE', choices: "Android\niOS", description: 'Mobile device type on which to test')
	string(name: 'DEVICE', defaultValue: 'GalaxyS10', description: 'Mobile device on which to test', trim: true)  
	choice(name: 'TEST_TYPE', choices: "RELEASE\nTEST_PLAN", description: 'Regression Suite or Test Plan')
	string(name: 'TEST_PLAN', defaultValue: 'UAT login', description: 'Scenario to test', trim: true)
        string(name: 'TEST_CASE', defaultValue: 'LOGIN', description: 'Test case to execute', trim: true)
	string(name: 'RELEASE', defaultValue: 'Jenkins_execution_Pack', description: 'Regression Suite to test', trim: true)
        string(name: 'TEST_SET', defaultValue: 'Platinum_Pack_2', description: 'Test Set to execute', trim: true)
    }
    stages {	    
        stage('Executing Microservices') {
		steps {
			script {
				
			    build job: "Multibranch/main"
// 				output = "${jobresult.getResult()}"
// 				echo "${output}"
				

// 			  jobresult1 = build job : "wellness_pipeline" , wait :true
// 				output1 = "${jobresult1.getResult()}"
				

// 			 jobresult2 = build job : "QuinnoxPipeline" , parameters: [string(name: 'DEVICE_TYPE', value: params.DEVICE_TYPE), string(name:'DEVICE', value: params.DEVICE),
// 											       string(name: 'TEST_TYPE' , value: params.TEST_TYPE),string(name: 'TEST_PLAN',value: params.TEST_PLAN),
// 											string(name: 'TEST_CASE',value: params.TEST_CASE),string(name: 'RELEASE', value: params.RELEASE),
// 											string(name: 'TEST_SET', value: params.TEST_SET)], wait: true
// 				output2 = "${jobresult2.getResult()}"
			}
				
			
		}
	}
    }
}
// def result(buildresult) {
	
// 					if("${build}" != 'SUCCESS'){
// 						catchError(stageResult: 'FAILURE', buildResult: 'SUCCESS'){
// 						       error("Job Failed.")
// 					}
// 					}else{echo "No issues"}
// }
		
		
					
						       
						
					
					
					
		
        
