module "resourcegroup" {
  source = "./modules/resourcegroup"
  resource_group_name = var.resource_group_name
  resource_group_location = var.resource_group_location
}

# module "virtualnetwork" {
#   source = "./modules/virtualnetwork"
#   v_location = module.resourcegroup.resource_group_location.value
#   resourcegroup_name = module.resourcegroup.resource_group_name.value
#   address_ip = var.address_ip
#   v_name = var.v_name
# }


module "virtualnetwork" {
  source              = "./modules/virtualnetwork"
  v_name              = var.vnet_name
  v_location          = module.resourcegroup.resource_group_location
  resourcegroup_name  = module.resourcegroup.resource_group_name
  address_ip          = var.vnet_address_space
}


module "subnet" {
  source                  = "./modules/subnet"
  subnet_name             = var.sub_name
  rgname                  = module.resourcegroup.resource_group_name
  vnetname                = module.virtualnetwork.vnet_name
  subnet_address_prefixes = var.subnet_address_prefixes
}

module "keyvault" {
  source                    = "./modules/azurekeyvault"
  kv_name                   = var.kv_name
  location                  = module.resourcegroup.resource_group_location
  rg_name                   = module.resourcegroup.resource_group_name
  tenant_id                 = var.tenant_id
  sku_name                  = "standard"
  purge_protection_enabled = var.purge_protection_enabled
  soft_delete_retention_days = var.soft_delete_retention_days
}

module "keyvault_rbac" {
  source               = "./modules/rbac"
  key_vault_id         = module.keyvault.key_vault_id
  role_name            = var.role_name
  principal_object_id  = var.principal_object_id
}
