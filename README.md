# 🌐 Projeto DevOps Multinuvem - Mensal

## 📌 Visão Geral

Este repositório entrega uma solução completa de DevOps com foco em ambientes **multinuvem**, provisionamento de infraestrutura com **Terraform**, automação com **GitHub Actions**, e deploy de aplicações com **Kubernetes (GKE)**.

O projeto contempla dois ambientes isolados:
- **Produção:** infraestrutura provisionada via GCP (Google Cloud Platform)
- **Homologação (Staging):** também provisionada em nuvem distinta

Ambos os ambientes fazem deploy de **duas aplicações** e estão monitorados com **Prometheus + Grafana**.

---

## 🎯 Objetivo

- Provisionar clusters Kubernetes em nuvens distintas com Terraform
- Automatizar o pipeline de CI/CD com GitHub Actions
- Deploy de backend (NestJS) e frontend com Docker/Kubernetes
- Monitoramento via Grafana com métricas de CPU, Memória e Status dos Pods

---

---

## 🚀 CI/CD - GitHub Actions

Cada aplicação possui dois pipelines:
- **Staging**
- **Produção**

Etapas automatizadas:

1. **Provisionamento da infraestrutura** com Terraform
2. **Configuração de cluster GKE**
3. **Instalação de Prometheus + Grafana**
4. **Build da aplicação backend e frontend**
5. **Push para Docker Hub**
6. **Deploy no Kubernetes com kubectl/Helm**
7. **Validação do deploy**

---

## 🧪 Como Usar

### 🔧 Pré-requisitos

- Conta no Google Cloud com permissões para criar clusters
- Docker e Terraform instalados localmente
- GitHub Actions configurado com Secrets

### 💻 Rodando localmente (backend)

```bash
cd back
cp .env.example .env
docker-compose up --build
```
🔐 Secrets esperados no GitHub

    GCP_PROJECT_ID

    GCP_SERVICE_ACCOUNT_KEY

    DOCKERHUB_USERNAME

    DOCKERHUB_TOKEN

    KUBE_CONFIG_PRODUCTION

    KUBE_CONFIG_STAGING

📊 Monitoramento

Prometheus e Grafana estão configurados automaticamente via pipeline. As principais métricas expostas no dashboard são:

    Uso de CPU por pod

    Uso de Memória por pod

    Status dos Pods por namespace

✅ Status

Backend Dockerizado

Frontend configurado

Pipelines de CI/CD prontas

Terraform modularizado

Clusters provisionados

Monitoramento ativo
