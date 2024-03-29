---
layout  : wiki
title   : Kubernetes in action
summary : 쿠버네티스 ebook 읽으면서 대충 정리
date    : 2022-01-31 04:38:12 +0900
lastmod : 2023-03-12 21:16:57 +0900
tags    : [k8s]
draft   : false
parent  : Book reviews
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
#### 2.3.1 Deploying your app
```bash
kubectl run kubia --image=<image-name> --port=<port>
```

- Listing pods
```bash
kubectl get pods
```

#### 2.3.2. Accessing your web application
```bash
kubectl expose rc <pod-name> --type=LoadBalancer --name <service-name>
```

- Listing service
```bash
kubectl get services
```

```bash
kubectl get svc
```

#### 2.3.3. The logical parts of your system
- Understanding how the ReplicationController, the Pod, and the Service fit together
- Understanding the pod and its container
- Understanding the role of the ReplicationController
- Understanding why you need a service

#### 2.3.4. Horizontally scaling the application
- Increasing the desired replica count
```bash
kubectl scale rc <pod-name> --replicas=<number>
```

- Seeing the results of the scale-out
```bash
kubectl get rc
```

#### 2.3.5. Examining what nodes your app is running on
#### 2.3.6. Introducing the Kubernetes dashboard
### 2.4. Summary

# Part 2. Core concepts
## Chapter 3. Pods: running containers in Kubernetes
### 3.1. Intorducing pods
#### 3.1.1. Understanding why we need pods
- Understanding why multiple containers are better than one container running multiple processes

#### 3.1.2. Understanding pods
- Understanding the partial ioslation between containers of the same pod
- Understanding how containers share the same IP and port space
- Introducing the flat inter-pod network

#### 3.1.3. Organization containers across pods properly
- Splitting multi-tier apps into multiple pods
- Splitting into multiple pods to enable individual scaling
- Understanding when to use multiple containers in a pod
- Deciding when to use multiple containers in a pod

### 3.2. Creating pods from YAML or JSON descriptors
```bash
kubectl get po <podname> -o yaml
```

1. Kubernetes API version used in this YAML descriptor
2. Type of Kubernetes object/resource
3. Pod metadata(name, labels, annotations, and so on)
4. Pod specification/contents(list of pod's containers, volumes, and so on)
5. Detailed status of the pod and its containers
- Inducing the main parts of a pod definition:
  - Metadata includes the name, namespace, labels, and other information about the pod.
  - Spec contains the actual description of the pod's contents, such as the pod's containers, volumes, and other data.
  - Status contains the current information about the runnign pod, such as what condition the pod is in, the description and status of each container, and the pod's internal IP and other basic info.

#### 3.2.2. Creating a  simple YAML descriptor for a pod
- Specifying container ports
- Using kubectl explain to discover possible API object fields
```bash
kubectl explain pods
```

#### 3.2.3. Using kubectl create to create the pod
#### 3.2.4. Viewing application logs

```bash
kubectl logs <container id>
```

- Retrieving a pod's log with kubectl logs
- Specifying the container name when getting logs of a multi-container pod
```bash
kubectl logs <container id> -c <container-name>
```

#### 3.2.5. Sending requests to the pod
- Forwarding a local network port to a port in the pod
```bash
kubectl port-forward <container-id> 8888:8080
```

- Connecting to the pod through the port forwarder

### 3.3. Organizing pods with labels
#### 3.3.1. Introducing labels
- Each pod is labeled with two labels:
  - app, which specifies which app, component, or microservice the pod belongs to.
  - rel, which shows whether the application running in the pod is a stable, beta, or a canary release

- Definition : A canary relase is when you deploy a new version of an application next to the stable version, and only let a small fraction of users hit the new version to see how it behaves before rolling it out to all users. This prevents bad releases from being exposed to too many users.

#### 3.3.2. Specifying labels when creating a pod
#### 3.3.3. Modifying labels of existing pods
- Show labels pod
```bash
kubectl get po --show-labels
kubectl get po -L creation_method,env
```

```bash
kubectl label po <pod-name> creation_method=manual
```

### 3.4. Listing subsets of pods through label selectors
- A label selector can select resources based on whether the resource:
  - Contains (or doesn't contain) a label with a certain key
  - Contains a label with a certain key and value
  - Contains a label with a certain key, but with a value not equal to the one you specify

#### 3.4.1. Listing pods using a label selector
#### 3.4.2. Using multiple conditions in a label selector

### 3.5. Using labels and selectors to constrain pod scheduling
#### 3.5.1. Using labels for categorizing worker nodes

#### 3.5.2. Scheduling pods to specific nodes
#### 3.5.3. Scheduling to one specific node

### 3.6. Annotating pods
#### 3.6.1. Looking up an object's annotations
#### 3.6.2. Adding and modifying annotations

### 3.7. Using namespaces to group resources
#### 3.7.1. Understanding the need for namespaces
#### 3.7.2. Discovering other namespaces and their pods
#### 3.7.3. Creating a namespace
#### 3.7.4. Managing objects in other namespaces
#### 3.7.5. Understanding the isolation provided by namespaces
### 3.8. Stopping and removing pods
#### 3.8.1. Deleting a pod by name
#### 3.8.2. Deleting pods using label selectors

## Chapter 4. Replication and other controllers: deploying managed pods
### 4.1. Keeping pods healthy
#### 4.1.1. Introducing liveness probes
- Kubernetes can probe a container using one of the three mechanisms:
  - An HTTP GET probe performs an HTTP GET request on the container's IP address, a port and path you specify. If the probe receives a response, and the response code doesn't represent an error(in other words, if the HTTP response code is 2xx or 3xx), the probe is considered successful. If the server returns an error response code or if it doesn't respond at all, the probe is considered a failure and the container will be restarted as a result.
  - A TCP Socket probe tries to open a TCP connection to the specified port of the container. If the connection is established successfully, the probe is successful. Otherwise, the container is restarted.
  - An Exec probe excutes an arbitrary command inside the container and checks the command's exit status code. If the status code is o, the probe is successful. All other codes are considered failures.

#### 4.1.2. Creating an HTTP-based liveness probe
#### 4.1.3. Seeing a liveness probe in action
#### 4.1.4. Configuring addiontal properties of the liveness probe
#### 4.1.5. Creating effective liveness probes
- What a liveness probe should check:
  - Make sure the `/health` HTTP endpoint doesn't require authentication
- Keeping probes light
- Don't Border implementing retry loops in your probes
- Liveness probe wrap-up

### 4.2. Introducing ReplicationControllers
#### 4.2.1. The operation of a ReplicationController
- A ReplicationController has three essential parts:
  - A label selector, which determines what pods are in the ReplicationController's scope
  - A replica count, which specifies the desired number of pods that should be running
  - A pod template, which is used when creating new pod replicas
- Understanding the benefits of using a ReplicationController:
  - It makes sure a pod (or multiple pod replicas) is always running by starting a new pod when an existing one goes missing.
  - When a cluster node fails, it creates replacement replicas for all the pods that were running on the failed node (those that were under the Replication-Controller's control).
  - It enables easy horizontal scaling of pods - both manual and automatic
- A pod instance is nver relocated to another node. Instead, the ReplicationController creates a completely new pod instance that has no relation to the instance it's replacing.

#### 4.2.2. Creating a ReplicationController
- Don't specify a pod selector when defining a ReplicationController.

#### 4.2.3. Seeing the ReplicationController in action
- `rc` : replicationcontroller

```bash
kubectl get rc
```

#### 4.2.4. Moving pods in and out of the scope of a ReplicationController
- Although a pod isn't tied to a ReplicationController, the pod does reference it in the metadata.ownerReferences field, which you can use to easily find which ReplicationController a pod belongs to.

#### 4.2.5. Changing the pod template
```bash
kubectl edit rc <rc-name>
```

#### 4.2.6. Horizontally scaling pods
```bash
kubectl scale rc <rc-name> --replicas=<num>
```
#### 4.2.7. Deleting a ReplicationController
```bash
kubectl delete rc <rc-name>
```

### 4.3. Using ReplicaSets instead of ReplicationControllers
#### 4.3.1. Comparing a ReplicaSet to a ReplicationController
#### 4.3.2. Defining a ReplicaSet
#### 4.3.3. Creating and examing a ReplicaSet
```bash
kubectl get rs
```

#### 4.3.4. Using the ReplicaSet's more expressive label selectors
- Selector key matchExpressions' operators:
  - `In`-Label's value must match one of the specified values.
  - `NotIn`-Label's value must not match any of the specified values.
  - `Exists`-Pod must include a label with the specified key (the value isn't important). When using this operator, you shouldn't specify the values field.
  - `DoesNotExist`-Pod must not include a label with the spcified key.

#### 4.3.5. Wrapping up ReplicaSets
```bash
kubectl delete rs <rs-name>
```

### 4.4. Running exactly one pod on each node with DaemonSets
#### 4.4.1. Using a DaemonSet to run a pod one every node
#### 4.4.2. Using a DaemonSet to run pods only on certain nodes
- Creating the DaemonSet
- Adding the required label to your node(s)

### 4.5. Running pods that perform a single completable task
#### 4.5.1. Introducing the Job resource
#### 4.5.2. Defining a Job resource
#### 4.5.3. Seeing a Job run a pod
```bash
kubectl get jobs
```

#### 4.5.4. Running multiple pod instances in a Job
#### 4.5.5. Limiting the time allowed for a Job pod to complete

### 4.6. Scheduling Jobs to run periodically or once in the future
#### 4.6.1. Creating a CronJob
#### 4.6.2. Understanding how scheduled jobs are run
### 4.7. Summary
- You can specify a liveness probe to have Kubernetes restart your containre as soon as it's no longer healthy
- Pods shouldn't be created directly, because they will not be re-created if they're deleted by mistake, if the node they're running on fails, or if they're evicted from the node.
- ReplicationControllers always keep the desired number of pod replicas running
- Scaling pods horizontally is as easy as changing the desired replica count on a ReplicationController
- Pods aren't owned by the ReplicationControllers and can be moved between them if necessary.
- A ReplicationController creates new pods from a pod template. Chaning the template has no effect on existing pods.
- ReplicationControllers should be replaced with ReplicaSets and Deployments, which provide the same functionality, but with additional powerful features.
- ReplicationControllers and ReplicaSets schedule pods to random cluster nodes, whereas DaemonSets make sure every node runs a single instance of a pod defined in the DaemonSet.
- Pods that perform a batach task should be created through a Kubernetes Job resource, not directly or through a ReplicationController or similar object.
- Jobs that need to run sometime in the future can be created through CronJob resources.

## Chapter 5. Services: enabling clients to discover and talk to pods
### 5.1. Intoducing services
- When creating a service with multiple ports, you must speicify a name for each port.
- FQDN : fully qualified domain name

### 5.2. Connecting to services living outside the cluster

### 5.3. Expsing services to external clients
- Ways to make a service accisible externally:
  - Setting the service type to NodePort
  - Setting the service type to LoadBalancer
  - Creating an Ingress resource

### 5.4. Exposing services externally through an Ingress resource
### 5.5. Signaling when a pod is ready to accept connections
- three types of readiness probes:
  - An Exec probe, where a process is executed.
  - An HTTP GET probe
  - A TCP Socket probe
- If you want to add or remove a pod from a service manually, add enabled=true as a label to your pod and to the label selector of your service.
- You should always define a readiness probe, even if it's as simple as sending an HTTP requeset to the base URL.
- Don't include pod shutdown logic into your readiness probes

### 5.6. Using a headless service for discovering individual pods
### 5.7. Troubleshooting services
- Make sure you're connecting to the service's cluster IP from within the cluster, not from the outside.
- Don't bother pining the service IP to figure out if the service is accessible (remember, the service's cluster IP is a virtual IP and pining it will never work).
- If you've defined a readiness probe, make sure it's succeeding; otherwise the pod won't be part of the service.
- To confirm that a pod is part of the service, examine the corresponding Endpoints object with `kubectl get endpoints`.
- If you're trying to access the service through its FQDN or a part of it and it doesn't work, see if you can access it using its cluster IP instead of the FQDN.
- Check whether you're connecting to the port exposed by the service and not the targtet port.
- Try connecting to the pod IP directly to confirm your pod is accepting connections on the correct port.
- If you can't even access your app through the pod's IP, make sure your app isn't only binding to localhost.

### 5.8. Summary
- Expose multiple pods that match a certain label selector under a single, stable IP address and port.
- Make services accessible from inside the cluster by default, but allows your to make the service accessible from outside the cluster by setting its type to either `NodePort` or `LoadBalancer`
- Enables pods to discover services together with their IP addresses and ports by looking up environment variables
- Allows discovery of and communication with services residing outside the cluster by creating a Service resource without specifying a selector, by creating an associated Endpoints resource instead
- Provides a DNS CNAME alias for external services with the ExternalName service type
- Expose multiple HTTP services through a single Ingress (consuming a single IP)
- Uses a pod container's readiness probe to determine whether a pod should or shouldn't be included as a service endpoint
- Enables discovery of pod IPs through DNS when you create a headless service

## Chapter6. Volumes: attaching disk storage to containers
### 6.1. Introducing volumes
- volume types:
  - emptyDir : A simple empty directory used for storing transient data.
  - hostPath : Used for mounting directories from the worker node's filesystem into the pod
  - gitRepo : A volume initialized by checking out the contents of a Git repository
  - nfs : An NFS share mounted into the pod
  - gcePersistentDisk : Google Compute Engine Persistent Disk
  - cinder, cephfs, iscsi, flocker, glusterfs, guobyte, rdb, flexVolume, vsphere-Volume, photonPersistentDisk, scaleIO : Used for mounting other types of network storage
  - configMap, secret, downwardAPI : Special types of volumes used to expose certain Kubernetes resources and cluster information to the pod
  - persistentVolumeClaim : A way to use a pre- or dynamically provisioned persistent storage.

### 6.2. Using volumes to share data between containers
#### 6.2.1. Using an emptyDir volume
#### 6.2.2. Using a Git repository as the starting point for a volume

### 6.3. Accessing files on the worker node's filesystem
### 6.4. Using persistent storage
### 6.5. Decoupling pods from the underlying storage technology
#### 6.5.1. Introducing PersistentVolumes and PersistentVolumeClaims
#### 6.5.2. Creating a PersistentVolume
- pv : persistent volume
- pvc : persistent volume claim

### 6.6. Dynamic provisioning of PersistentVolumes
- Similar to PersistentVolumes, StorageClass resources aren't namespaced.

### 6.7. Summary
- Create a multi-container pod and have the pod's containers operate on the same files by adding a volume to the pod and mounting it in each container
- Use the emptyDir volume to store temporary, non-persistent data
- Use the gitRepo volume to easily populate a directory with the contents of a Git repository at pod startup
- Use the hostPath volume to access files from the host node
- Mount external storage in a volume to persist pod data across pod restarts
- Decouple the pod from the storage infrastructure by using PersistentVolumes and PersistentVolumeClaims
- Have PersistentVolumes of the desire (or the default) storage class dynamically provisioned for each PersistentVolumeClaim
- Prevent the dyanic provisioner from interfering when you want the PersistentVolumeClaim te be bound to a pre-provisioned PersistentVolume

## Chapter 7. ConfigMaps and Secrets: configuringg applications
### 7.1. Configuring containerized applications
### 7.2. Passing command-line arguments to containers
#### 7.2.1. Defining the command and arguments in Docker
- ENTRYPOINT defines the executable invoked when the container is started
- CMD specifies the arguments that get passed to the ENTRYPOINT

### 7.3. Setting environment variables for a container
### 7.4. Decoupling configuration with a ConfigMap
- ConfigMap keys must be a valid DNS subdomain (they may only contain alphanumeric characters, dashes, underscores, and dots). They may optionally include a leading dot.

### 7.5. Using Secrets to pass sensitive data to containers
### 7.6. Summary
- Override the default command defined in a container image in the pod definition
- Pass command-line arguments to the main container process
- Set environment variables for a container
- Decouple configuration from a pod specification and put it into a ConfigMap
- Store sensitive data in a Secret and deliver it securely to containers
- Create a docker-registry Scret and use it to pull images from a private image registry

## Chapter 8. Accessing pod metadata and other resources from applications
### 8.1. Passing metadata through the Downward API
### 8.2. Talking to the Kubernetes API server
```bash
kubectl cluster-info
```

- Accessing the API server through kubectl proxy
```bash
kubectl proxy
```

- How a pod's name, namespace, and other metadata can be exposed to the process either through enviroment variables or files in a downwardAPI volume
- How CPU and memory requests and limits are passed to your app in any unit the app requies
- How a pod can use downwardAPI volumes to get up-to-date metadata, which may change during the lifetime of the pod (such as labels and annotations)
- How you can brwose the Kubernetes REST API through kubectl proxy
- How pods can find the API server's location through environment variables or DNS, similar to any other Service defined in Kubernetes
- How an application running in a pod can verify that it's talking to the API server and how it can authenticate itself
- How using an ambassador container can make talking to the API server from within an app much simpler
- How client libraries can get you interacting with Kubernetes in minutes

## Chapter 9. Deployments: updating applications declaratively
### 9.1. Updating applications running in pods
### 9.2. Performing an automatic rolling update with a ReplicationController
### 9.3. Using Deployments for updating apps declaratively
- Deployment -> ReplicaSet -> Pods
- `kubectl edit`
- `kubectl patch`
- `kubectl apply`
- `kubectl replace`
- `kubectl set image`

### 9.4. Summary
- Perform a rolling update of pods managed by a ReplicationController
- Create Deployments instead of lower-level ReplicationControllers or ReplicaSets
- Update your pods by editing the pod template in the Deployment specification
- Roll back a Deployment either to the previous revision or to any earlier revision still listed in the revision history
- Abort a Deployment mid-way
- Pause a Deployment to inspect how a single instnace of the new version behaves in production before allowing additional pod instances to replace the old ones
- Control the rate of the rolling update through maxSurege and maxUnavailable properties
- Use minReadySeconds and readiness probes to have the rollout of a faulty version blocked automatically

- Use three dashes as a separator to define multiple resources in a single YAML file
- Turn on kubectl's verbose loggin to se exacyl what it's doing behind the curtains

## Chatper 10. StatefulSets: deploying replicated statful applications
- StatefulSets were initially called PetSets. That name comes from the pets vs. cattle analogy explained here
- SRV record
  ```bash
  kubectl run -it srvlookup --image/tutum/dnsutils --rm
  ```

### 10.6. Summary
- Give replicated pods individual storage
- Provide a stable identity to a pod
- Create a StatefulSet and a corresponding headless governing Service
- Scale and update a StatefulSet
- Discorver other members of the StatefulSet through DNS
- Connect to other members through their host names
- Forcibly delete stateful pods

# Part 3. Beyond the basics
## Chapter 11. Understanding Kubernetes internals
### 11.1 Understanding the architecture
- Kubernetes cluster is split into two parts:
  - The Kubernetes Control Plane
  - The (worker) nodes
- Components of the Control Plane:
  - The etcd distributed persistent storage
  - The API server
  - The Scheduler
  - The Controller Manager
- Components running on the worker nodes:
  - The Kubelet
  - The Kubernetes Service Proxy (kube-proxy)
  - The Container Runtime (Docker, rtc, or others)
- Add-on components:
  - The Kubernetes DNS server
  - The Dashboard
  - An Ingress controller
  - Heapster
  - The Container Network Interface newtork plugin

#### 11.1.1. The distribued natrue of Kubernetes components
- Kubernetes system components communicate only with the API server.
- The API server is the only component that communicates with etcd.
- The Control Plane components, as well as kube-proxy, can either be deployed on the system directly or they can run as pods.
- The Kubelet is the only component that always runs as a regular system component.

#### 11.1.2. How kubernetes uses etcd
- Optimistic concurrency control.
- Ensuring consistency when etcd is clustered

#### 11.1.3. What the API server does
1. Authenticating the client with authentication plugins
2. Authorizing the client with authorization plugins
3. Validating and/or Modifying the resource in the request with admission control plugins
4. Validating the resource and storing it persistently

#### 11.1.4. Understanding how the API server notifies clients of resource changes
- Clients watch for changes by opening an HTTP connection to the API server

#### 11.1.5. Understanding the Scheduler
- Understanding the default scheduling algorithm:
  - Filtering the list of all nodes to obtain a list of acceptable nodes the pod can be scheduled to.
  - Prioritizing the acceptable nodes and choosing the best one. If multiple nodes have the highest score, round-robin is used to ensure pods are deployed across all of them evenly.

#### 11.1.6. Introducing the controllers running in the Controller Manager
- The single Controller Manager process currently combines a multitude of controllers performing various reconciliation tasks:
  - Replication Manager (a controller for ReplicationController resources)
  - ReplicaSet, DaemonSet, and Job controllers
  - Deployment controller
  - StatefulSet controller
  - Node controller
  - Service controller
  - Endpoints controller
  - Namespace controller
  - PersistentVolume controller
  - Others
- Controllers never talk to each other directly.

#### 11.1.7. What the Kubelet does

#### 11.1.8. The role of the Kubernetes Service Proxy
- The userspace proxy mode
- The iptables proxy mode

#### 11.1.9. Introducing Kubernetes add-ons
- How add-ons are deployed
- How the DNS server works
- How (most) ingress controllers work

#### 11.1.10. Bringing it all together

### 11.2. How controllers cooperate
#### 11.2.1. Understanding which components are involved

```bash
kubectl get events --watch
```

### 11.3. Understanding what a running pod is
- The pause container is an infrastructure container whose sole purpose is to hold all these namespaces.

### 11.4. Inter-pod networking
- Pods on a node are connected to the same bridge through virtual Ethernet interface paris.
- For pods on different nodes to communicate, the bridges need to be connected somehow.

#### 11.4.3. Introducing the Container Network Interface
- CNI : Container Network Interface:
  - Calico, Fannel, Romana, Weave Net...

### 11.5. How services are implemented
#### 11.5.1. Introducing the kube-proxy
- userspace proxy mode : the kube-proxy was an actual proxy waiting for connections and for each incoming connection, opening a new connection to one of the pods.

#### 11.5.2. How kube-proxy uses iptables
1. When a service is created in the API server, the virtual IP address is assigned to it immediately.
2. The API server notifies all kube-proxy agents running on the worker nodes that a new Service has been created.
3. Each kube-proxy makes that service addressable on the node it's running on.

- An Endpoints object holds the IP/port paris of all the pods that back the service (an IP/port pair can also point to something other than a pod).:
  - So, all endpoints are watched by kube-proxy.

- The trip of packet from a pod to another pod of service:
  1. The packet's destination is initially set to the IP and port of the Service
  2. The kernel checks if the packet matches any of iptables rule. When matched, the packet's destination IP and port should be replaced with the IP and port of a randomly selected pod.

### 11.6. Running highly avaiable clusters
- Running multiple instances to reduce the likelihood of downtime
- Using leader-election for non-horizontally scalable apps

#### 11.6.2. Making Kubernetes Control Plane components highly available
- To make Kubernetes highly available, you ndeed to run multiple master nodes:
  - etcd, which is the distributed data store where all the API objects are kept
  - API server
  - Controller Manager, which is the process in which all the controllers run
  - Scheduler
- Behind LoadBalancer, all etcd on master nodes (including stand-by) are connected each other:
  - Because etcd was designed as a distributed system, one of its key features is the ability to run multiple etcd instances, so making it highly available is no big deal.
  - API server is (almost completely) stateless (all the data is stored in etcd)

- Ensuring high avilability of the controllers and the Scheduler:
  - leader election

## Chapter 12. Securing the Kubernetes API server
### 12.1. Understanding authentication
- Several authentication plugins:
  - From the client certificate, From an authentication token passed in an HTTP header, Basic HTTP authentication

#### 11.1.1. Users and groups
- Kubernetes distinguises between two kinds of clients connecting to the API server:
  - users, pods
- pods use ServiceAccount
- built-in groups:
  - `system:unauthenticated`, `system:authenticated`, `system:serviceaccounts`, `system:serviceaccounts:<namespace>`

```bash
kubectl get sa
```

#### 11.1.4. Assigning a ServiceAccount to a pod

### 12.2. Securing the cluster with role-based access control
#### 12.2.1. Introducing the RBAC authorization plugin

| HTTP method | Verb for single resource    | Verb for collection |
| GET, HEAD   | get(and watch for watching) | list (and watch)    |
| POST        | create                      | n/a                 |
| PUT         | update                      | n/a                 |
| PATCH       | patch                       | n/a                 |
| DELETE      | delete                      | deletecollection    |

#### 12.2.2. Introducing RBAC resources
- Roles and ClusterRoles
- RoleBindings and ClusterRoleBindings

---
### 12.3. Summary
- Clients of the API server include both human users and applications running in pods.
- Application in pods are associated with a ServiceAccount.
- Both users and ServiceAccounts are associated with groups.
- By default, pods run under the default ServiceAccount, which is created for each namespace automatically.
- Addiontional ServiceAccounts can be created manually and associated with a pod.
- ServiceAccounts can be configured to allow mouting only a constrained list of Secrets in a given pod.
- A serviceAccount can also be used to attach image pull Secrets to pods, so you don't need to specify the Secrets in every pod.
- Roles and ClusterRoles define what actions can be performed on which resources.
- RoleBindings and ClusterRoleBindings bind Roles and ClusterRoles to users, groups, and ServiceAccounts.
- Each cluster comes with default ClusterRolese and ClusterRoleBindings.

## Chatper 13. Securing cluster nodes and the network
### 13.1. Using the host node's namespaces in a pod
#### 13.1.1. Using the node's network namespace in a pod
#### 13.1.2. Binding to a host port without using the host's network namespace
### 13.2. Configuring the container's security context
#### 13.2.1. Running a container as a specific user
#### 13.2.2. Preventing a container from running as root
#### 13.2.3. Running pods in privileged mode
#### 13.2.4. Adding individual kernel capabilities to a container
### 13.3. Restricting the use of security-related features in pods
#### 13.3.1. Introducing the PodSecurityPolicy resource
- Understanding what a Pod SecurityPolicy can do:
  - Whether a pod can use the host's IPC, PID, or Network namespaces
  - Which host ports a pod can bind to
  - What user IDs a container can run as
  - Whether a pod with privileged containers can be created
  - Which kernel capabilities are allowed, which are added by default and which are always dropped
  - What SELinux labels a container can use
  - Whether a container can use a writable root filesytem or not
  - Which filesystem groups the container can run as
  - Which volume types a pod can use

#### 13.3.2. Understanding runAsUser, fsGroup, and supplementalGroups policies
- Changing the policy has no effect on exising pods, because Pod-Security-Policies are enforced only when creating or updating pods.

#### 13.3.3. Configuring allowed, default, and disallowed capabilities
#### 13.3.4. Constraining the types of volumes pods can use
#### 13.3.5. Assigning different PodSecurityPolicies to different users and groups
- psps : PodSecurityPolicy

### 13.4. Isolation the pod network
- ingress(out->in), egress(in->out)

#### 13.4.2. Allowing only some pods in the namespace to connect to a server pod
#### 13.4.3. Isolating the network between Kubernetes namespaces
#### 13.4.4. Isolating using CIDR notation

### 13.5. Summary
- Pods can use the node's Linux namespaces instead of using their own.
- Containers can be configured to run as a different user and/or group than the one defined in the container image.
- Containers can also run in priviledged mode, allowing them to access the node's devices that are otherwise not exposed to pods.
- Containers can be run as read-only, preventing processes from writing to the container's filesystem (and only allowing them to write to mounted volumes).
- Cluster-level PodSecurityPolicy resources can be created to prevent users from creating pods that could compromise a node.
- PodSecurityPolicy resources can be associated with specific user using RBAC's ClusterRoles and ClusterRoleBindings.
- NetworkPolicy resources are used to limit a pod's inbound and/or outbound traffic.

## Chapter 14. Managing pods' computational resources
### 14.1. Requesting resources for a pod's containers
- Understanding how resource requests affect scheduling:
  - Understanding how the Scheduler determines if a pod can fit on a node:
    - Scheduler doesn't look at how much of each individual resource is begin used at the exact time of scheduling
    - Scheduleer guarantee given to the already deployed pods
    - `LeastRequestedPriory`, `MostRequestedPriority`
    - By keeping pods tightly packed, certain nodes are left vacant and can be removed.
  - Inspecting a node's capacity:
    ```bash
    kubectl describe nodes
    ```

### 14.2. Limiting resources available to a container
- The sum of all resource limits of all the pods on a node is allowed to exceed 100% of the node's capacity.
- Understanding that containers always see the node's memory, not the container's
- Understanding that containers also see all the node's CPU cores

### 14.3. Understanding pod QoS classes
- Three Quality of Service (QoS) classes:
  - `BestEffort` : the lowest priority
  - `Burstable`
  - `Guarantted` : the highest
    - When use Guarantted, the three things need to be true:
      - Requests and limits need to be set for both CPU and memory.
      - They need to be set for each container.
      - They need to be equal (the limit needs to match the request for each resource in each container)

- Understanding which process gets killed when memory is low:
  - Basically, depending on priority : Kill order (BestEffort -> Burstable -> Guarantted)
  - Understnading how containers with the same Qos class are handled:
    - OOM(OutOfMemory) scores

### 14.4. Setting default requests and limits for pods per namespace
### 14.5. Limiting the total resources available in a namespace
#### 14.5.1. Introducing the Resource Quota object

### 14.6. Monitoring pod resource usage
- cAdvisor
- Heapster
- Storing and analyzing historical resource consumption statistics:
  - InfluxDB, Grafana

## Chatper 15. Automatic scaling of pods and cluseter nodes
### 15.1. Horizontal pod autoscaling
#### 15.1.1. Understanding the autoscaling process
- Obtaining pod metrics:
  - Pod(s) - cAdvisor(s) - Heapster - Horizontal Pod Autoscaler(s)
  - Prior to k8s version 1.6, the HorizontalPodAutoscaler obtained the metrics from Heapster directly.
  - Heapster was deprecated in version 1.11, and removed in version 1.13
- Calculating the required number of pods
- Updating the desired replica count on the scaled resource

#### 15.1.2. Scaling based on CPU utilization
- Creating a HorizontalPodAutoscaler based on CPU usage

```bash
kubectl autoscale deployment <deployment name> --cpu-percent=30 --min=1 --max=5
```

- Seeing the first automatic rescale event

```bash
kubectl get hpa
```

- Triggering a scale-up
- Seeing the Autoscaler scale up the deployment
- Understanding the maximum rate of scaling:
  - auto scaling events has minimum gap.
- Modifying the target metric value on an existing HPA object

#### 15.1.3. Scaling based on memory consumption
#### 15.1.4. Scaling based on other and custom metrics
- https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/#scaling-on-custom-metrics

- Three types of metrics which we can use for an HPA object:
  - Resource, Pods, object
- Understanding the Resource metric type
- Understanding the pods metric type

#### 15.1.5. Determining which metrics areappropriate for autoscaling
#### 15.1.6. Scaling down to zero replicas
- https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/#scaling-on-custom-metrics

### 15.2. Vertical pod autoscaling
- https://github.com/kubernetes/autoscaler/tree/master/vertical-pod-autoscaler
#### 15.2.1. Automatically configuring resource requests
#### 15.2.2. Modifying resource requests while a pod is running

### 15.3. Horizontal scaling of cluster nodes
#### 15.3.1. Introducing the Cluster Autoscaler
- Requesting additional nodes from the cloud infrastructure:
  1. Autoscaler notices a Pod can't be schdeulded to exsiting nodes
  2. Autoscaler determines which node type (if any) would be able to fit the pod. If multiple types could fit the pod, it selects one of them.
  3. Autoscaler scales up the node group selected in previous step.

- Relinquishing nodes

#### 15.3.2. Enabling the Cluster Autoscaler
#### 15.3.3. Limiting service disruption during cluster scale-down
- PodDiscruptionBudget

```bash
kubectl create pdb <pdb name> --selector=<selector; e.g. app=kubia> --min-available=<numeric; e.g. 3>
```

### 15.4. Summary
- Configuring the automatic horizontal scaling of pods is as easy as creating a Horizontal-PodAutoscaler object and pointing it to a Deployment, ReplicaSet, or ReplicationController and specifying the target CPU utilization for the pods.
- Besides having the Horizontal Pod Autoscaler perform scaling operations based on the pods' CPU utilization, you can also configure it to scale based on your own application-provided custom metrics or metrics related to other objects deployed in the cluster.
- Vertical pod autoscaling isn't possible yet.
- Even cluster nodes can be scaled automatically if your Kubernetes cluster runs on a supported cloud provider.
- You can run one-off processes in a pod and have the pod stopped and deleted automatically as soon you press CTRL+C by using kubectl run with the -it and --rm options.

## Chapter 16. Advanced schdeuling
### 16.1. Using taints and tolerations to repel pods from certain nodes
#### 16.1.1. Introducing taints and tolerations
- Displaying a node's taints
- Displaying a pod's toelrations
- Understanding taint effects:
  - NoSchedule
  - PreferNoSchedule
  - NoExecute

#### 16.1.2. Adding custom taints to a node
#### 16.1.3. Adding toleratiosn to pods
#### 16.1.4. Understanding what taints and tolerations can be used for
- Using taints and tolerations during scheduling:
  - Taints can be used to prevent scheduling of new pods and to define unpreferred nodes and even evict existing pods from a node
- Configuring how long after a node failure a pod is rescheduled

### 16.2. Using node affinity to attract pods to certain nodes
- Comparing node affinity to node selectors
- Examining the default node labels

#### 16.2.1. Specifying hard node affinity rules

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: kubia-gpu
spec:
  affinity:
    nodeAffinity:
      requiredDuringSchedulingIgnoredDuringExecution:
        nodeSelectorTerms:
        - matchExpressions:
          - key: gpu
            operation: In
            values:
            - "true"
```

- Making sense of the long nodeAffinity attribute name:
  - `requiredDuringScheduling...` : the node must have for the pod to be scheduled to the node.
  - `...IgnoredDuringExecution` : don't affect pods already executing on the node.

- Understanding nodeSelectorTerms

#### 16.2.2. Prioritizing nodes when scheduling a pod
- Labeling nodes

### 16.3. Co-locating pods with pod affinity and anti-affinity
#### 16.3.1. Using inter-pod affinity to deploy pods on the same node
- Specifying pod affinity in a pod definition
- Deploying a pod with pod affinity
- Understanding how the scheduler uses pod affinity rules

#### 16.3.2. Deploying pods in the same rack, availability zone, or geographic region
- https://kubernetes.io/docs/concepts/scheduling-eviction/topology-spread-constraints/
- Co-locating pods in the same availability zone
- Co-locating pods in the same geographical region

#### 16.3.3. Expressing pod affinity preferences instad of hard requirements
#### 16.3.4. Schdeduling pods away from each other with pod anti-affinity

### 16.4. Summary
- If you add a taint to a node, pods won't be scheduled to that node unless they tolerate that taint.
- Three types of taints exsit:
  - `NoSchedule`: completely prevents chdeduling
  - `PreferNoSchedule`: isn't as strict
  - `NoExecute`: even evicts existing pods from a node.
- The `NoExecute` taint is also used to specify how long the Control Plan should wait before rescheduling the pod when the node it runs on becomes unreachable or unready.
- Node affinity allows you to specify which nodes a pod should be scheduled to. It can be used to specify a hard requirement or to only express a node preference.
- Pod affinity is used to make the Scheduler deploy pods to the same node where another pod is running (based on the pod's lables).
- Pod affinity's `topologyKey` specifies how close the pod should be deployed to the other pod(onto the same node or onto a node in the same rack, availability zone, or avabilability region).
- Pod anti-affinity can be used to keep certain pods away from each other.
- Both pod affinity and anti-affinity, like node affinity, can either specify hard requirements or preferences.


## Chapter 17. Best practices for developing apss
### 17.1. Bringing everything together
### 17.2. Understanding the pod's lifecycle
#### 17.2.1. Applicatiosn must expect to be killed and replocated
- Expecting the local IP and hostname to change
- Expecting the data written to disk to disappear
- Using volumdes to preserve data across container restarts

#### 17.2.2. Rescheduling of dead or partially dead pods
#### 17.2.3. Starting pods in a specific order
- Understanding how pods are started
- Introducing Init Containers
- Adding an Init Container to a pod
- Best practices for handlign inter-pod depdencies

#### 17.2.4. Adding lifecycle hooks
- Post-start hooks
- Pre-stop hooks
- Using a pre-stop hook because your app doesn't receive teh SIGTERM signal
- Understanding that lifecycel hooks target containers, not pods

#### 17.2.5. Understanding pod shutdown
- Specifying the termination grace period:
  - `spec.terminationGracePeriodSeconds` : defualt 30s

  ```bash
  kubectl delete pod mypod --grace-period=0 --force
  ```

- Implementing the proper shutdown handler in your application:
  - There are absolutely no guarantees that the pod will be allowed to complete its whole shut-down procedure.
- Replacing critical shut-down procedures with dedicated shut-down procedure pods

### 17.3. Ensuring all client requests are handled properly
#### 17.3.1. Preventing broken client connections when a pod is starting up
#### 17.3.2. Preventing broken connections during pod shutdown
- Understanding the sequence of events occurring at pod deletion:
  - A & B simultaneously run
  - A root : Watch notification(pod modified) - kubelet send `SIGTERM` to containers
  - B root : Watch notification(pod modified) - Endpoitns controller remove pod's IP from endpoints using API Server:
    - kube-proxy recognize endpoints changes using watch notification:
      - Update iptables rule
- To recap properly shutting down an application includes these steps:
  - Wait for a few seconds, then stop accepting new connections
  - Close all keep-alive connections not in the middle of a request
  - Wait for all active requests to finish
  - Then shut down completely.

### 17.4. Making your apps easy to run and manage in Kubernetes
#### 17.4.1. Making manageable container images
#### 17.4.2. Properly tagging your images and using imagePullPolicy wisely
- `imagePullPolicy` set `Always` with `latest` tag.

#### 17.4.3. Using multi-dimensional instead of single-dimensional labels
- Labels:
  - The name of the application (or perhaps microservice) the resource belongs to
  - Application tier (front-end, back-end, and so on)
  - Environment (development, QA, staging, production, and so on)
  - Version
  - Type of release (stable, canary, green or blue for green/blue development,s and so on)
  - Tenant (if you're running separate pods for each tenant instead of using namespaces)
  - Shard for sharded systems

#### 17.4.4. Describing each resource through annotations
#### 17.4.5. Providing infromation on why the process terminated
- `/dev/termination-log`, `terminationMessagePath`

#### 17.4.6. Handling application logs
- Using centralized logging:
  - ELF, EFK
- Handling multi-line log statments

### 17.5. Best practices for development and testing
#### 17.5.1. Running apps outside of Kubernetes during development
- Connecting to backend services:
  - `BACKEND_SERVICE_HOST` and `BACKEND_SERVICE_PORT`
- Connecting to the API server
- Runnign inside a container even during development

#### 17.5.2. Using Minikube in development

### 17.6. Summary
- Make you think about the difference between apps that are rarely moved between machines and apps running as pods, which are relocated much more frequently.
- Help you understand that yuour multi-component apps (or microservices, if you will) shouldn't rely on a specific start-up order
- Introduce init containers, which can be used to initialize a pod or delay the start of the pod's main containers until a precondtition is met.
- Teach you about container lifecycle hooks and when to use them
Gain a deeper insight into the consequences of the distributed nature of Kubernetes components and its eventual consistency model.
- Learn how to make your apps shut down properly without breaking client connections
