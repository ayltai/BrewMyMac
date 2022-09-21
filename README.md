# BrewMyMac

[![GitHub workflow status](https://img.shields.io/github/workflow/status/ayltai/BrewMyMac/CI?style=flat)](https://github.com/ayltai/BrewMyMac/actions)
[![Coverage](https://img.shields.io/sonar/coverage/ayltai_BrewMyMac?server=https%3A%2F%2Fsonarcloud.io)](https://sonarcloud.io/dashboard?id=ayltai_BrewMyMac)
[![Quality gate](https://img.shields.io/sonar/quality_gate/ayltai_BrewMyMac?server=https%3A%2F%2Fsonarcloud.io)](https://sonarcloud.io/dashboard?id=ayltai_BrewMyMac)
[![Vulnerabilities](https://snyk.io/test/github/ayltai/BrewMyMac/badge.svg?targetFile=frontend/package.json)](https://snyk.io/test/github/ayltai/BrewMyMac?targetFile=frontend/package.json)

Possibly the coolest way to install apps and customize your Mac!

## Introduction

This [article](https://ayltai.medium.com/install-mac-apps-and-tweaks-with-a-single-command-6b1b90c466b5) explains the motivation behind this project.

## Getting started

Try it: [https://brewmymac.sh](https://brewmymac.sh)

## Supported package repositories

* [Homebrew](https://brew.sh): The missing package manager for macOS
* [Homebrew Cask](https://formulae.brew.sh/cask/): An extension to [Homebrew](https://brew.sh) that allows you to install macOS applications
* [App Store](https://www.apple.com/app-store/): A macOS app store platform maintained by Apple Inc

## Supported macOS tweaks

* [macOS tweaks](https://github.com/ayltai/ansible-macOS-tweaks): A collection of nearly 50 macOS customizations

## Frontend

The frontend is a React single-page application created using [Create React App](https://create-react-app.dev). The code is located under `frontend` directory.

### Running locally

You need [Node.js](https://nodejs.org) and [npm](https://www.npmjs.com) installed on your machine.

1. Install dependencies
   ```bash
   npm i --legacy-peer-deps
   ```
2. Change the homepage URL in `package.json` to `.`
3. This app uses [Sentry](https://sentry.io) to track errors and [Mixpanel](https://mixpanel.com) to track usage. You can [create a `.env` file](https://create-react-app.dev/docs/adding-custom-environment-variables/#adding-development-environment-variables-in-env) and adding your own keys by setting the `REACT_APP_MIXPANEL_TOKEN` and `REACT_APP_SENTRY_DSN` environment variables.
4. Start the development server
   ```bash
   npm start
   ```
5. Open [http://localhost:3000](http://localhost:3000) with your browser

### Building from source

You need [Node.js](https://nodejs.org) and [npm](https://www.npmjs.com) installed on your machine.

1. Install dependencies
   ```bash
   npm i --legacy-peer-deps
   ```
2. Build the app
   ```bash
   npm run build
   ```
3. The built app will be in the `build` folder

## Backend

The backend is a Node.js application targeted to run as [Azure Functions](https://azure.microsoft.com/en-us/services/functions/). The code is located under `backend` directory.

### Deploying your own instance

[Terraform](https://www.terraform.io) is used to deploy the backend to [Azure](https://azure.microsoft.com). The code is located under `terraform` directory.

1. Install [Terraform](https://www.terraform.io/downloads.html)
2. Install [Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli)
3. Build the backend
   ```bash
   cd backend
   npm run build
   cd ../terraform
   ``` 
4. Authenticate with Azure: There are different ways to authenticate with Azure. See [here](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/guides/service_principal_client_secret) for more details. Make sure the role running Terraform has the `Contributor` role on the subscription.
5. Run `terraform init` to initialize the Terraform working directory. You will probably need to change the `backend` configuration in `backends.tf` to use a different way to manage your Terraform state.
6. Run `terraform plan` to see what changes will be made to your infrastructure. You will probably need to change the `variables.tf` file to use a different resource group name, location, etc.
7. Run `terraform apply` to apply the changes. You will probably need to change the `variables.tf` file as explained above.
8. The backend will be deployed to Azure. You can now run the frontend locally or deploy it to Azure or GitHub Pages as well.
9. You can run `terraform destroy` to destroy the backend when you no longer need it.

## Architecture

![Architecture](assets/architecture.png "Architecture")

1. The frontend is a [React](https://reactjs.org) app hosted on [GitHub Pages](https://pages.github.com). This project does not involve any backend service implementation.
2. The frontend app fetches a list of available apps from [Homebrew](https://brew.sh) via its [Formulae API](https://formulae.brew.sh/api/formula.json).
3. The frontend app fetches a list of available apps from [Homebrew Cask](https://brew.sh) via its [Formulae API](https://formulae.brew.sh/api/cask.json).
4. The frontend app searches for apps in Apple App Store via a public [CORS proxy](https://github.com/LeandroBerlin/itunes-search).
5. The frontend app fetches a list of available macOS tweaks from a [GitHub repository](https://github.com/ayltai/ansible-macos-tweaks).
6. When the user is ready to install apps and apply tweaks, the frontend app generates a shell script and stores it in [Xano](https://www.xano.com) which is a no-code database. A link to download the shell script is generated and a single-line command is displayed to the user.
7. The user opens Terminal in macOS.
8. The user runs the single-line command that downloads the shell script from [Xano](https://www.xano.com).
9. The shell script downloads an [Ansible](https://www.ansible.com) playbook for macOS tweaks from GitHub.
10. The shell script installs apps using [Homebrew](https://brew.sh) and [mas-cli](https://github.com/mas-cli/mas), and applies macOS tweaks using [Ansible](https://www.ansible.com).

## License

BrewMyMac is open source software released under [MIT](LICENSE).
