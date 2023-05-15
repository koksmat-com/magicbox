$TAG = "v20230301a"
# docker build .  --platform linux/x86_64  --tag nexiintra365.azurecr.io/magic.api:$TAG
#az login --use-device-code
#az acr login --name nexiintra365
#az login 
# az acr login --name nexiintra365
# docker run -p 3500:3000 --env-file .\.env.docker  -d nexiintra365.azurecr.io/magic.api:$TAG 

docker push nexiintra365.azurecr.io/magic.api:$TAG