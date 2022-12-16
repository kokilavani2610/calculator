def repoList = 'job-list.csv'
def msMap =[:]
def paralleljob_size =3
def FinalMap =[:]
def branch
def image

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
		
			 if(fields[2]==null){
                              def branchname = fields[1]
			 }else if(fields[1]==null){
				 def branchname= fields[2]
			 }else{
				 def branchname = fields[1]+'##'+fields[2]
			 }
				 
				msMap.put("${jobname}","${branchname}")		
				
                             }
			    

			    (msMap.keySet() as List).collate(paralleljob_size).each{
    			 	  FinalMap = msMap.subMap(it)
    			  	 initiatebuild(FinalMap)
				}
			    //size =msMap.size()
			    //initiatebuild(msMap,size)	    
				
                    }else {
                        echo ' File Not found. Failing.'
                    }
	    }
	}
	}
    }
}

                                

def initiatebuild(msMap) {	
	def parallelStage = [:]	
	
	 msMap.each{k,v->		
		  parallelStage[k,v] = {			  
			  stage("${k}"){
				  script {
					 def (branch,image) = v.split('##')
					if(BUILD_TYPE == "deploy_only"){							
					def jobresult = build job: "${k}", parameters: [string(name: 'IMAGE_TAG', value: "${image}")], wait: true, propagate: false
					} else{
						def jobresult = build job: "${k}", parameters: [string(name: 'BRANCH', value: "${branch}")], wait: true, propagate: false
					}
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
					  
					 
				
			  
	 
	 
	
	 

						 
					
					   
					 
						
   
		    		
		 
	    

		 
