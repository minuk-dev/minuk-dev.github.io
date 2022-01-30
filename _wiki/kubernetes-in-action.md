---
layout  : wiki
title   : Kubernetes in action
summary : 
date    : 2022-01-31 04:38:12 +0900
lastmod : 2022-01-31 04:38:27 +0900
tags    : 
draft   : false
parent  : 
---

# Part 1. Overview
## Chapter 1. Introducing Kubernetes
### Changes of software development and deployments.
- Years ago, most software applications were big monoliths
	- Slow release cycles
	- Relatively infrequent updates
- Today, these applications are broken down into smaller. : microservices
	- Microservies are decoupled from each other -> Easily developed, deployed, updated, and scaled individually
- Kubernetes helps the ops team by automaticaly monitoring and rescheduling those apps in the event of a hardware failure.

### 1.1. Understanding the need for a system like Kubernetes
#### 1.1.1. Moving from monolithic apps to microservices
- Microservies communicate through synchronous protocols such as HTTP, over which they usually expose RESTful (REpresentional State Transfer) APIs, or through asynchronous protocols such as AMQP (Advanced Message Queueing Protocol)
- Scaling microservices
- Deploying microservices
- Understanding the divergence of environment requirements

#### 1.1.2. Providing a consistent environment to applications
#### 1.1.3. Moving to continuous delivery: DevOps and NoOps
- Understanding the benefits
- Letting developers and sysadmins do what they do best

### 1.2. Introducing container technologies
#### 1.2.1. Understanding what contianers are
- Isolating components with Linux container technologies
- Comparing virtual machines to containers
- Introducing the mechanisms that make container isolation possible
- Isolating processes with Linux Namespaces
- Limiting resources available to a process

#### 1.2.2. Intoducing the Docker container platform
- Understanding Docker concepts
	- Images
	- Regieries
	- Containers
- Building, distributing, and running a Docker image
- Comparing virtual machines and Docker containers
- Understanding image layers
- Understanding the portability limitations of container images

#### 1.2.3. Introducing rkt - an alternative to Docker
- rkt (pronounced "rock-it")
- benefits:
	- security
	- composability
	- conforming to open standards

### 1.3. Introducing Kubernetes
#### 1.3.1. Understanding its origins
- Through the years, Google developed an internal system called Borg

#### 1.3.2. Looking at Kubernetes from the top of a mountain
- Understanding the core of what Kubernetes does
- Helping deveopers focus on the core app features
- Helping ops teams achieve better reousrce utilization

#### 1.3.3. Understanding the architecture of a Kubernetes cluster
- The components that make up a Kubernetes cluster
	- The master node, which hosts the Kubernetes Control Plane that controls and manages the whole Kubernetes system
	- Worker nodes that run the actual applications you deploy

- The Control Plane
   - The Kubernetes API Server, which you and the other Control Plan components communicate with
   - The Schduler, which schedules your apps (assigns a worker node to each deployable component of your application)
   - The Controller Manager, which performs cluster-level functions, such as replicating components, keeping track of worker nodes, handlign node failures, and so on
   - etcd, a reliable distributed data store that persistently stores the cluster configuration.

- The nodes
	- Docker, rkt, or another container runtime, which runs your containers
	- The Kubelet, which talks to the API server and manages containers on its node.
	- The Kubernets Service Proxy (kube-proxy), which load-balances network traffic between application components

#### 1.3.4. Running an application in Kubernetes
- Understanding how the description results in a running container
- Keeping the containers running
- Scaling the number of copies
- Hitting a moving target

#### 1.3.5. Understanding the benefits of using Kubernetes
- Simplifying application deployment
- Achieving better unilization of hardware
- Health checking and self-healing
- Automatic scaling
- Simplifying application development

### 1.4. Summary
- Monolithic apps are easier to deploy, but harder to maintain over time and sometimes impossible to scale.
- Microservices-based application architectures allow easier development of each component, but are harder to deploy and configure to work as a single system.
- Linux containers provide much the same benefits as vitual machines, but are far more lightweight and allow for much better hardware utilization.
- Docker improved on existing Linux container technologies by allowing easier and faster provisioning of containerized apps together with their OS environments.
- Kubernetes exposes the whole datacenter as single computational reousrce for running applications.
- Developers can deploy apps through Kubernetes without assistance from sysadmins.
- Sysadmins can sleep better by having Kubernetes deal with failed nodes automatically.

## Chapter 2. First steps with Docker and Kubernetes
### 2.1. Creating, running, and sharing a container image
- docker run

```bash
docker run <image>:<tag>
```

- dockerfile
```dockerfile
FROM node:7
ADD app.js /app.js
ENTRYPOINT ["node", "app.js"]
```

- listing runnign containers
```bash
docker ps
```

- exploring the inside of a running container
```bash
docker exec -it <container-name> <command>
```
  - `-i`, which makes sure STDIN is kept open. You need this for entering commands into the shell.
  - `-t`, which allocates a pseudo terminal (TTY).
 
- Getting additional information about a container
```bash
docker inspect <container-name>
```

- The container's filesystem is also isolated
	- Tip: Entering a running container like this is useful when debugging an app running in acontainer. When something's wrong, the first thing you'll want to explore is the actual state of the system your application sees. Keep in mind that an application will not only see its own unique filesystem, but also processes, users, hostname, and network interfaces.
	
#### 2.1.7. Stopping and removing a container

```bash
docker rm <conatinaer-name>
```

#### 2.1.8. Pushing the image to an image registry
- Tagging an image under an additional tag
```bash
docker tag <image> <docker-hub-id>/<name>
```

```bash
docker images | head
```

- Pushing the image to Docker Hub
```bash
docker push <docker-hub-id>/<name>
```

- Running the image on a different machine

### 2.2. Setting up a Kubernetes cluster
#### 2.2.1. Running a local single-node Kubernetes cluster with Minikube
### 2.3. Running your first app on Kubernetes

