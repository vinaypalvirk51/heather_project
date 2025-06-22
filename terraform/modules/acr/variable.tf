variable "acr_name" {
  description = "Name of the Azure Container Registry (must be globally unique)"
  type        = string
}

variable "resource_group_name" {
  description = "The name of the resource group"
  type        = string
}

variable "location" {
  description = "Azure location"
  type        = string
}

variable "sku" {
  description = "SKU of the ACR"
  type        = string
  default     = "Basic"
}

variable "admin_enabled" {
  description = "Enable admin access to ACR"
  type        = bool
  default     = false
}

variable "tags" {
  description = "Tags to apply to ACR"
  type        = map(string)
  default     = {}
}
