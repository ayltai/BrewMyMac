resource "azurerm_storage_account" "this" {
  resource_group_name      = azurerm_resource_group.this.name
  location                 = azurerm_resource_group.this.location
  name                     = var.tag
  account_tier             = "Standard"
  account_replication_type = "LRS"
  min_tls_version          = "TLS1_2"

  tags = {
    Name = var.tag
  }
}

resource "azurerm_storage_container" "this" {
  storage_account_name  = azurerm_storage_account.this.name
  name                  = var.tag
  container_access_type = "private"
}

resource "azurerm_storage_blob" "this" {
  storage_account_name   = azurerm_storage_container.this.storage_account_name
  storage_container_name = azurerm_storage_container.this.name
  name                   = "${filesha256(data.archive_file.this.output_path)}.zip"
  source                 = data.archive_file.this.output_path
  type                   = "Block"
}

data "azurerm_storage_account_blob_container_sas" "this" {
  connection_string = azurerm_storage_account.this.primary_connection_string
  container_name    = azurerm_storage_blob.this.storage_container_name
  https_only        = true
  start             = "2022-01-01T00:00:00Z"
  expiry            = "2023-12-31T23:59:59Z"

  permissions {
    read   = true
    write  = false
    add    = false
    create = false
    delete = false
    list   = false
  }
}
