# resource "azurerm_network_security_group" "example" {
#   name                = "example-security-group"
#   location            = azurerm_resource_group.example.location
#   resource_group_name = azurerm_resource_group.example.name
# }

resource "azurerm_virtual_network" "my_vnet" {
  name                = var.v_name
  location            = var.v_location
  resource_group_name = var.resourcegroup_name
  address_space       = var.address_ip
  


  tags = {
    environment = "Production"
  }
}