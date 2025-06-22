resource_group_name     = "vinayRG"
resource_group_location = "East US"

vnet_name          = "shop_vnet"
vnet_address_space = ["10.0.0.0/16"]

sub_name                = "heather-subnet"
subnet_address_prefixes = ["10.0.1.0/24"]

purge_protection_enabled   = true
soft_delete_retention_days = 10
enable_rbac_authorization  = true

kv_name   = "keyvault13221"
tenant_id = "c6e6f015-52b2-47c3-b3d0-551d168fd33f"
# Replace this with the actual object ID (e.g., from `az ad sp list`)
principal_object_id = "fa37c7fd-f8b5-4238-9a57-33b050667c10"
role_name           = "Contributor"

acr_name      = "myheatheracr13"
acr_sku       = "Standard"
admin_enabled = true

tags = {
  environment = "development"
  team        = "devops"
}