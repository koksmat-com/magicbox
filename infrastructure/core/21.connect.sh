  export POD_NAME=$(kubectl get pods --namespace koksmat -l "app.kubernetes.io/name=kafka-ui,app.kubernetes.io/instance=kafka-ui" -o jsonpath="{.items[0].metadata.name}")
  echo "Visit http://127.0.0.1:8080 to use your application"
  kubectl --namespace koksmat port-forward $POD_NAME 8081:8080