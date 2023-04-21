helm repo add fluent https://fluent.github.io/helm-charts
helm upgrade --namespace koksmat  --install fluent-bit fluent/fluent-bit