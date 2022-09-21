resource "azurerm_service_plan" "this" {
  resource_group_name = azurerm_resource_group.this.name
  location            = azurerm_resource_group.this.location
  name                = var.tag
  os_type             = "Linux"
  sku_name            = "Y1"

  tags = {
    Name = var.tag
  }
}

resource "azurerm_linux_function_app" "this" {
  resource_group_name        = azurerm_resource_group.this.name
  location                   = azurerm_resource_group.this.location
  name                       = var.tag
  service_plan_id            = azurerm_service_plan.this.id
  storage_account_name       = azurerm_storage_account.this.name
  storage_account_access_key = azurerm_storage_account.this.primary_access_key
  https_only                 = true

  site_config {
    application_stack {
      node_version = "18"
    }

    cors {
      allowed_origins = [
        "https://brewmymac.sh",
      ]
    }

    http2_enabled = true
  }

  app_settings = {
    AzureWebJobsDisableHomepage  = "true"
    FUNCTIONS_WORKER_RUNTIME     = "node"
    WEBSITE_NODE_DEFAULT_VERSION = "~18"
    WEBSITE_RUN_FROM_PACKAGE     = "https://${azurerm_storage_account.this.name}.blob.core.windows.net/${azurerm_storage_container.this.name}/${azurerm_storage_blob.this.name}${data.azurerm_storage_account_blob_container_sas.this.sas}"
    CONNECTION_STRING            = azurerm_cosmosdb_account.this.connection_strings[0]
  }

  tags = {
    Name = var.tag
  }
}
