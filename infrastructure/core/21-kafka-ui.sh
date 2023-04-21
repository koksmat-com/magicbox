helm repo add kafka-ui https://provectus.github.io/kafka-ui
helm install kafka-ui --namespace koksmat kafka-ui/kafka-ui --version 0.6.2