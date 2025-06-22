# Generate a random 5-digit suffix
$randomSuffix = Get-Random -Minimum 100 -Maximum 999

# Create a unique RG name
$rg = "keyvault-$randomSuffix"
$location = "EastUS"
$kvName = "kv-terraform-secrets-$randomSuffix"

# Create the RG
New-AzResourceGroup -Name $rg -Location $location

# Create the Key Vault
New-AzKeyVault -Name $kvName -ResourceGroupName $rg -Location $location

# Output
Write-Host "Resource Group: $rg"
Write-Host "Key Vault: $kvName"
