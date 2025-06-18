variable "key_vault_id" {
  description = "ID of the Key Vault"
  type        = string
}

variable "role_name" {
  description = "RBAC role name to assign"
  type        = string
}

variable "principal_object_id" {
  description = "Object ID of the principal (user, service principal, managed identity)"
  type        = string
}
