resource "azurerm_role_assignment" "kv_access" {
  scope                = var.key_vault_id
  role_definition_name = var.role_name
  principal_id         = var.principal_object_id
}
