# Resource Group variables
variable "resource_group_name" {
  type        = string
  description = "Name of the resource group"
}

variable "resource_group_location" {
  type        = string
  description = "Location for the resource group"
}

# Virtual Network variables
variable "vnet_name" {
  type        = string
  description = "Name of the Virtual Network"
}

variable "vnet_address_space" {
  type        = list(string)
  description = "Address space for the Virtual Network"
}

variable "sub_name" {
  description = "The name of the subnet"
  type        = string
}

variable "subnet_address_prefixes" {
  description = "The address space(s) for the subnet"
  type        = list(string)
}

variable "purge_protection_enabled" {
  description = "Enable purge protection"
  type        = bool
  
}

variable "soft_delete_retention_days" {
  description = "Soft delete retention in days"
  type        = number
  
}

variable "enable_rbac_authorization" {
  type = bool
  
}

variable "kv_name" {
  type        = string
  description = "Name of the Key Vault"
}

variable "tenant_id" {
  type        = string
  description = "Tenant ID of the Azure AD"
}

variable "principal_object_id" {
  type        = string
  description = "Object ID of the user or app to give RBAC access"
}

variable "role_name" {
  type        = string
  description = "The name of the role to assign to the principal."
  default     = "Key Vault Secrets User"  # Optional default
}
