def repoList = 'job-list.csv'
def msMap =[:]
def paralleljob_size =3
def FinalMap =[:]
def branch
def image
def branchname

pipeline {
    agent any
    parameters {
        string(name: 'NAMESPACE', defaultValue: 'sco', description: 'Namespace name', trim: true)
        string(name: 'REPO_LIST', defaultValue: 'scripts/job-list.csv', description: 'Name of CSV file containing the list of images', trim: true)
    }
    stages {

        stage('Parse the CSV') {
        steps {
            script {
		    
			    def file = params.REPO_LIST
                         file.readLines().eachWithIndex{ line, index ->
				 if(index){
                           // def fields = line.split(',')
					 def fields = line.split(',').findAll { 'null' != it && it}
			
                            echo fields[0] + ': ' +  fields[1]+':'+fields[2];
                             def jobname = fields[0]
		
			 if(fields[2]==null){
                               branchname = fields[1]
			 }else if(fields[1]==null){
				  branchname= fields[2]
			 }else{
				  branchname = fields[1]+'##'+fields[2]
			 }
				 
				msMap.put("${jobname}","${branchname}")
					 echo msMap
				
                             }
			 }
		    
			    

			    (msMap.keySet() as List).collate(paralleljob_size).each{
    			 	  FinalMap = msMap.subMap(it)
    			  	 initiatebuild(FinalMap)
				}
			    }else {
                        echo ' File Not found. Failing.'
                    }

			        
				
                    }
	    
	}
	
	
    }
}

                                

def initiatebuild(msMap) {	
	def parallelStage = [:]	
	def jobresult
	 msMap.each{k,v->		
		  parallelStage[k,v] = {			  
			  stage("${k}"){
				  script {
					 def (branch,image) = v.split('##')
					if(BUILD_TYPE == "deploy_only"){							
					   jobresult = build job: "${k}", parameters: [string(name: 'IMAGE_TAG', value: "${image}")], wait: true, propagate: false
					} else{
					  jobresult = build job: "${k}", parameters: [string(name: 'BRANCH', value: "${branch}")], wait: true, propagate: false
					}
					
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
					  
					 
				
			  
	 
	 
	
	 

						 
					
					   
					 
						
   
		    		
		 
	    

		 
