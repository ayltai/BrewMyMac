terraform {
  backend "remote" {
    hostname     = "app.terraform.io"
    organization = "brewmymac"

    workspaces {
      prefix = "azure-"
    }
  }
}
