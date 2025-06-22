$sp = az ad sp create-for-rbac --name "terrafom" --role Contributor --scopes /subscriptions/06b03653-8076-4a11-bd55-f06b60f6decc --output json | ConvertFrom-Json

Write-Host "Client ID: $($sp.appId)"
Write-Host "Client Secret: $($sp.password)"
Write-Host "Tenant ID: $($sp.tenant)"






