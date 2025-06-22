variable "project_id" {
  description = "ID do projeto GCP"
  type        = string
}

variable "region" {
  description = "Região dos recursos"
  type        = string
  default     = "us-central1"
}

variable "zone" {
  description = "Zona padrão"
  type        = string
  default     = "us-central1-a"
}

variable "network" {
  description = "VPC"
  type        = string
  default     = "default"
}

variable "subnetwork" {
  description = "Sub-rede"
  type        = string
  default     = "default"
}
