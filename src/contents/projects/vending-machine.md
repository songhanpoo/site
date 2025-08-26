---
title: AWS Vending Machine
description: Designed and implemented a secure, scalable AWS Landing Zone for Techcombank, enabling automated account provisioning, centralized governance, and seamless CI/CD integration. Leveraged Terraform, Ansible, and AWS native services to drastically reduce provisioning time, improve compliance, and streamline cloud adoption for enterprise-scale workloads.
poster: /projects/bigfriend.webp
techstack:
  - Terraform
  - Ansible
  - AWS
  - Jenkins
---

[Preview](https://bigfriend.fr/)

At Techcombank, I engineered and delivered an **AWS Landing Zone (Account Vending Machine)** that automated the creation of compliant AWS accounts, centralized logging/monitoring, and network setup. This project reduced provisioning time from **2 weeks to just 2 hours**, ensuring security guardrails and consistency across all environments.

I also integrated the solution into CI/CD pipelines, cutting deployment time by **60%** and enabling faster, safer cloud adoption across multiple teams.

Key contributions included:

- Automated account provisioning with **Terraform** and **AWS Organizations**
- Secure baseline with **IAM guardrails, VPC setup, and centralized CloudWatch/CloudTrail**
- CI/CD pipelines with **Jenkins + AWS CodePipeline**
- Orchestration and environment spin-up with **EKS**
- Real-time notifications and monitoring via **Microsoft Teams** and **AWS CloudWatch**

[Source Code](#) – proprietary, not public.

## Stack

- [Terraform](https://www.terraform.io/) – Infrastructure as Code for provisioning AWS services
- [Ansible](https://www.ansible.com/) – Configuration management and automation
- [AWS](https://aws.amazon.com/) – Cloud platform (Organizations, IAM, EKS, RDS, CloudWatch, Lambda, ELB, S3)
- [Jenkins](https://www.jenkins.io/) – CI/CD automation for pipelines and infrastructure workflows
