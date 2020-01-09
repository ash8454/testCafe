def notifySlack(text, channel, attachments) {
    //your  slack integration url
    def slackURL = 'https://hooks.slack.com/services/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'
    //from the jenkins wiki, you can updload an avatar and
    //use that one
    def jenkinsIcon = 'https://wiki.jenkins-ci.org/download/attachments/327683/JENKINS?version=1&modificationDate=1302750804000'
    def payload = "{\"text\": \"${text}\", \"channel\": \"${channel}\", \"username\": \"jenkins\", \"icon_url\": \"${jenkinsIcon}\", \"attachments\": ${attachments}}"
    sh "curl -X POST --data-urlencode \'payload=${payload}\' ${slackURL}"
}

node('dockerslaves') {
  properties([disableConcurrentBuilds()])
  stage 'Preamble'
    sh 'printenv'
    print "ENV: ${env}"
    print "NODE_NAME: ${env.NODE_NAME}"
    print "BUILD_URL: ${env.BUILD_URL}"
    print "JOB_NAME: ${env.JOB_NAME}"
    print "BRANCH_NAME: ${env.BRANCH_NAME}"
    print "BUILD_NUMBER: ${env.BUILD_NUMBER}"
  stage 'Checkout'
    sh 'whoami'
    checkout scm
    sh 'git config http.sslverify false'
  stage 'Prepare containers'
    docker.image("node:8.11-stretch").pull()
  stage 'Build'
    sh "docker build -t automated-tests ."
  stage 'Test'
    sh "docker run automated-tests"
    notifySlack("AP2 UI Automation-Tests", "#ashok-test", """[{
            \"title\": \"${env.JOB_NAME} build ${env.BUILD_NUMBER}\",
            \"color\":\"good\",
            \"text\": \"Automation Sanity Tests Success. ${env.BUILD_URL}`"
          }]""")
}
