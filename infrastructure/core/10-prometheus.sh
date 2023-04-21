helm repo add azure-marketplace https://marketplace.azurecr.io/helm/v1/repo
helm install prometheus \
 --namespace koksmat \
 azure-marketplace/kube-prometheus
