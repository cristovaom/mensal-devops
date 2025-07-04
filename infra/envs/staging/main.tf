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
    bucket = "SEU_BUCKET_BACKEND" # substitua pelo bucket GCS criado manualmente
    prefix = "terraform/staging"
  }
}

provider "google" {
  project = var.project_id
  region  = var.region
  zone    = var.zone
  credentials = var.google_credentials_json
}

provider "kubernetes" {
  host                   = google_container_cluster.primary.endpoint
  cluster_ca_certificate = base64decode(google_container_cluster.primary.master_auth[0].cluster_ca_certificate)
  token                  = data.google_client_config.default.access_token
}

provider "helm" {
  kubernetes {
    host                   = google_container_cluster.primary.endpoint
    cluster_ca_certificate = base64decode(google_container_cluster.primary.master_auth[0].cluster_ca_certificate)
    token                  = data.google_client_config.default.access_token
  }
}

data "google_client_config" "default" {}

module "gke" {
  source     = "../../modules/gke"
  name       = "gke-staging"
  project    = var.project_id
  region     = var.region
  network    = var.network
  subnetwork = var.subnetwork
}

module "monitoring" {
  source = "../../modules/prometheus"
}
