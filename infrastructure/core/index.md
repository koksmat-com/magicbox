# Core services

## Kafka

### Installation
20-kafka.sh contains the following:

```bash

helm repo add bitnami https://charts.bitnami.com/bitnami
helm install -n koksmat kafka  bitnami/kafka
```

Output:

```text
NAME: kafka
LAST DEPLOYED: Fri Apr 21 16:57:25 2023
NAMESPACE: koksmat
STATUS: deployed
REVISION: 1
TEST SUITE: None
NOTES:
CHART NAME: kafka
CHART VERSION: 21.4.6
APP VERSION: 3.4.0

** Please be patient while the chart is being deployed **

Kafka can be accessed by consumers via port 9092 on the following DNS name from within your cluster:

    kafka.koksmat.svc.cluster.local

Each Kafka broker can be accessed by producers via port 9092 on the following DNS name(s) from within your cluster:

    kafka-0.kafka-headless.koksmat.svc.cluster.local:9092

To create a pod that you can use as a Kafka client run the following commands:

    kubectl run kafka-client --restart='Never' --image docker.io/bitnami/kafka:3.4.0-debian-11-r15 --namespace koksmat --command -- sleep infinity
    kubectl exec --tty -i kafka-client --namespace koksmat -- bash

    PRODUCER:
        kafka-console-producer.sh \
            --broker-list kafka-0.kafka-headless.koksmat.svc.cluster.local:9092 \
            --topic test

    CONSUMER:
        kafka-console-consumer.sh \
            --bootstrap-server kafka.koksmat.svc.cluster.local:9092 \
            --topic test \
            --from-beginning

```

## Fluentbit

```bash
helm repo add fluent https://fluent.github.io/helm-charts
helm upgrade --namespace koksmat  --install fluent-bit fluent/fluent-bit
``` 

Result:

```text
"fluent" has been added to your repositories
Release "fluent-bit" does not exist. Installing it now.
NAME: fluent-bit
LAST DEPLOYED: Fri Apr 21 18:55:31 2023
NAMESPACE: koksmat
STATUS: deployed
REVISION: 1
NOTES:
Get Fluent Bit build information by running these commands:

export POD_NAME=$(kubectl get pods --namespace koksmat -l "app.kubernetes.io/name=fluent-bit,app.kubernetes.io/instance=fluent-bit" -o jsonpath="{.items[0].metadata.name}")
kubectl --namespace koksmat port-forward $POD_NAME 2020:2020
curl http://127.0.0.1:2020
```