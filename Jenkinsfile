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
                              def branchname = fields[1]
				 def imagetag =fields[2]				
// 				 msList.add("${branchname}")
// 				 msList.add("${imagetag}")
				msMap.put("${jobname}","${branchname}")
				msMap1.put("${jobname}","${imagetag}")
				
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
// 			    (msMap.keySet() as List).collate(3).each{
//     			 	  Finalmap = msMap.subMap(it)
//     			  	 println Finalmap
// 				}
			    size =msMap.size()
			    initiatebuild(msMap,size)	    
				
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
	  




def initiatebuild(msMap,size) {
	def parallelStage = [:]
	println size	
	 msMap.each{k,v->
		  parallelStage[k,v] = {			  
			  stage("${k}"){
				  script {
					 for(i=0;i<=size;i++){
						int period =i*30
					def jobresult = build job: "${k}", parameters: [string(name: 'BRANCH', value: "${v}")], wait: true, propagate: false, quietPeriod: period
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
	 }
	 
	 
	parallel parallelStage
	 
}
						 
					
					   
					 
						
   
		    		
		 
	    

		 
