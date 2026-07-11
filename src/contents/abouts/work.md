---
title: 'work.ts'
description: "I'm Hieu Nguyen, a DevOps Engineer with over 4 years of experience specializing in scaling cloud infrastructure and building developer-centric automation within the banking and finance sectors (NAB, Techcombank). Passionate about open-source, automation, and efficiency, I thrive on optimizing pipelines, orchestrating AWS EKS migrations, and creating secure, high-compliance GitOps workflows. When I'm not tuning Kubernetes or writing custom CLI tools, you’ll probably find me exploring new tech stacks, contributing to open source, or sipping coffee while hacking on side projects."
---

```ts
const PROFESSION = 'DevOps Engineer';
const LOCATION = 'Vietnam';

// Employers & Key Achievements
const employers = [
	{
		name: 'NAB - National Australia Bank',
		role: 'DevOps Engineer',
		type: 'Current',
		period: 'Jun 2022 - Present',
		contributions: [
			'Supported the Home Ownership lending platform by driving infrastructure resilience and compliance.',
			'Developed and implemented a GitOps-based "Happy Bot" to automate configuration changes across multiple repositories.',
			'Built vulnerability tracking automation integrated with Nexus IQ and Snyk, reducing manual effort by ~80%.',
			'Led the migration of microservices and micro-frontends to AWS EKS within a tight 2-month timeline.',
			'Automated patching processes across Jenkins agents, bastion hosts, and EKS nodes to improve security posture.',
			'Built internal TUI and CLI tools (Harness, Vault) to simplify deployments and enhance developer productivity.',
			'Developed a metadata collection platform published via GitHub Pages for operational visibility and governance.',
			'Integrated multiple services and infrastructure with Microsoft Teams for real-time incident notifications.'
		]
	},
	{
		name: 'Techcombank',
		role: 'Cloud Engineer',
		type: 'Previous',
		period: 'Aug 2021 - Jun 2022',
		contributions: [
			'Designed and implemented CI/CD automation pipelines, reducing deployment times by ~60%.',
			'Provisioned EKS clusters using Terraform, slashing environment setup time from 2 weeks to ~2 hours.',
			'Built account provisioning automation (Account Vending Machine) to streamline AWS Landing Zone setup.',
			'Developed Infrastructure-as-Code (IaC) aligned with strict banking security standards and compliance.',
			'Optimized AWS resource utilization via Cost Explorer, successfully cutting cloud costs by 15%.',
			'Collaborated with development teams to consolidate microservices into a unified Microsoft Teams notification platform.'
		]
	},
	{ 
		name: 'FPT Telecom Bigdata', 
		role: 'DevOps Engineer', 
		type: 'Previous' 
	},
	{ 
		name: 'Freelancer', 
		role: 'Developer (WordPress)', 
		type: 'Previous' 
	},
	{ 
		name: 'Starbucks VN', 
		role: 'IT Support', 
		type: 'Previous' 
	}
];

// Top Skills
const skills = {
	languages: ['Bash', 'Python', 'JavaScript/TypeScript', 'Groovy', 'Go'],
	frameworks: ['Express.js', 'React.js', 'Next.js', 'Node.js'],
	devops: [
		'CI/CD (Jenkins, GitLab CI, GitHub Actions, Harness)',
		'Infrastructure as Code (Terraform, CloudFormation, Ansible)',
		'Containerization (Docker, Kubernetes, AWS EKS, GitOps)',
		'Security & Compliance (Snyk, Nexus IQ, HashiCorp Vault)',
		'Monitoring (Prometheus, Grafana, CloudWatch)',
		'Logging (ELK, EFK)',
		'Proxy/Load Balancer (NGINX, HAProxy)',
		'Secrets & Config Management'
	],
	databases: ['PostgreSQL', 'MySQL', 'SQL'],
	cloud: ['AWS (EC2, EKS, RDS, Lambda, S3, ALB/NLB, Cost Explorer)', 'On-prem Kubernetes'],
	tools: ['Git', 'Packer', 'Rundeck', 'Kong API Gateway', 'TUI/CLI Development']
};

// Certifications
const certifications = [
	'AWS Certified DevOps Engineer – Professional',
	'AWS Certified Solutions Architect – Associate',
	'Python Certificate – HackerRank',
	'JavaScript Certificate – HackerRank',
	'Go Certificate – HackerRank',
	'SQL Certificate – HackerRank'
];

// Fun Facts & Domain Focus
const interests = [
	'Banking & Fintech Infrastructure',
	'Developer Experience (DX) & Tooling',
	'Open Source', 
	'Automation', 
	'Linux (RedHat, Ubuntu, Alpine)', 
	'Networking', 
	'Coffee ☕', 
	'Gaming', 
	'Exploring new stacks'
];
