---
title: 'gear.ts'
description: 'Explore my hardware and software setup. From a powerful computer with an i5-10400F, 16GB of RAM, RTX 3060, and more, to a Macbook Air M2 for work on the go. My favorite tools include NeoVIM, Tmux, iTerm, and Oh my zsh. I hosts my website and projects on Vercel. Discover my tech world!'
---

```ts
const hardware = {
	computers: [
		{
			name: 'Macbook Air M2',
			desc: 'My portable command center – light, sleek, and powerful enough to spin up clusters while sipping coffee anywhere.',
			tags: ['Laptop']
		},
		{
			name: 'Logitech MX Keys Full',
			desc: 'A smooth, full-size keyboard that makes YAML configs feel like poetry. Stylish, minimal, and rock-solid.',
			tags: ['Keyboard']
		},
		{
			name: 'Keyboard Lucky65',
			desc: 'My trusty 65% keyboard – compact, clicky, and perfect for when I don’t need a numpad to deploy containers.',
			tags: ['Keyboard']
		},
		{
			name: 'Magic Mouse',
			desc: 'The mouse I use for all things DevOps… except fragging enemies. Let’s just say it wasn’t built for FPS. 😅',
			tags: ['Mouse']
		}
	],
	monitors: [
		{
			name: 'LG 27UP850N-W',
			desc: 'My 4K productivity window – perfect for dashboards, logs, and squeezing in a Netflix episode between builds.',
			tags: ['Monitor']
		}
	],
	audio: [
		{
			name: 'AirPods Pro',
			desc: 'Wireless, comfy, and crystal clear. Great for standups, Spotify, and late-night debugging without waking the neighbors.',
			tags: ['Earbuds']
		},
		{
			name: 'Razer Opus',
			desc: 'Noise-canceling lifesaver – blocks out chaos so I can focus on Terraform plans and CI/CD pipelines.',
			tags: ['Headphone']
		}
	],
	workstations: [
		{
			name: 'Mainboard Huananzhi X99 Dual T8D',
			desc: 'The backbone of my homelab – dual CPU slots, plenty of lanes, and built like a tank for 24/7 uptime.',
			tags: ['Server']
		},
		{
			name: 'CPU Intel Xeon E5-2680v4 (x2) - 28 core 56 threads',
			desc: 'Two Xeons working overtime – 56 threads of raw compute power, perfect for containers, VMs, and the occasional overkill code compile.',
			tags: ['Server']
		},
		{
			name: 'RAM Samsung 16GB DDR4 (x4) - 64GB',
			desc: '64GB of memory goodness – because running Kubernetes, databases, and half the internet locally needs more than just a little RAM.',
			tags: ['Server']
		},
		{
			name: 'PSU 650W Cooler Master',
			desc: 'Reliable power delivery – keeping the beast alive without tripping the circuit breaker. Efficiency meets stability.',
			tags: ['Server']
		},
		{
			name: 'VGA GT730 2GB - HDMI support',
			desc: 'A humble GPU – not for gaming, but perfect for getting a display up and running while the CPUs do the heavy lifting.',
			tags: ['Server']
		},
		{
			name: 'VGA AMD Instinct MI50 - 16GB',
			desc: 'An enterprise-grade compute accelerator – packing 16GB of HBM2 memory, this beast handles local LLMs, AI workloads, and intensive data processing tasks.',
			tags: ['Server']
		}
	]
};

const software = [
	{
		name: 'NeoVim',
		desc: 'My daily driver IDE – lightweight, extensible, and armed with plugins that turn DevOps chaos into order.',
		tags: ['Integrated Development Environments']
	},
	{
		name: 'Ghostty',
		desc: 'My terminal of choice – split panes, hotkeys, and blazing-fast performance that regular terminal tabs could only dream of.',
		tags: ['Terminal']
	},
	{
		name: 'DBeaver',
		desc: 'SQL made simple – a universal database client that saves me from fat-fingering queries in prod.',
		tags: ['Database']
	},
	{
		name: 'OrbStack / Colima',
		desc: 'My local container playground – ultra-fast, lightweight alternative to Docker Desktop, perfect for test environments.',
		tags: ['Container']
	},
	{
		name: 'Oh My Zsh',
		desc: 'My shell supercharged with powerlevel10k – because plain shells are for staging, not prod.',
		tags: ['Terminal']
	}
];

const hosting = [
	{
		name: 'Vercel',
		desc: 'Deploys so fast it feels like CI/CD wizardry. Git push, and the site is live before Slack notifies me.',
		tags: ['Hosting']
	},
	{
		name: 'Kubernetes On-Premise',
		desc: 'My personal cluster dojo – where I break things safely before breaking them in the cloud.',
		tags: ['Hosting']
	},
	{
		name: 'Amazon Web Services',
		desc: 'The Swiss Army knife of cloud – EC2s, Lambdas, S3 buckets, and enough services to make billing a puzzle game.',
		tags: ['Hosting']
	},
	{
		name: 'Cloudflare Workers',
		desc: 'Serverless on the edge – lightweight, blazing fast, and perfect for when latency matters.',
		tags: ['Hosting']
	}
];
