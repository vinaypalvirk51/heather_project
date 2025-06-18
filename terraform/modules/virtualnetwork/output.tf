output "vnet_name" {
  description = "The name of the virtual network"
  value       = azurerm_virtual_network.my_vnet.name
}

output "vnet_id" {
  description = "The ID of the virtual network"
  value       = azurerm_virtual_network.my_vnet.id
}

