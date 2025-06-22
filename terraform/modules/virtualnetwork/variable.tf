variable "v_name" {
  description = "Name of the virtual network"
  type        = string
}

variable "v_location" {
  description = "Azure region for the virtual network"
  type        = string
}

variable "resourcegroup_name" {
  description = "Resource group name where the virtual network will be created"
  type        = string
}

variable "address_ip" {
  description = "The address space for the virtual network"
  type        = list(string)
}
