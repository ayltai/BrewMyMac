resource "azurerm_cosmosdb_account" "this" {
  resource_group_name = azurerm_resource_group.this.name
  location            = azurerm_resource_group.this.location
  name                = var.cosmosdb_account_name
  offer_type          = "Standard"
  kind                = "MongoDB"
  enable_free_tier    = true

  capabilities {
    name = "EnableMongo"
  }

  consistency_policy {
    consistency_level = "Session"
  }

  geo_location {
    failover_priority = 0
    location          = azurerm_resource_group.this.location
  }

  tags = {
    Name = var.tag
  }
}

resource "azurerm_cosmosdb_mongo_database" "this" {
  resource_group_name = azurerm_cosmosdb_account.this.resource_group_name
  account_name        = azurerm_cosmosdb_account.this.name
  name                = var.tag

  autoscale_settings {
    max_throughput = var.cosmosdb_max_throughput
  }
}

resource "azurerm_cosmosdb_mongo_collection" "this" {
  resource_group_name = azurerm_cosmosdb_mongo_database.this.resource_group_name
  account_name        = azurerm_cosmosdb_mongo_database.this.account_name
  database_name       = azurerm_cosmosdb_mongo_database.this.name
  name                = "sessions"

  index {
    unique = true

    keys = [
      "_id",
    ]
  }

  index {
    unique = true

    keys = [
      "sessionId",
    ]
  }

  index {
    keys = [
      "creationDate",
    ]
  }
}
