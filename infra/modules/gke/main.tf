# modules/gke/main.tf
resource "google_container_cluster" "primary" {
  name     = var.name
  location = var.region

  remove_default_node_pool = true
  initial_node_count       = 1

  network    = var.network
  subnetwork = var.subnetwork

  workload_identity_config {
    identity_namespace = "${var.project}.svc.id.goog"
  }

  addons_config {
    http_load_balancing {
      disabled = false
    }
  }
}

resource "google_container_node_pool" "primary_nodes" {
  cluster = google_container_cluster.primary.name
  name    = "default-node-pool"
  location = var.region

  node_config {
    machine_type = "e2-medium"
    oauth_scopes = [
      "https://www.googleapis.com/auth/cloud-platform"
    ]
  }

  initial_node_count = 3
}
