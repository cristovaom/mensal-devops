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

provider "kubernetes" {
  host                   = google_container_cluster.primary.endpoint
  cluster_ca_certificate = base64decode(google_container_cluster.primary.master_auth[0].cluster_ca_certificate)
  token                  = data.google_client_config.default.access_token
}

provider "helm" {}


data "google_client_config" "default" {}

module "gke" {
  source     = "../../modules/gke"
  name       = "gke-production"
  project    = var.project_id
  region     = var.region
  network    = var.network
  subnetwork = var.subnetwork
}

module "monitoring" {
  source = "../../modules/prometheus"
}
