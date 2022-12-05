def repoList = 'job-list.csv'
def buildParallelMap = [:]
pipeline {
    agent any
    parameters {
        string(name: 'NAMESPACE', defaultValue: 'sco', description: 'Namespace name', trim: true)
        string(name: 'Repo_LIST', defaultValue: 'job-list.csv', description: 'Name of CSV file containing the list of images', trim: true)
    }
    stages {
	    stage('ParallelJob') {
	    	parallel {
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
                            //initiatebuild(jobname,branchname)
			    //invokebuilds(repoList)

                             }

                    }else {
                        echo ' File Not found. Failing.'
                    }

                                }

                        }
                }
	    
	       	
		    stage("pmd-github"){
			    steps {
	     			script {	       			
					def jobresult = build job: "pmd-github", parameters: [string(name: 'BRANCH', value: 'main')], wait:false, propagate: false
					//sh 'sleep 150'		
					 def buildresult =  "${jobresult.getResult()}"
					echo "${buildresult}"
					if(${buildresult} != 'SUCCESS'){
						catchError(stageResult: 'FAILURE', buildResult: 'SUCCESS'){
						       error("Downstream job failing-job failed.")
					}
					}else{echo "No issues"}
				 }
			    }
		    }
		       stage("Pipeline 1"){
			       steps {
	     			script {	       			
					def jobresult = build job: "Pipeline 1", parameters: [string(name: 'BRANCH', value: 'pmd')], wait: false, propagate: false
					//sh 'sleep 150'		
					 def buildresult =  "${jobresult.getResult()}"
					echo "${buildresult}"
					if(${buildresult} != 'SUCCESS'){
						catchError(stageResult: 'FAILURE', buildResult: 'SUCCESS'){
						       error("Downstream job failing-job failed.")
					}
					}else{echo "No issues"}
				 }
			       }
		    }
	     
	    }
	    }
    }
}
    

def invokebuilds(List repoList) {   
    for (line in repoList ) {
        def fields = line.split(',')
        def jobname = fields[0]                    
        def branchname = fields[1]
      
            buildParallelMap.add(initiatebuild(jobname,branchname))
        
    }
    return buildParallelMap
}

def initiatebuild(String jobname,String branchname) {
    stages("Build")  {
	    parallel {
		    stage("${jobname}"){
	     			script {
	       			 if (NAMESPACE== sco) {
					def jobresult = build job: "${jobname}", parameters: [string(name: 'BRANCH', value: "${branchname}")], wait: true, propagate: false
					//sh 'sleep 150'		
					def buildresult =  "${jobresult.getResult()}"
					echo "${buildresult}"
					if(${buildresult} != 'SUCCESS'){
						catchError(stageResult: 'FAILURE', buildResult: 'SUCCESS'){
						       error("Downstream job failing-job failed.")
					}
					}else{echo "No issues"}
				 }
				}
		    }
	    }
    }
}
		 
	    

		 
