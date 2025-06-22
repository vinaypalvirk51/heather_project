variable subnet_name {
    type = string
}
variable rgname {
    type = string
}
variable vnetname {
    type = string
}

variable "subnet_address_prefixes" {
  description = "The address prefixes of the subnet"
  type        = list(string)
}