def repoList = 'job-list.csv'
def msMap =[:]
def msMap1=[:]
def FinalMap =[:]
def size
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
                              def branchname = fields[1]+'##'+fields[2]	 				
				msMap.put("${jobname}","${branchname}")		
				
                             }
			    
// 			    for(i in msMap){
// 				 	 println "${i.key}-${i.value}"
// 				 }
// 			    for(i in msMap1){
// 				 	 println "${i.key}-${i.value}"
// 				 }
				
// 			    println msMap.keySet() 
// 			    println msMap.values()
			   // println msList
			    (msMap.keySet() as List).collate(3).each{
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


def initiatebuild(msMap) {
	def parallelStage = [:]		
	 msMap.each{k,v->
		 String branch = v.substring(0,'##')
		 println branch
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
					  
					 
				
			  
	 
	 
	
	 

						 
					
					   
					 
						
   
		    		
		 
	    

		 
