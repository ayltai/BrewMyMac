locals {
  login_command  = "az login --service-principal -u ${var.app_id} -p ${var.client_secret} --tenant ${var.tenant_id}"
  deploy_command = "az functionapp deployment source config-zip -g ${azurerm_resource_group.this.name} -n ${azurerm_linux_function_app.this.name} --src ${data.archive_file.this.output_path}"
}
