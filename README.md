# sbc-maximus-services
Service BC's Maximus services to support webchat, videochat and cobrowse services

OpenShift Notes:
Set Environment Variable
Administrator:
Workloads->Deployment Configs->Details


https://console.apps.silver.devops.gov.bc.ca/k8s/cluster/projects/
# Copy login command to use oc cli


oc project 3a0694-prod
oc get nsp,en
oc process -f quickstart.yaml NAMESPACE_PREFIX=3a0694 -p ENVIRONMENT=dev | oc apply -f -

# delete policy "all-things-external"
oc delete en all-things-external