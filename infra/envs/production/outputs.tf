output "cluster_name" {
  value = module.gke.cluster_name
}

output "kubernetes_endpoint" {
  value = module.gke.endpoint
}

output "dashboard_url" {
  description = "URL do Grafana (caso LoadBalancer esteja configurado)"
  value       = "http://<ENDERECO-IP-GRAFANA>:3000"
}
