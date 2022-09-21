variable "resource_group_name" {
  default = "BrewMyMac"
}

variable "resource_group_location" {
  default = "ukwest"
}

variable "cosmosdb_account_name" {
  default = "brewmymac"
}

variable "cosmosdb_max_throughput" {
  default = 1000
}

variable "client_secret" {
  description = "The Client Secret for the Service Principal"
  sensitive   = true
}

variable "app_id" {
  description = "The Application ID of the Service Principal to use for this deployment."
  sensitive   = true
}

variable "tenant_id" {
  description = "The Tenant ID of the Subscription to use for this deployment."
  sensitive   = true
}

variable "tag" {
  default = "brewmymac"
}
