terraform {
  required_version = ">= 1.2.0"

  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = ">= 3.0.0"
    }

    archive = {
      source  = "hashicorp/archive"
      version = ">= 2.2.0"
    }

    null = {
      source  = "hashicorp/null"
      version = ">= 3.0.0"
    }
  }
}

provider "azurerm" {
  features {}
}
