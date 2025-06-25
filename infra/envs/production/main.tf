terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = ">= 4.0"
    }
    helm = {
      source  = "hashicorp/helm"
      version = ">= 2.0"
    }
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = ">= 2.0"
    }
  }

  backend "gcs" {
    bucket = "terraform-cris-backend"
    prefix = "terraform/production"
  }
}

provider "google" {
  project     = var.project_id
  region      = var.region
  zone        = var.zone
  credentials = var.google_credentials_json
}

data "google_client_config" "default" {}

# MÓDULO GKE
module "gke" {
  source     = "../../modules/gke"
  name       = "gke-production"
  project    = var.project_id
  region     = var.region
  network    = var.network
  subnetwork = var.subnetwork
}

# PROVIDER KUBERNETES (com alias "gke")
provider "kubernetes" {
  alias                  = "gke"
  host                   = module.gke.endpoint
  cluster_ca_certificate = base64decode(module.gke.cluster_ca_certificate)
  token                  = data.google_client_config.default.access_token
}

# PROVIDER HELM (usando alias e referenciando o provider Kubernetes acima)
provider "helm" {
  alias = "gke"

  kubernetes {
    host                   = module.gke.endpoint
    cluster_ca_certificate = base64decode(module.gke.cluster_ca_certificate)
    token                  = data.google_client_config.default.access_token
  }
}

# MÓDULO MONITORAMENTO
module "monitoring" {
  source = "../../modules/prometheus"

  providers = {
    helm       = helm.gke
    kubernetes = kubernetes.gke
  }

  depends_on = [module.gke]
}