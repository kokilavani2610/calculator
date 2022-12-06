def repoList = 'job-list.csv'
def msMap =[:]
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
                            echo fields[0] + ': ' +  fields[1];
                             def jobname = fields[0]                           
                              def branchname = fields[1]
				 if(jobname== fields[0]){
				 	msMap.put(jobname,branchname)
				 }
				 //stash includes:'jobname', name:'myval'
				 //stash 'myval1'
				 
                            //initiatebuild(jobname,branchname)
			    //invokebuilds(repoList)

                             }
			
			    

                    }else {
                        echo ' File Not found. Failing.'
                    }

                                }

                        }
                }
	    
	    
    

    
	    
	       stage('Paralleljob'){
		       msMap.each{k,v->
	         parallel {
			 stage("${k}"){
			    steps {
	     			script {
					
					
						def jobresult = build job: "${k}", parameters: [string(name: 'BRANCH', value:"${v}")], wait:true, propagate: false
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
	    }
	    
	    
	    }
	    
    }
}




def initiatebuild(String jobname,String branchname) {
   
		    stage("${jobname}"){			    
	     			script {
	       			 if (NAMESPACE== "sco") {
					def jobresult = build job: "${jobname}", parameters: [string(name: 'BRANCH', value: "${branchname}")], wait: true, propagate: false
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
		 
	    

		 
