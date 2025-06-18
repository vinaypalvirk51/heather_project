output "resource_group_name" {
  description = "The name of the created Azure Resource Group."
  value       = azurerm_resource_group.my_rg.name
}

output "resource_group_location" {
  description = "The Azure region where the resource group is deployed."
  value       = azurerm_resource_group.my_rg.location
}
