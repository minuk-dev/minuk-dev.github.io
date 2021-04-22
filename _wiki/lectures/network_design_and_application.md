---
layout  : wiki
title   : 네트워크 응용 설계
summary : 네설 정리
date    : 2021-04-21 20:50:32 +0900
lastmod : 2021-04-22 17:32:55 +0900
tags    : [lectures]
parent  : lectures
draft   : true
---

## Chapter 6.7 Life of a web request
 * "A day in the life of a web request"
 * Scenario : A student attaches laptop to campus network, and wants to access www.google.com

### Connecting to the Internet
 * Connecting laptop needs to get:
   * its own IP address,
   * addr of first-hop (gateway) router,
   * addr of DNS server:

   * use DHCP! (or configure manully)
 * DHCP request encapsulated in UDP, encapsulated in IP, encapsulated in 802.3 Ethernet
 * Ethernet frame broadcast on LAN, received at router running DHCP server
 * Ethernet demuxed to IP demuxed, UDP demuxed to DHCP

 * DHCP server formulates DHCP ACK containing:
   * client's IP address,
   * IP address of first-hop (gateway) router for client,
   * name & IP address of DNS server

 * Encapsulation at DHCP server, frame forwarded (switch learning) through LAN, demultiplexing at client
   * need not LAN broadcast

 * DHCP client receives DHCP ACK reply
 * Client now has IP address, knows name & addr of DNS server, IP address of its first-hop router

### DNS querying (get IP address of google.com before HTTP)
 * Before sending HTTP request, need IP address of www.google.com: DNS
 * DNS query created, encapsulated in UDP, encapsulated in IP, encapsulated in Eth.
 * (assuming that client now knows the MAC address of first hop(gateway) router)
 * send frame containing DNS query

### ARP
 * To send any IP packet to the next device for the first time, need MAC address of that device
 * In our scenario, to send frame to router (for the first time), need MAC address of router interface: ARP:
   * translate IP address -> MAC address
 * ARP query broadcast, received by router, which replies with ARP reply giving MAC address of router interface
 * client now knows MAC address of first hop router, so can now send frame containing DNS query

### DNS querying
 * IP datagram containing DNS query forwarded via LAN switch from client to 1st hop router
 * IP datagram forwarded from campus network into network provider, routed (tables created by RIP, OSPF, ISIS and/or BGP routing protocols) to DNS server
 * demuxed to DNS server
 * DNS server replies to client with IP address of www.google.com

 ### A day in the life... TCP connection carrying HTTp
  * To send HTTP request, client first opens TCP socket to web server
  * TCP SYN segment (step 1 in 3-way handshake) inter-domain routed to web server
  * Web server responds with TCP SYNACK (step 2 in 3-way handshake)
  * Client responds with TCP ACK (step 3 in 3-way handshake)
  * TCP conneciton established!

### A day in the life... HTTP request/reply
 * HTTP request sent into TCP socket
 * IP datagram containing HTTP request routed to www.google.com
 * web server responds with HTTP reply (containing web page)
 * IP datagram containing HTTP reply routed back to client

## Chapter 1. Introduction
 * network != computer network:
   * road network, railway network, electric network, social network, etc.
 * computer network != Internet
 * internet != Internet:
   * `a internet` vs `the Internet`
   * internet vs. intranet
 * We will learn "the Internet" not only because "the Internet" is important, but also to learn fundamental concepts and priciples of computer networking in general.

### Chapter 1.1 what is the Internet?
#### What's the Internet: a component view
 * network edge:
   * billions of connected computing devices:
     * hosts = end systems:
       * clients and servers
     * running network applications
 * access networks, physical media:
   * wired/wireless communication links:
     * fiber, copper, radio, satellite
 * network core:
   * interconnected packet switches:
     * routers and switches:
       * forward packets
   * network of networks
 * Internet: "network of networks"
   * internetworking of networks
   * Interconnected ISPs
 * protocls control sending, receiving of messages:
   * TCP, IP, HTTP, etc
 * Internet standards
   * RFC: Request for comments
   * IETF: Internet Engineering Task Force

#### Waht's the Internet: a service view
 * infrastructure that provides services to applications:
   * Web, VoIP, email, games, e-commerce, social nets, ...
 * provides programming interface to applications:
   * hooks that allow sending and receiving application programs to "connect" to the Internet
   * provides service options, analogous to postal service

#### What's a protocol?
 * a computer network protocol:
   * machines rather than humans
   * all communication activity in Internet governed by protocols
 * protocols define format, order of messages sent and received among network entities, and actions taken on message transmission, receipt, or other events

### Chapter 1.2 network edge - end systems, access networks, links
#### Access networks and physical media
 * How to connect systmes to edge router?:
   * residential access nets
   * institutional access networks
   * mobil access networks
 * keep in mind:
   * bandwidth (bits per second) of access network?
   * shared or dedicated?

#### Access network: digital subscriber line (DSL)
 * Use existing telephone line:
   * frequency division multiplexing: different channels transmitted in different frequency bands:
     * voice over DSL phone line goes to telephone net
     * data over DSL phone line goes to Internet
       * < 2.5 Mbps upstream transmission rate (typically < 1 Mbps)
       * < 24 Mbps downstream transmission rate (typically < 10 Mbps)

#### Access network: cable network
 * Use existing cable TV line:
   * frequency division multiplexing: different channels transmitted in different frequency bands
   * network of cable, fiber attacheds homes to ISP router:
     * homes share access network to cable headend
       * unlike DSL, which has dedicated access to central office

#### Enterprise access networks (Ethernet)
 * typically used in companies, universities, etc.
   * 10 Mbps, 100 Mbps, 1 Gbps, 10Gbps transmission rates
   * today, end systems typically connect into Ethernet switch

#### Wireless access networks
 * shared wireless access network connects end system to router
   * via base station a.k.a. "access point"
 * wireless LANs:
   * within buildings
 * wide-area wireless access:
   * provided by cellular operator
   * 10's km
   * between 1 and 10 Mbps
   * 3G, 4G: LTE

### Chapter 1.3 network core - packet switching, circuit switching, network structure
#### The network core
 * mesh of interconnected routers
 * packet-switching:
   * "hosts break application-layer messages into packets"
   * packet: a unit chunk of data
   * forward packets from one router to the next, across links on path from source to destination
   * each packet transmitted at full link capacity

#### Host: sends packets of data
 * host sending function:
   * takes application message
   * breaks into smaller chunks, known as "packets"
     * of length `L` bits
   * transmits packet into the network at transmission rate `R`
     * link transmission rate,
     * a.k.a. link capacity,
     * a.k.a. link bandwidth
   * (packet transmission delay) = time needed to transmit `L`-bit packet into link = $$\frac{L(bits)}{R(bits/sec)}$$

#### Packet-switching: store-and-forward
 * Takes L/R seconds to transmit(push out) L-bit packet into link at R bps
 * Store and forward: entire packet must arrive at router before it can be transmitted on next link
 * end-to-end delay = 2 L/R (when there is a router between source and destination.).

#### Packet-switching: queueing delay, loss
 * queuing and loss:
   * if arrival rate (in bits) to a link (temporarily) exceeds transmission rate of the link for a period of time:
     * packets will queue, wait to be transmitted on link
     * packets can be dropped (lost) if memory (buffer) fills up
   * if arrival rate (in bits) to link exceeds transmission rate of link always:
     * unstable system

#### Two key network-core functions
 * routing:
   * determines source-destination route taken by packets
   * routing algorithms
 * forwarding:
   * move packets from router's input to appropriate router output

#### Alternative core: circuit switching
 * end-end resources allocated to, and reserved for, communication between source & destination
   * in diagram, each link has four circuits.
 * dedicated resources: no sharing
   * circuit-like (guaranteed) performance
 * circuit segment idle if not used by call (no sharing)
 * commonly used in traditional telephone networks

#### Packet switching vs. circuit switching
 * Packet switching allows more users to use network!
 * Is packet switching a clear winner?
 * Great for bursty data:
   * resource sharing
   * simpler, no call setup
 * Excessive congestion possible: packet delay and loss
   * protocols needed for reliable data transfer, congestion control
 * Worked well forthe Internet!

#### Internet structure: network of networks
 * End systems connect to Internet via access ISPs (Internet Service Providers)
   * residential, company and university ISPs
 * Access ISPs in turn must be interconnected.
   * so that any two hosts can send packets to each other
 * Resuling network of networks is very complex:
   * evolution was driven by economics and national policies
 * Let's take a stepwise approach to describe current Internet structure

 * Internet exchange point, Peering link, Content Provider network
 * at the center: small number of well-connected large networks:
   * "tier-1" commercial ISPs(e.g., Level 3, Sprint AT&T, NTT), national & international coverage
   * content provider network : private network that connects it dat centers to Internet, often bypassing tier-1, regional ISPs

### Chapter 1.4 delay(latency), loss, and throughput in networks
#### How do loss and delay occur?
 * We use 'packet switching', and thus need
 * Packets queue in router buffers:
   * packet arrival rate to link (temporarily) exceeds output link capacity
   * packets queue, wait for turn

#### Four sources of packet delay (latency)
 * $$d_{nodal} = d_{proc} + d_{queue} + d_{trans} + d_{prop}$$
 * $$d_{proc}$$ : nodal processing:
   * check bit erros
   * determine output link
   * typically < msec
 * $$d_{queue}$$ : queueing delay:
   * time waiting at output link for transmission
   * depends on congestion level of router
   * often the main source of delay
 * $$d_{trans}$$ : transmission delay:
   * L: packet length (bits)
   * R: link bandwidth (bps)
   * $$d_{trans} = L / R$$
 * $$d_{prop}$$ : propagation delay:
   * D: length of physical link
   * s: propagation speed
   * $$d_{prop} = D/s$$

#### Delay Performance
 * End-to-end packet latency = $$\sum (d_{proc} + d_{queue} + d_{trans} + d_{prop})
   * $$d_{proc}$$ : very fast on today's routers
   * $$d_{prop}$$ : very small
     * propagation delay = distance/speed of light
       * $$6000 km / 3 * 10^8 = 0.02 sec$$
   * $$d_{trans}$$ : transmission delay:
     * depends on packet length (bits) and link bandwidth (bps)
       * $$1500 byte / 100 Mbps = 0.00012 sec$$
   * $$d_{queue}$$ : queueing delay
     * depends on congestion level of router
 * Delay performance (latency):
   * On bit transmission -> propagtion delay is important
   * Large bytes transmission -> bandwidth is important
   * Often, queuing delay is the main source of latency in large networks

#### Queuing delay
 * $$\mu$$ : link bandwidth (bps)
 * $$\lambda = L a$$ : average bit arrival rate:
   * L : packet length (bits)
   * a : average packet arrival rate
 * If:
   * $$\lambda / \mu ~ 0$$ : average queueing delay small
   * $$\lambda / \mu ->1$$ : average queueing delay large
   * $$\lambda / \mu > 1$$ : more "work" arriving than can be serviced, average delay infinite!

#### "Real" Internet delays and routes
 * what do "real" Internet delay & loss look like?:
   * `ping` and `traceroute`
   * RTT : round-trip-time

#### Three main types of pakcet loss
 * Link loss : loss at the wired/wireless link:
   * Luckily, today's wires are good. However, wireless!
 * Queue loss : loss at the queue(buffer) of a router/host
   * main cause of loss in most networks, including the Internet
 * Drop : you received it, but throw it away:
   * It's not for you, or you don't like it
   * You don't know where to send it to
   * loop detected, or TTL expires or etc.

#### Packet loss (at the link)
 * Bit Error Rate (BER):
   * how many bits have error?
   * error bits / total bits sent
   * represented by p
 * Packet Error Rate(PER):
   * how many packets have error?
   * error packets / total packets sent
   * Pr(packet error) = 1 - P(packet error) = 1 - (1 - p)^L
     * L : packet size (bits)
 * Even if p(BER) is very small, PER can be very big.
 * Expected number of transmission (ETX):
   * In order to get one packet delivered, on average, how many transmission should I do?
   * How to detect link loss?
     * CRC, ACK etc.
   * Luckily, today's wires are good. However, wireless are not.
 * First, We will deal ideal case, A(sender) know whether B(receiver) got it
   * $$S = \sum x f(x) \\ = (1 - q) (\text{ first transmission is success }) + 2 q (1-q) (\text { first is failed and second is success. }) + 3 q^2(1-q) + ... $$
   * $$S = (1 - q) + 2 q(1-q) + 3 q^2(1-q) + ... \\ qS = q(1-q) + 2q^2(1-q) + ... \\ (1 - q) S = (1-q) + q(1-q) + q^2(1-q) + ... \\ lim_{n -> \infty} \frac{(1-q) (q - (1-q)^2)}{1-q} = 1$$
   * $$S = \frac{1}{1-q} = ETX$$
   * ex. q = 0.5 -> ETX = 2
   * ex. $$q = 0.1 -> ETX = 1/0.9 \approx 1.1$$
 * More realistic case
   * (A->B) ok && (B->A) ok = (1-q)^2
   * (A->B) x && (no reply) = q
   * (A->B) ok && (B->A) x = (1-q)q

#### Packet loss (at the queue)
 * Queue (aka buffer) preceding link in buffer has finite capacity
 * Packet arriving to full queue dropped(aka lost)
 * Main cause of loss in most networks, including the Internet

#### What can you  do about loss?
 * Lost packet may be retransmitted by previous node, by source end system or not at all.

#### Throuput
 * throuput : rate (bits/ time unit) at which bits are transferred between sender/receiver:
   * instaneous : rate at given point in time
   * average : rate over longer period of time
 * bottleneck link:
   * link on end-to-end path that constrains end-to-end throughput

### Chapter 1.5 protocol layers, service models
#### Protocol "layers"
 * Networks are complex, with many "pieces":
   * Hosts, routers, links of various media, applications, protocols, hardware, software, etc.
 * Layers:
   * Each layer implements a service (to the layer above)
   * Via its own internal-layer actions
   * Relying on services provided by layer below
 * Why layering?:
   * Dealing with complex systems : explicit structure allows identification, relationship of complex system's pieces
   * Modularization eases maintenance, updating of system : change of implementation of lyaer's service transparent to rest of system

#### Abstraction
 * Abstraction helps us deal with complexity:
   * Enablue modular design
   * Hide lower-elvel detail and implementation
   * Allow different implementations of the same abstraction
 * In networking, "layering" is the key abstraction:
   * Lower layer provides 'service' to the upper layer
   * Higher layer 'uses' the lower layer's service

#### OSI 7-Layer Model/Architecture
 * Open Systems Interconnect (OSI) Architecture
   * International Standards Organization (ISO)
   * OSI Reference Model
     * Application : supporting network applications
     * Presentation : allow applications to interpret meaning of data
     * Session : synchronization, checkpointing, recovery of data exchange
     * Transport : process-to-process data transfer
     * Network : routing of datagrams from source to destination
     * Link : data transfer between neighboring network elements
     * Physical : bits "on the wire"

#### Internet protocol stack
 * Internet's 5-layer Architecture
 * Internet stack "missing" two layers:
   * Application : HTTP, FTP, SMTP, etc.
   * Transport : TCP, UDP
   * Network : IP, routing protocols
   * Link : Ethernet, 802.11, etc.
   * Physical : copper, fiber, RF, etc.

#### Narrow Waist Model
 * Goal : Interconnection:
   * Interconnect many existing networks.
   * Hide underlying technology from applications

#### From the Application Layer's perspective
 * Socket API of the transport layer (e.g. TCP or UDP) provides data delivery services to the application

#### From the Transport Layer's perspective
 * Transport layer uses the network layer (IP) to reach the destination host (IP address), and use port number to identify its session/application

#### From the Network Layer's perspective
 * Network layer sends packest to the destination, end-to-end
   * while doing so, it may need to know a little about the next router

#### From the Link Layer's perspective
 * Link layer sends packets (frames) to, and receives from, the next hop device.
   * To do so, may need to translate IP address to MAC address (a.k.a HW addr) -> ARP!

#### Packet Encapsulation
 * Application : Application message
 * Transport : TCP/UDP Header(src port number, dst port number and other info) + TCP or UDP payload = TCP or UDP segment
 * Network : IP Header(IP src address, IP dst address and other info) + IP payload = IP datagram
 * Link : Link Header(link src address, link dst address and other info) + Link payload = Link frame

## Chapter 2. Application Layer
### Chapter 2.1 Principles of network applications
#### Creating a network app
 * write programs that:
   * run on (different) end systems
   * communicate over network
 * no need to write software for network-core devices:
   * network-core devices do not run user applications
   * applications on end systems allows for rapid app devlopment, propagation

#### Client-Server architecture
 * server:
   * always-on host
   * permanent IP address
   * data centers for scaling
 * clients:
   * communicate with server
   * may be intermittently connected
   * may have dynamic IP addresses
   * do not communicate directly with each other

#### P2P architecture
 * arbitrary end systems directly communicate:
   * any host can be a server and a client at the same time
   * no always-on server
 * peers request service from other peers, provide service in return to other peers:
   * self scalability - new peers bring new service capacity, as well as new service demands
 * peers are intermittently connected and change IP addresses
   * complex management

#### Processes communicating
 * Process - program running withing a host:
   * within same host, two processes communicate using inter-process communication
   * processes in different hosts communicate by exchanging messages
   * within same host, two processes can communicate using messages as well
 * Client, server:
   * client process: process that initiates communication
   * server process: process that waits to be contacted
 * Applications with P2P architectures usually have client processes & server processes

#### Socket
 * Process sends/receives messages to/from its socket
 * Socket analogous to door:
   * sending process shoves message out door
   * sending process relies on transport infrastructure on other side of door to deliver message to socket at receiving process

#### Addressing processes
 * To receive messages, process must have identifier
 * Identifier includes both IP address and port numbers associated with process on host

#### Application layer protocol
 * Application layer protocol defines:
   * Types of messages exchanged:
     * e.g. request, response
   * Message syntax:
     * what fields in messages & how fields are delineated
   * Message semantics:
     * meaning of information in fields
   * Rules for when and how processes send & respond to messages
 * Not all applications use standard protocols:
   * Open/standard protocols:
     * defined in RFC. allows for interoperability
   * Properietary protocols:
     * Skype

#### What transport service does an app ndeed?
 * Reliable delivery (a.k.a. reliability, data integrity)
   * some apps (e.g., file transfer, web transactions) require 100% reliable data transfer
   * other apps (e.g., audio) can tolerate some loss
   * Also, related to (but not same as) "in-order delivery"
 * Timing:
   * some apps (e.g., Internet telephony, interactive games) require low delay to be "effective"
   * well, timing is not really delay. timing is more about variation in delay
 * Throuput:
   * some apps(e.g., multimedia) require miniumum amount of throughput to be "effective"
   * other apps("elastic apps") make use of whatever throughput they get
 * Security:
   * encryption, data integrity,

#### Delay, Timing, Throughput, In-order, Outstanding...
 * Delay : Sender <-> Receiver
 * Timing : 도착하는 순서
 * Throughput : 얼마나 많이 보내는가

#### Internet transport protocols services
 * TCP service:
   * reliable transport between sending and receiving process
   * flow control : sender won't overwhelm receiver
   * congestion control: throttle sender when network overloaded
   * does not provide: timing, minimum throughput guarantee, security
   * connection-oriented: setup required between client and server processes
 * UDP service:
   * unreliable data transfer between sending and receiving process
   * does not provide: reliability, flow control, congestion control, timing, throughput guarntee, security, or connection setup

#### Securing TCP
 * TCP & UDP:
   * no encryption
   * cleartext passwords sent into socket traverse Internet in cleartext
 * SSL:
   * provides encrypted TCP connection
   * data integrity
   * end-point authentication
 * SSL is at application layer:
   * applications use SSL libraries, that "talk" to TCP
 * SSL socket API:
   * cleartext passwords sent into socket traverse Internet encrypted

### Chapter 2.7 Socket programming with UDP and TCP
#### Socket programming
 * Goal: learn how to build client/server applications that communicate using sockets
 * Socket: door between application process and end-end-transport protocol

#### Socket programming with UDP
 * UDP: no "connection" between client & server:
   * no handshaking before sending data
   * sender explicitly attaches destination IP address and port number to each packet
   * receiver extracts sender IP address and port number from received packet
   * transmitted data may be lost or received out-of-order
 * Application viewpoint:
   * UDP provides unreliable transfer of groups of bytes ("datgrams") between client and server

### Chapter 2.2 Web and HTTP
#### Web and HTTP
 * web page consists of objects
 * object can be HTML file, JPEG image, Java applet, audio file,...
 * web page consists of base HTML-file which includes serveral referenced objects
 * each object is addressable by a URL

#### HTTP overview
 * HTTP: hypertext transfer protocol
   * Web's application layer protocol
 * client/server model:
   * client: browser that requests, receives, (using HTTP protocol) and "displays" Web objects
   * server: Web server sends (using HTTP protocol) objects in reponse to requests
 * Uses TCP:
   * client initiates TCP connection (creates socket) to server, port 80
   * server accepts TCP connection from client
   * HTTP messages (application-layer protocol messages) exchanged between browser (HTTP sclient) and Web server(HTTP server)
   * TCP connection closed
 * HTTP is "stateless":
   * Server maintins no information about past client requests:
     * I mean, HTTP is stateless. This does not mean that web server or browser is stateless.

#### HTTP connections
 * Non-persistent HTTP:
   * at most one object sent over TCP connection:
     * connection then closed
   * downloading multiple objects required multiple connections
 * Persistent HTTP:
   * multiple ojbects can be sent over single TCP connection between client, server

#### Non-persistent HTTP: response time
 * RTT (round-trip time):
   * time for a small packet to travel from client to server and back
 * HTTP response time:
   * 2 * RTT + file transmission time:
     * one RTT to initiate TCP connection
     * one RTT for HTTP request and first few bytes of HTTP response to return
     * file transmission time

#### Persistent
 * Non-persistent HTTP issues:
   * requires 2 RTTs per object
   * OS overhead for each TCP connection
   * browser often open parallel TCP connections to fetch referenced objects
 * Persistent HTTP:
   * server leaves connection open after sending reponse
   * subsequent HTTP messages between same client/server sent over open connection
   * client sends requests as soon as it encounters a referenced object
   * as little as one RTT for all the refernced objects

#### HTTP request message
 * Two types of HTTP messages: request, response
 * HTTP request message: ASCII

#### Uploading form input
 * POST method:
   * web page often includes form input
   * input is uploaded to server in entity body
 * URL method:
   * uses GET method
   * input is uploaded in URL field of request line

#### HTTP response status codes
 * Status code appears in 1st line in server-to-client reposne message
 * Some sample codes:
   * 200 OK:
     * request succeeded, requested object later in this msg
   * 301 Moved Permantely:
     * requested object moved, net location specified later in this msg
   * 400 Bad Request:
     * request msg not understood by server
   * 404 Not Found:
     * requested document not found on this server
   * 505 HTTP Version Not Supported

#### User-server state: cookies
 * Four components:
   * cookie header line in HTTP response message
   * cookie header line in next HTTp request message
   * cookie file kept on user's host, managed by user's browser
   * backend database at Web site
 * What cookies can be used for:
   * authorization, etc.
 * How to keep "state":
   * protocol endpoints: maintain state at sender/receiver over multiple transactions
   * cookies: http messages carry state
 * Cookies and privacy:
   * cookies permit sites to learn a lot about you
   * you may supply name and email to sites

#### Web caches (proxy server)
 * goal : satisfy client request without involving origin server
 * user sets browser: Web accesses via cache
 * browser sends all HTTP requests to cache

 * typically cache is installed by ISP

#### Conditional GET
 * Goal: don't send object if cache has up-to-date cached version
   * no object transmission dealy
   * lower link utilization
 * cache: specify date of cached copy in HTTp request
 * server: reponse contains no object if cached copy is up-to-date

### Chapter 2.3 electronic mail (SMTP, POP3, IMAP)
 * SMTP: delivery/storage to receiver's server
 * mail access protocol: retrieval from server
   * POP- Post Office Protocol : authorization, download
   * IMAP- Internet Mail Access Protocol : more features, including manipulation of stored messages on server

### Chapter 2.4 DNS
#### DNS: domain name system
 * Internet hosts, routers:
   * IP address (32 bit) : used for addressing datagrams
   * name : used by humans
 * Domain Name System:
   * Distributed database implemented in hierarchy of many name servers
   * Application-layer protocol: hosts, name servers communicated to resolve names

#### DNS: services, structure
 * DNS services:
   * hostname to IP address translation
   * host aliasing
   * mail server aliasing
   * load distribution
 * Why not centralize DNS?:
   * single point of failure
   * traffic volume
   * distance centralized database
   * maintenance

#### DNS: a distributed, hierarchical database
#### TLD, authoritative, local servers
 * Top-level domain (TLD) servers:
   * Responsible for com ... and all top-level country domains
   * Network Solutions maintains servers for .com TLD
 * Authoritative DNS server:
   * Organization's own DNS server(s), providing authoritative bhostname to IP mappings for organizations' named hosts
   * Can be maintained by organization or service prodier
 * Local DNS name server:
   * Does not strictly belong to hierarchy
   * Each ISP (resiendtial ISP, company, university) has one
   * When host makes DNS query, query is sent to its local DNS server

#### DNS name resolution example
 * Two approaches:
   * iterated query
   * recursive query
 * iterated query:
   * contacted server replies with name of server to contact
 * recursive query

#### DNS: caching, updating, inserting records
 * Once (any) name server learns mapping, it caches mapping
   * Cache entries timeout (disappear) after some time(TTL)
   * TLD servers typically cached in local name servers
 * Cached entries may be out-of-date (best effort name-to-address translation!)
   * If name host changes IP address, may not be known Internet-wide until all TTLs expire

## Chapter 3. Transport Layer
### Chatper 3.1 Transport-layer services
#### Transport services and protocols
 * Provide logical end-to-end communication between application "processes" running on different hosts
   * as if connected directly...
   * trasnport layer "uses" the network layer
     * network layer "provides" logical end-to-end communication between "hosts"
 * Transport protocols run in end systems:
   * send side: breaks app messages into segments, passes to network layer
   * receive side: reassembles segments into messages, passes to application layer
 * More than one transport protocol may be avilable to apps

#### Transport vs. Network layer
 * Network layer: logical communication between "hosts"
 * Transport layer: logical communication between "processes"
   * relies on, and enhances, network layer services

#### Internet trasnport-layer protocols
 * TCP:
   * Reliable, in-order delivery:
     * connection setup
     * reliable data transfer
     * congestion control
     * flow control

 * UDP:
   * Unreliable, unordered delivery:
     * no connection setup
     * no reliability
     * no congestion/flow control
   * no-frills extension of "best-effort" IP:
     * adds nothing much to IP

 * Both TCP and UDP:
   * provides:
     * multiplexing/demultiplexing : using port numbers
     * error checking: using checksum
   * do not provide:
     * delay guarantees
     * bandwidth guarantees
   * on top of the "IP" network layer:
     * which provides "best effort" (unreliable) delivery service

### Chapter 3.2 multiplexsing and demultiplexing
#### Multiplexing/demultiplexing
 * Extending host-to-host delivery service to process-to-process delivery service for applications running on the hosts
   * responsibility of delivering the data in segments to appropirate application process
   * we'll talk about the Internet, but same idea holds for other networks also.
 * Multiplexing at sender:
   * handle data from multiple sockets, add transport header (later used for demultiplexing)
 * demultiplexing at receiver:
   * use header info to deliver received segments to correct socket

#### How demultiplexing works
 * Host receives IP datagrams
   * Each datagram has:
     * source IP address, destination IP address,
     * and one transport-layer segment
   * Each segment has:
     * source port number, destination port number
 * When receiver host receives a segment:
   * network layer checks the IP addresses,
   * transport layer checks the port numbers
 * Port numbers: 16bits

#### Connectionless vs. Connection-oriented demux
 * UDP (connectionless)
   * a socket has host-local port#, but no destination port#:
     * server & client
   * When creating datagram to send into UDP socket, must sepcify:
     * destination IP address
     * destination port #
 * TCP (connection-oriented)
   * a socket identified by 4-tuple: `[src iIP, src port, dst IP, dst port]`
   * server host may support many simultaneous TCP sockets:
     * Each socket identified by its own 4-tuple (different src means different socket)

### Chapter 3.3 connectionless transport:UDP
#### UDP: User Datagram Protocol
 * "Bare bones" Internet transport protocol:
   * (almost) direct use of IP.
   * nothing much added. only port numbers, length, and checksum
 * "Best effort" service:
   * UDP segments may be lost or delivered out-of-order to app
 * Connectionless:
   * no handshaking between UDP sender, receiver
   * each UDP segment handled independently of others
 * UDP used by,
   * DNS, SNMP, streaming multimedia pps, Internet telephone, etc.
   * loss tolerant, rate & delay sensitive apps

#### Why is there UDP? Why do we need UDP?
 * Simple, light, and easy!
   * no connection establishment
   * no connection state at sender, receiver
   * small header size
   * no congestion control (or flow control)
   * better application level control over what data is sent and when!
 * What if you lose data?:
   * UDP does not know
 * Reliable transfer over UDP?

#### checksum
 * Goal: detect "errors" in transmitted segment
 * Sender:
   * treat segment contents, including header fields, as sequence of 16-bit integers
   * checksum: one's complement of sum of segment contents
   * sender puts checksum value into UDP checksum field
 * Receiver:
   * compute checksum of received segment
   * check if computed checksum equals checksum field value:
     * No - error detected
     * YES - no error detected. But maybe errors nonetheless?

### Chapter 3.4 principles of reliable data transfer
#### Principles of reliable data transfer
 * Important in application, transport, link layers
 * Upper layer "uses" lower layer channel
   * if the lower layer is reliable, nothing to do in the upper layer
   * if the lower layer is unreliable, need to do some work
 * Where to put the reliability?:
   * Application layer does not need reliable data transfer -> nothing to do.
   * Application layer needs reliable data transfer
 * `rdt_send()`, `udt_send()`, `rdt_rcv()`, `deliver_data()`

#### Basic primitives
 * Error detection
 * ACK
 * NACK
 * Loss detection
 * Retransmission
 * Timeout
 * Sequence number

#### Simple scenario
 * Let's say, the packet error rate of a transmission is `p`
 * ETX : Expected Transmission Count : `1 / (1 - p)^2`

#### ACK (acknowledgement)
 * Let's say, the packet delivery success rate of a transmission is `p`
 * ETX of data transmission : `1 / p^2`
 * ETX of ack transmission : `1 / p`

#### NACK (negative ACK)
 * Notify the unsuccessful reception of packet

#### Timeout
 * After sending a packet, wait for a feedback (ACK or NACK), but waited too long do something.
 * need a countdown timer

#### ARQ (Automatic Reqpeat reQuest)
 * `Automatic Repeat reQuest` protocol:
   * a generic term
   * a protocol that automatically re-sends erroneous/corrupt/lost packets
   * uses techniques such as ACK, NACk, timeout, retransmission, sequence number, etc.

#### Example rdt2.0 design
 * Assumption:
   * Undelying channel may flip bits in packet:
     * checksum to detect bit errors
   * No packet loss (unrelistic assumption for simplicity) for now
 * Mechanisms needed in rdt2.0:
   * error detection
   * feedback: control messages (ACK, NACK) from receiver to sender
