// jenkins file for mcap

def APP_NAME = 'mcap'
def APP_VERSION = 'master'
def TAG_NAMES = ['dev', 'test', 'prod']
def TAG_NAMES_BACKUP = ['devbackup', 'testbackup', 'prodbackup']

def BUILD_CONFIG = APP_NAME 
def IMAGESTREAM_NAME = APP_NAME

node {

    stage('build') {
       echo "Building: " + BUILD_CONFIG
       openshiftBuild bldCfg: BUILD_CONFIG, showBuildLogs: 'true'
       // old tag
       // openshiftTag destStream: IMAGESTREAM_NAME, verbose: 'true', destTag: '$BUILD_ID', srcStream: IMAGESTREAM_NAME, srcTag: 'latest'
       // new tag
       IMAGE_HASH = sh (
          script: """oc get istag ${IMAGESTREAM_NAME}:latest -o template --template=\"{{.image.dockerImageReference}}\"|awk -F \":\" \'{print \$3}\'""",
 	     returnStdout: true).trim()
       echo ">> IMAGE_HASH: $IMAGE_HASH"
    }

    stage('deploy-' + TAG_NAMES[0]) {
       echo "Deploying to: " + TAG_NAMES[0]
       // old tag
       // echo "tag source " + IMAGESTREAM_NAME + " with tag " + '$BUILD_ID' + " to dest " + IMAGESTREAM_NAME
       // openshiftTag destStream: IMAGESTREAM_NAME, verbose: 'true', destTag: TAG_NAMES[0], srcStream: IMAGESTREAM_NAME, srcTag: '$BUILD_ID'
       // new tag (note: no need for backup in dev)
       echo "Deploy to " + TAG_NAMES[0] + " " + IMAGESTREAM_NAME + ":" + "${IMAGE_HASH}"
       openshiftTag destStream: IMAGESTREAM_NAME, verbose: 'true', destTag: TAG_NAMES[0], srcStream: IMAGESTREAM_NAME, srcTag: "${IMAGE_HASH}"
    }
}

