helm repo add azure-marketplace https://marketplace.azurecr.io/helm/v1/repo

helm install mongodb \
  --namespace magicbox \
 azure-marketplace/mongodb