def repoList = 'job-list.csv'
def msMap =[:]
def msList=[]
pipeline {
    agent any
    parameters {
        string(name: 'NAMESPACE', defaultValue: 'sco', description: 'Namespace name', trim: true)
        string(name: 'Repo_LIST', defaultValue: 'job-list.csv', description: 'Name of CSV file containing the list of images', trim: true)
    }
    stages {

        stage('Parse the CSV') {
        steps {
            script {
		    
                    if (fileExists('scripts/job-list.csv')) {
                        echo 'File found'
                         readFile("scripts/job-list.csv").split('\n').each { line, count ->
                            def fields = line.split(',')
                            //echo fields[0] + ': ' +  fields[1]+':'+fields[2];
                             def jobname = fields[0]                           
                              def branchname = fields[1]
				 def imagetag =fields[2]				
				 msList.add("${branchname}")
				 msList.add("${imagetag}")
				msMap.put("${jobname}",msList)
				 //for  (i=0;i<=
				 msMap.each{k, v -> println "${k}:${v}"}
				
                             }
			    
				println msMap.size()  
			    initiatebuild(msMap)	    

                    }else {
                        echo ' File Not found. Failing.'
                    }

                                }

                        }
                }
	    
	    
    

    
	    
	       
// 			 stage("pmd"){
// 			    steps {
// 	     			script {
// 					def parallelStage = [:]
// 					  msMap.each{k,v->
// 						  parallelStage[k,v] = {
					
// 					   stage("${k}"){
						
// 						def jobresult = build job: "${k}", parameters: [string(name: 'BRANCH', value:"${v}")], wait:true, propagate: false
// 					//sh 'sleep 150'		
// 					 def buildresult =  "${jobresult.getResult()}"
// 					echo "${buildresult}"
// 					if("${buildresult}" != 'SUCCESS'){
// 						catchError(stageResult: 'FAILURE', buildResult: 'SUCCESS'){
// 						       error("Downstream job failing-job failed.")
// 					}
// 					}else{echo "No issues"}
// 					   }
// 						  }
// 					  }
// 				}
// 			    }
// 				 parallel parallelStage
// 			 }
    }
}

   
	

							   
	
// 		       stage("Pipeline 1"){
// 			       steps {
// 	     			script {	       			
// 					def jobresult = build job: "Pipeline 1", parameters: [string(name: 'BRANCH', value: 'pmd')], wait: true, propagate: false
// 					//sh 'sleep 150'		
// 					 def buildresult =  "${jobresult.getResult()}"
// 					echo "${buildresult}"
// 					if("${buildresult}" != 'SUCCESS'){
// 						catchError(stageResult: 'FAILURE', buildResult: 'SUCCESS'){
// 						       error("Downstream job failing-job failed.")
// 					}
// 					}else{echo "No issues"}
// 				 }
// 			       }
// 		       }
	  




def initiatebuild(msMap) {
	def parallelStage = [:]
	 msMap.each{k,v->
		  parallelStage[k,v] = {
			  stage("${k}"){
				  script {	       			 
					def jobresult = build job: "${k}", parameters: [string(name: 'BRANCH', value: "${v}")], wait: true, propagate: false
					//sh 'sleep 150'		
					def buildresult =  "${jobresult.getResult()}"
					echo "${buildresult}"
					if("${buildresult}" != 'SUCCESS'){
						catchError(stageResult: 'FAILURE', buildResult: 'SUCCESS'){
						       error("Downstream job failing-job failed.")
					}
					}else{echo "No issues"}
				 }
			  }
		  }
	 }
	parallel parallelStage
}
						 
					
					   
					 
						
   
		    		
		 
	    

		 
