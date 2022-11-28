def repoList = 'job-list.csv'
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
                            initiatebuild(jobname,branchname)

                             }

                    }else {
                        echo ' File Not found. Failing.'
                    }

                                }

                        }
                }

        }

}
// def prepareBuildStages(List repoList) {
//     def buildParallelMap = [:]
//     for (line in repoList ) {
//         def fields = line.split(',')
//        def jobname = fields[0]
//                             def imagetag = fields[1]
//                             def branchname = fields[2]
      
//             buildParallelMap.put(name, initiatebuild(name,imagetag,branchname))
        
//     }
//     return buildParallelMap
// }

def initiatebuild(String jobname,String branchname) {
    stage("Build : ${jobname}")  {
        script {
	        //if(BUILD_TYPE == "deploy_only"){
			//def jobresult = build job: "${jobname}", parameters: [string(name: 'IMAGE_TAG', value: "${imagetag}")], wait: false
			//sh 'sleep 60'
	           //}
	   	if (NAMESPACE == "sco"){
			def jobresult = build job: "${jobname}", parameters: [string(name: 'BRANCH', value: "${branchname}")], wait: false, propagate: false
			sh 'sleep 60'
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
