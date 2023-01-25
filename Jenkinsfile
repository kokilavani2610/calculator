def msMap =[:]
pipeline {
    agent any
   parameters {      
        string(name: 'REPO_LIST', defaultValue: 'scripts/job-list.csv', description: 'Name of CSV file containing the list of images', trim: true)
    }
    stages {
        stage('Parse the CSV') {
        steps {
            script {
		    def param
		    def delimiter = ','
		    println params.REPO_LIST
                    if (fileExists(params.REPO_LIST)) {
                        echo 'File found'
                         readFile(params.REPO_LIST).split('\n').eachWithIndex { line, index, count ->
		           if(index){
                            def fields = line.split(delimiter)
                            def jobname = fields[0]
			   if (fields[1] != null) {
                               param = fields[1]			    
			    }	 				
			    msMap.put("${jobname}","${param}")			   
			    }
			 }
			  	 initiatebuild(msMap)
			  
                    }else {
                        echo ' File Not found. Failing.'
                    }

                                }

                        }
                }

        }

}
def initiatebuild(msMap) {	
	def jobresult
	def branch	
	def buildresult
	msMap.each{k,v->		
			stage("${k}"){
				script {
					if ("${k}"== 'Multibranch'){
						jobresult = build(job: '"${k}"/"${v}"')
					} else {
						jobresult = build job: "${k}", parameters: [string(name: 'BRANCH', value: "${branch}")], wait: true
					}
					buildresult =  "${jobresult.getResult()}"
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
