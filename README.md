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



## 🛠 Local Deployment & Security Validation

### 1. Initialize Zero Trust Environment
Spin up the secure local cluster in Minikube:
\`\`\`bash
minikube start --addons=ingress
kubectl apply -f k8s/base/namespace.yaml
kubectl apply -f k8s/policies/network-policy-deny-all.yaml
\`\`\`

### 2. Deploy the Hardened App
Deploy the 3-tier banking dashboard:
\`\`\`bash
kubectl apply -f k8s/base/backend.yaml
kubectl apply -f k8s/base/frontend.yaml
kubectl apply -f k8s/policies/allow-backend-to-db.yaml
\`\`\`

### 3. Verify Isolation
Test the 'Deny-All' policy. Only traffic explicitly whitelisted by a `NetworkPolicy` should pass through the cluster.

---
*Maintained by [MartinS984](https://github.com/MartinS984)*
