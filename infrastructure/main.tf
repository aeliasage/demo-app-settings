terraform {
  backend "azurerm" {}
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = ">= 2.46.1"
    }
  }
}

provider "azurerm" {
  features {}
}

resource "azurerm_resource_group" "rg" {
  name     = var.resource_group
  location = var.location

  tags = merge({
    Workspace = terraform.workspace,
  }, var.tags)
}

resource "azurerm_container_registry" "acr" {
  name                = "democr"
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location
  sku                 = "Standard"
  admin_enabled       = true
}

resource "azurerm_app_service_plan" "sp" {
  name                = var.app_sp_name
  location            = var.location
  resource_group_name = azurerm_resource_group.rg.name
  kind                = "Linux"
  reserved            = true

  sku {
    tier = var.sku_tier
    size = var.sku_size
  }
}

resource "azurerm_app_service" "appsvc" {
  name                = var.app_service_name
  resource_group_name = azurerm_resource_group.rg.name
  app_service_plan_id = azurerm_app_service_plan.sp.id
  location            = var.location

  site_config {
    linux_fx_version = "DOCKER|${var.registry_login_server}/${var.docker_image}:${var.docker_image_tag}"
    cors {
      allowed_origins = var.cors_origins
    }
    health_check_path = "/health"
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
    "DOCKER_REGISTRY_SERVER_URL"                    = "https://${azurerm_container_registry.acr.login_server}"
    "DOCKER_REGISTRY_SERVER_USERNAME"               = azurerm_container_registry.acr.admin_username
    "DOCKER_REGISTRY_SERVER_PASSWORD"               = azurerm_container_registry.acr.admin_password
    "CONTACTS_HOST"                                 = var.contacts_host
    "GENERAL_LEDGER_SETUP_HOST"                     = var.general_ledger_setup_host
    "WEBSITES_ENABLE_APP_SERVICE_STORAGE"           = "false"
    "WEBSITE_WEBDEPLOY_USE_SCM"                     = "true"
    "WEBSITE_HEALTHCHECK_MAXPINGFAILURES"           = "10"
    "LOGGING__LOGLEVEL__DEFAULT"                    = "Information"
    "LOGGING__LOGLEVEL__MICROSOFT.HOSTING.LIFETIME" = "Information"
  }

  identity {
    type = "SystemAssigned"
  }
}
