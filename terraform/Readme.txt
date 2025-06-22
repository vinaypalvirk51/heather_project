backend.tfvars	Used only during terraform init to set up the backend (state storage)

az ad sp create-for-rbac \
  --name github-acr-sp \
  --scopes $(az acr show --name myacrname --query id --output tsv) \
  --role acrpush \
  --sdk-auth
