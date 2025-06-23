variable "name" {
  description = "Nome do cluster"
  type        = string
}

variable "project" {
  description = "ID do projeto GCP"
  type        = string
}

variable "region" {
  description = "Região do cluster"
  type        = string
}

variable "network" {
  description = "VPC usada pelo cluster"
  type        = string
}

variable "subnetwork" {
  description = "Sub-rede usada pelo cluster"
  type        = string
}
