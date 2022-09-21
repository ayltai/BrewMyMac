data "archive_file" "this" {
  type        = "zip"
  source_dir  = "${path.module}/../backend"
  output_path = "${path.module}/${var.tag}.zip"
}
