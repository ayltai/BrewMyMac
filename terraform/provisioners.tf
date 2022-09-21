resource "null_resource" "this" {
  provisioner "local-exec" {
    command = "${local.login_command} && ${local.deploy_command}"
  }

  triggers = {
    archive        = filemd5(data.archive_file.this.output_path)
    login_command  = local.login_command
    deploy_command = local.deploy_command
  }
}
