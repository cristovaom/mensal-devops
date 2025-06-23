resource "google_container_cluster" "primary" {
  name     = var.name
  location = var.region

  remove_default_node_pool = true
  initial_node_count       = 1

  network    = var.network
  subnetwork = var.subnetwork

  workload_identity_config {
    workload_pool = "${var.project}.svc.id.goog"
  }

  addons_config {
    http_load_balancing {
      disabled = false
    }
  }
}
