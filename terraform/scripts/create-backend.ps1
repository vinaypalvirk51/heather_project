# Login to Azure
az login

# Set variables
$resourceGroupName = "backrg"
$location = "eastus"
$storageAccountName = "backsa" + (Get-Random -Maximum 9999)
$containerName = "backstatecontainer"
$tfstateKey = "terraformstate.tfstate"

# Create Resource Group
az group create --name $resourceGroupName --location $location

# Create Storage Account (must be globally unique)
az storage account create `
  --name $storageAccountName `
  --resource-group $resourceGroupName `
  --location $location `
  --sku Standard_LRS `
  --encryption-services blob

# Get Storage Account Key
$accountKey = az storage account keys list `
  --resource-group $resourceGroupName `
  --account-name $storageAccountName `
  --query "[0].value" `
  --output tsv

# Create Blob Container
az storage container create `
  --name $containerName `
  --account-name $storageAccountName `
  --account-key $accountKey

# (Optional) Upload an empty Terraform state file placeholder
$emptyFilePath = "$env:TEMP\terraformstate.tfstate"
New-Item -ItemType File -Path $emptyFilePath -Force | Out-Null

az storage blob upload `
  --account-name $storageAccountName `
  --account-key $accountKey `
  --container-name $containerName `
  --name $tfstateKey `
  --file $emptyFilePath `
  --overwrite
