helm install magicbox-rabbitmq \
    --namespace magicbox \
  --set auth.username=admin,auth.password=secretpassword,auth.erlangCookie=secretcookie \
    oci://registry-1.docker.io/bitnamicharts/rabbitmq