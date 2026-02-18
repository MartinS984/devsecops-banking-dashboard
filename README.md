# DevSecOps Banking Dashboard 🏦 🔒

A high-security, compliance-ready banking infrastructure demo. This project follows the **Shift Left** security philosophy, ensuring that every layer—from the code to the cloud—is scanned and hardened before deployment.

## 🏗 Architecture Overview
- **Frontend:** Vue.js (Terminated at Nginx Ingress with TLS/SSL)
- **Backend:** Node.js + Express (Distroless Secure Runtime)
- **Database:** PostgreSQL (Encrypted at Rest with K8s Secrets)
- **Security Logic:** Zero Trust (Default-Deny) Network Policies

## 🛡 Security Gates (Phase 1 Complete)
- [x] **Zero Trust Networking:** Kubernetes Network Policies block all lateral movement by default.
- [x] **Hardened Containers:** Multi-stage builds using Google's Distroless images (no shell, non-root user).
- [x] **SCA Scanning:** Integrated Trivy for dependency and filesystem vulnerability auditing.
- [x] **Secret Management:** Base64 encoded secrets established (Transitioning to AWS KMS for Phase 3).

## 🚀 Local Setup (WSL2 / Minikube)
1. **Initialize Cluster:** `minikube start --addons=ingress`
2. **Apply Security Policies:** `kubectl apply -f k8s/policies/`
3. **Deploy App:** `kubectl apply -f k8s/base/`

---
*Maintained by [MartinS984](https://github.com/MartinS984)*
