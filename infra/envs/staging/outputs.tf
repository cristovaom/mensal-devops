output "cluster_name" {
  value = module.gke.cluster_name
}

output "kubernetes_endpoint" {
  value = module.gke.endpoint
}

output "grafana_url" {
  description = "URL de acesso ao Grafana"
  value       = "http://<EXTERNAL-IP-GRAFANA>:3000"
}
