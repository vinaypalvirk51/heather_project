output "subnet_name" {
  value = azurerm_subnet.my_subnet.name
}

output "subnet_id" {
  description = "The ID of the subnet"
  value       = azurerm_subnet.my_subnet.id
}


