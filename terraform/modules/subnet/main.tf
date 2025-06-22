resource "azurerm_subnet" "my_subnet" {
  name                 = var.subnet_name
  resource_group_name  = var.rgname
  virtual_network_name = var.vnetname
  address_prefixes     = var.subnet_address_prefixes
}
