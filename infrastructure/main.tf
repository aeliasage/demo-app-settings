# Required Provider block to indicate version of TF's Azure provider.
terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "=2.46.0"
    }
  }
}

# Configure Azure provider
provider "azurerm" {
  features {}
}

# Create a resource group
resource "azurerm_resource_group" "demo" {
  name     = "rg-aelia-playground"
  location = "westus2"
}

# Create an app service plan
resource "azurerm_app_service_plan" "demo" {
  name                = "sp-demo-westus2"
  location            = azurerm_resource_group.demo.location
  resource_group_name = azurerm_resource_group.demo.name
  kind                = "Linux"
  reserved            = true

  sku {
    tier = "Basic"
    size = "B1"
  }
}

resource "azurerm_app_service" "demo" {
  name                = "app-demo-ui"
  location            = azurerm_resource_group.demo.location
  resource_group_name = azurerm_resource_group.demo.name
  app_service_plan_id = azurerm_app_service_plan.demo.id
  
  site_config {
    linux_fx_version    = "DOCKER|ghcr.io/aeliasage/demo:latest"
    use_32_bit_worker_process   = true
  }

  # Enable container logging
  logs {
    http_logs {
      file_system {
        retention_in_days = 7
        retention_in_mb   = 100
      }
    }
  }

  app_settings = {
    "CONTACTS_HOST"                                 = "https://app-talk-devtest.azurewebsites.net"
    "GENERAL_LEDGER_SETUP_HOST"                     = "https://app-setup-devtest.azurewebsites.net"
  }

  identity {
    type = "SystemAssigned"
  }
}
