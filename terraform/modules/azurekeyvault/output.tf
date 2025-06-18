output "key_vault_id" {
  description = "Key Vault ID"
  value       = azurerm_key_vault.my_kv.id
}

output "key_vault_name" {
  description = "Key Vault Name"
  value       = azurerm_key_vault.my_kv.name
}

output "key_vault_uri" {
  description = "Key Vault URI"
  value       = azurerm_key_vault.my_kv.vault_uri
}
