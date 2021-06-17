---
layout  : wiki
title   : 네트워크 응용 설계
summary : 네설 정리
date    : 2021-04-21 20:50:32 +0900
lastmod : 2021-06-17 06:26:17 +0900
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

#### What's the Internet: a service view
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

#### End-to-end principle
 * End-to-end arguments in system design
 * The End-to-end argument:
   * The function in question can completely and correctly be implemented only with the knowledge and help of the application standing at the end points of the communication system. Therefore, providing that questioned function as a featrue of the communication system itself is not possible (sometimes an incomplete version may be useful as a performance enhancement)

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

#### rdt2.0 has a fatal flaw
 * What happens if ACK/NAK corrupted?:
   * sender doesn't know what happend at receiver
   * retransmit -> possible duplicate packe:
     * does not know whether this is retransmission or new packet
 * Handling duplicates:
   * sender retransmits current packet if ACK/NAK corrupted
   * sender adds "sequence number" to each packet
   * receiver discards (doesn't deliver up) duplicate packet
 * rdt2.0 is a "Stop and wait" protocol:
   * sender sends one packet, then waits for receiver response (ACK)

#### rdt2.1: discussion
 * sender:
   * sequence number added to packet
   * two sequnce numbers (0, 1) will surfice.
   * must check if received ACK/NACK corrupted
   * twice as many states:
     * state must remember whether expected packet should have seq# of 0 or 1
 * receiver:
   * must check if recieved packet is duplicate:
     * state indicates whether 0 or 1 is expected packet seq#
   * note: receiver cnanot know if its last ACK/NAK received OK at sender

#### rdt2.2 : a NAK-free protocol
 * sam functionality as rdt2.1, using ACKs only
 * instead of NAK, receiver sends ACK for last pkt received OK
 * duplicate ACK at sender results in same action as NAK; retransmit current pkt

#### rdt3.0 : channels with errors and loss
 * New assumption: underlying channel can also lose packets:
   * data packest or ACK packets
 * Approach: sender waits "reasonable" amount of time for ACK:
   * retransmits if no ACK received in this time (timeout)
   * if packet (or ACK) just delayed (not lost):
     * retransmission will be duplicate, but seq # is already handles this
     * receiver must specify seq # of pakcet being ACK
   * requires countdown timer

#### How to decide the time for timeout?
 * If too long, wate a lot of time -> slow:
   * If a packet is lost, better to retransmit as quickly as possible
 * If too short, many duplicates:
   * waste of time, bandwidth, energy, etc.
   * may add to packets to already congested network
 * For a single link, not too diffiult. However a challening problem for end-to-end over a network

#### Performance of rdt3.0
 * rdt3.0 is correct, but performance stinks because it is a 'stop-and-wait' protocol:
   * network protocol limits use of physical resources
   * utilization = (l/r) / (rtt + l/r)

#### Additional primitives
 * CACK:
   * cumulative acknowledgement
 * Pipeline
 * Window:
   * a range of things that are in progress
 * Sender/Receiver Buffer:
   * memory for storing packets that are not finished
 * SACK:
   * selective acknowledgement

#### Pipelined protocols
 * pipelining: sender allows multiple, "in-flight", yet-to-be-acknowledged packets:
   * range of sequnce numbers must be increased
   * buffering at sender and/or/ receiver
 * two generic forms of pipelined protocols:
   * go-back-n, selective repeat

#### Pipelined protocols: overview
 * Go-back-N:
   * sender can have up to N unakced pakcets in pipeline
   * receiver only sends cumulative ack:
     * does not ack packt if there is a gap
   * sender has timer for oldest unacked packet:
     * when timer expires, retransmit all unacked packets
 * Selective Repeat:
   * sender can have up to N unakced packets in pipeline
   * receiver sends individual ack for each packet
   * sender maintians timer for each unacked packet:
     * when timer expires, retransmit only that unacked packet

#### Go-Back-N:sender
 * windows of up to N, consecutive unacked pakcets allowd:
   * sliding window protocol
 * need k-bit sequnce number in pakcet header where 2^k >> N
 * timer for oldest in flight packet
 * ACK(n):
   * ACKs all packets up to, including seq # n - "cumulative ACK"
   * may receive duplicate ACKs
 * timeout(n):
   * retransmit pakcet n and all higher seq # pakcets in window

#### Go-Back-N-receiver
 * ACK-only: always send ACK for correctly-received packet with highest in-order seq#:
   * may generate duplicate ACKs
   * need only remember expected seq #
 * out-of-order packet:
   * discard(don't buffer): no receiver buffering
   * re-ACK packets with highest in-order seq#

#### Selective repeat
 * receiver individually acknowledges all correclty received packets:
   * buffers packets, as needed, for eventual in-order delivery to upper layer
 * sender only resends packets for which ACK not received:
   * sender timer for each unACKed packet
 * sender window:
   * N consecutive seq #'s
   * limits seq #'s of sent, unACKed packets

 * sender:
   * data from above:
     * if next available seq # in window, send pkt
   * timeout(n):
     * resend pkt n, restart timer
   * ACK(n) in [sendbase, sendbase +N]:
     * mark pkt n as received
     * if n smallest unACKed pkt, advance window base to next unACKed seq#
 * receiver:
   * pkt n in [rcvbase, rcvbase + N - 1]:
     * send ACK(n)
     * out-of-order: buffer
     * in-order: deliver (also deliver buffered, in-order pkts), advance window to next not-yet-received pkt
   * pkt n in [rcvbase-N, rcvbase - 1]:
     * ACK(n)
   * otherwise:
     * ignore

#### Selecitve repeat: dilemma
 * Receiver sees no differnce in two scenarios:
   * retransmission vs new 0 pakcet
 * 2^k >= 2 * N

#### Final note on reliable data transfer
 * You send someting and want to receive everything correctly, without errors, in-order:
   * Important in application, transport, link layers
 * Upper layer uses lower layer channel:
   * if the lower layer is reliable, nothing to do in the upper layer
   * if the lower layer is unreliable, need to do some work:
     * Characteristics of unreliable lower layer will determine complexity of reliable data transfer protocol
 * What can go wrong in unreliable channel:
   * may hav ebit erros in packet
   * may not receive the packet at all (packet loss)
 * How to recover from errors:
   * Error detection, ACK, NACK, Loss detection, Retransmission, Timeout, Sequence number
   * CACK, pipelining, Window, Sender/Receiver Buffer, SAK

### Chapter 3.5 connection-oriented transport: TCPA
 * Connection-oriented:
   * handshaking (exchange of control messages) initializes sender, receiver state/parameters before data exchange
   * logical end-to-end connection, not a real circuit like phone line
 * Point-to-point
 * Full duplex data:
   * bi-directional data flow in same connection
 * Flow controlled:
   * sender will not overwhelm receiver
 * Reliable, in-order byte stream:
   * no message boundaries
   * message broken down and sent using TCP segments
 * Pipelined:
   * TCP congestion and flow control set window size

#### Many flavors of TCP
 * TCP has many variants:
   * TCP hahoe
   * TCP (new) Reno
   * TCP Vegas, TCP Westwood, TCP BIC
   * TCP CUBIC

#### TCP segment structure
 * source port number (16 bits)
 * destination port number (16 bits)
 * sequence number (32 bits)
 * acknowledgement number (32bits)
 * header length (5 bits)
 * not used (5 bits)
 * URG: urgent data (1 bit)
 * ACK: ACK number valid (1 bit)
 * PSH : push data now, generally not used (1bit)
 * RST, SYN, FIN: connection establish (setup, teardown commands)  (1, 1, 1-> 3 bits)
 * receive window (16bits)
 * checksum (16bits)
 * Urg data pointer (16bits)
 * options (variable length)
 * application data(variable length)

#### TCP sequence number, ACK numbers
 * Example : send 500 KB message, MSS = 1000 bytes:
   * total 500KB / 1 KB = 500 segments
   * 1st segment data : 0 ~ 999 seq
   * 2nd segment data : 1000 ~ 1999 seq
   * 500th segment data : 499000 ~ 49999 seq
 * seqence number:
   * byte stream "number" of first byte in segment's data
 * acknowledgement number:
   * sequence number of next byte expected from other side
   * cumulative ACK
 * A packet has both sequence number and ack number:
   * can use data packet for ACK
   * full-duplex
 * Actually, we don't start from 0, instead start from a random number

#### TCP round trip time, timeout
 * TCP retransmits after timout to recover from packet loss
 * longer than RTT:
   * but RTT varies
 * too short: premature timeout, unncessary retransmissions
 * too long : slow reaction to segment loss

 * SampleRTT : mesuared time from segment transmission until ACK receipt:
   * ignore retransmissions
   * usually only one SampleRTT at a time
 * Sample RTT will vary, want estimated RTT smoother

 * Exponential Weighted Moving Average (EWMA):
   * EstimatedRTT = (1-a)*EstimatedRTT + a * SampleRTT
   * influence of past sample decreases exponentially fast
   * typical value of a = 0.125

 * Timeout interval : EstimatedRTT plus safety margin
 * Estimated Sample deviation from EstimatedRTT:
   * DevRTT = (1-b) * DevRTT + b * |SampleRTT - EstimatedRTT|
   * typically b = 0.25
 * Then, the TimeoutInterval of TCP:
   * TimeoutInterval = EstimatedRTT + 4 * DevRTT

### Chapter 3.5 - 2 TCP- reliable data transfer
#### TCP reliable data transfer
 * Recall the IP is unreliable:
   * data can be corrupted, lost, dropped due to queue overflow, or out-of-order
 * TCP creates reliable data transfer service on top of IP's unreliable service:
   * Byte stream received is exactly what was sent:
     * uncorrupted, without gaps, without duplication, in sequence
   * Using:
     * pipelined segments
     * cumulative acks
     * single retransmission timer
   * Retransmissions are triggered by:
     * timeout events
     * duplicate acks
   * For simplicity of undertanding, let's initially consider simplified TCP sender:
     * ignore duplicate acks
     * ignore flow control, congestion controler
     * one sender -> one receiver

#### TCP sender events
 * Data received from app:
   * create segment with sequence number:
     * sequence number is byte-stream number of first data byte in segment
   * start timer if not already running:
     * think of timer as for oldest unacked segment
     * expiration interval: TimeOutInterval
 * Timeout:
   * retransmit segment that caused timeout
   * restart timer:
     * with double the timeout interval
 * ACK received:
   * if ACK number received acknowledges previously unacked segments:
     * update what is known to be ACKed
     * start timer if there are still unacked segments
   * If ACK number received acknowledges previously acked segments:
     * duplicate ACK

#### TCP ACK generation
 * They are Event at receiver -> TCP receiver action form.
 * arrival of in-order segment iwth expected seq #. All data up to expected seq# already ACKed -> delayed ACK. Wait up to 500ms for next segment. If no next segment, send ACK
 * arrival of in-order segment with expected seq #. One other segment has ACK pending -> immediately send single cumulative ACK, ACKing both in-order segments
 * arrival of out-of-order segment higher-than expect seq #. Gap detected -> immediately send duplciate ACK, indicating seq. # of next expected byte
 * arrival of segment that partially or completely fills gap -> immediate send ACK, provided that segment starts at lower end of gap

#### TCP fast retransmit
 * Problem: Timeout period often relatively long:
   * long delay before resending lost packet
 * Idea: Detect lost segments via duplicate ACKs:
   * sender often sends many segments back-to-back
   * if segment is lost, there will likely be many duplciate ACKs
 * TCP fast retransmit:
   * if sender receives 3 ACKs for same data
   * resend unacked segment with smallest sequence number
   * likely that unacked segment lost, so don't wait for timeout

### Chatper 3.5-3 TCP - flow control
#### TCP flow control
 * Sender should not send too fast
 * Receivr controls sender, so sender won't overflow receiver's buffer by transmitting too much, too fast

 * receiver advertises free buffer space by including rwnd value in TCP header of receiver-to-sender segments:
   * RcvBuffer size set via socket options (typical default is 4096 bytes)
   * many operating systems autoadjust RcvBuffer
 * sender limits amount of unacked("in-flight") data to receiver's rwnd value
 * gurantees receiver buffer will not overflow

### Chapter 3.5 - 5 TCP -connection management
#### Connection Management
 * Before exchanging data, sender/receiver "handshake":
   * agree to establish connection (each knowing the other willing to estabilish connection)
   * agree on connection parameters

#### TCP 3-way handshake
 * The first packet SYNbit = 1, Seq =x
 * The second packet (ACK about first) : SYNbit =1, Seq=y, ACKbit=1; ACKnum=x+1
 * The third packet : ACKbit=1, ACKnum=y+1, optional data

#### TCP closing a connection
 * client, server each close thier side of connection:
   * send TCP segment with FIN bit = 1
 * respond to received FIN with ACK
 * simulatneous FIN exchanges can be handled

### Chatper 3.6 principles of congestion control
#### Principles of congestion control
 * Congestion:
   * informally : "too many sources sending too much data too fast for network to handle"
   * different from flow control
   * manifestations:
     * lost packest (buffer overflow at routers)
     * long delays (queuign in router buffers)

 * a router has finite buffers
 * In real world, retransmissions make a router slow down

### Chapter 3.7 TCP congestion control
 * If there is congestion, reduce rate:
   * to avoid/mitigate/eliminate congestion
 * if there is no congestion, increase rate:
   * to better utilize the bandwidth

#### TCP's congestion control: keywords
 * Key states & mechanisms:
   * slow start - expoential increase of sending rate
   * congestion avoidance - AIMD (Additive Increase Multiplicative Decrease)
   * fast recovery
 * Key parameters:
   * congestion window: cwnd
   * slow-start  threshhold:ssthresh
   * MSS, RTT
 * Key events:
   * ACK received - which means things are good
   * timeout - which means something is very bad
   * 3 duplicate ACK received - bad

#### TCP Congestion Window
 * Sender limit transmissions:
   * LastByteSent - LastByteAcked <= cwnd
 * cwnd is dynamic, funciton of perceived network congestion
 * TCP sending rate:
   * roughly: send cwnd bytes, wait RTT for ACKS, then send more bytes:
     * rate = cwnd/RTT (bytes/sec)

#### TCP Slow Start
 * When connection begins, increase rate exponentially until first loss event:
   * initially cwnd = 1 MSS
   * double cwnd every RTT
 * initial rate is slow but ramps up exponentially fast
 * Come back to slow start after every timeout event
 * Goest into fast recovery after every 3 dup ACK event

#### TCP: detecting conegestion, reacting to loss
 * Detect congestion based on (inferred) packet loss:
   * Loss inferred by 'timeout' or '3 duplicate ACKs'
 * Loss indicated by timeout:
   * similar to going back to slow start:
     * cwnd set to 1 MSS:
       * window then grows expoentially (as in slow start) to a threshold ssthresh
   * then grows linearly (go to congestion avoidance state)
 * Loss indicated by 3 duplicate ACKs:
   * dup ACKs indicate network capable of delivering some segments
   * cwnd is cut in half window,
   * then grows linearly (go into congestion avoidance state)
   * This is for TCP reno or TCP New Reno:
     * TCP Tahoe always set cwnd to 1(timeout or 3 duplicate acks)

#### TCP congestion avoidance:AIMD
 * Approach: sender increases transmission rate (window size), probing for usable bandwidth, until loss occurs:
   * additive increase: increase cwnd by 1 MSS every RTT until loss detected
   * multiplicate decrease: cut cwnd in half after a loss

 * Actually, when loss indicated by 3 duplicate ACKs:
   * dup ACKs indicate network capable of delivering some segments:
     * Receiver received 3 more packets after the loss
   * cwnd is cut in half window plus 3
   * then grows linearly
   * This is for TCP Reno or TCP New Reno

#### TCP throughput
 * average TCP throughput as function of window size, RTT?:
   * ignore slow start, assume always data to send
 * average TCP throughput = 3/4 W/RTT

#### TCP Futures: TCP over "long, fat pipes"
 * throughput in terms of segment loss probiablity:
   * TCP throughput = 1.22 MSS / (RTT \sqrt(L))

#### TCP Fairness
 * fairness goal: if K TCP sessions share same bottleneck link of bandwidth R, each should have average rate of R/K
 * Fairness and UDP:
   * multimedia apps often do not use TCP
 * Fairness, parallel TCP connections:
   * application can open multiple parallel connections between two hosts

#### Explicit Congestion Notification (ECN)
 * network-assited congestion control:
   * two bits in IP header (ToS field) marked by network router to indicate congestion
   * congestion indication carried to receiving host
   * receiver (seeing congestion indication in IP datagram) sets ECE bit on receiver-to-sender ACK segment to notify sender of congestion


## Chapter 4. Network Layer
### Transport vs. Network layer
 * Network layer : logical communication between hosts
 * Transport layer : logical communication between processes

### Chapter 4.1 Overview of Network  Layer
#### Network layer
 * Transport segment from sending host to receiving host
 * Sending side encapsulates segments into datagrams
 * Receiving side delivers segments to transport layer
 * Network layer protocols in every host, router
 * Router examines header fields in all IP datagrams passing through it

#### Two key network-layer functions
 * Network-layer functions:
   * forwarding : move packets from router's input link interface to appropriate router output link interface:
     * data plan, per router
     * typically implemented in HW (timescale:nanosecond)
     * use 'forwarding table'
     * may drop or duplicate packets
   * routing : determin route(thus path)taken by packets from osurce to destination:
     * control plan, network-wide process
     * routing algorithms:
       * decides which way to forward -> determines forwarding table
     * typically implemented in SW

#### Network layer: dataplan, control plan
 * Data plan:
   * local, per-router function
   * determines how datagram arriving on router input port is forwarded to router output port
   * forwarding function
   * uses forwarding table
 * Control plan:
   * network-wide logic
   * determines how datagram is routed among routers along end-end path from source host to destination host
   * sets the forwarding table
 * two control-plan approaches:
   * traditional routing algorithms: implemented in routers
   * software-defined networking (SDN) : implemented in (remote) servers/controllers

#### Per-router control plan
 * Individual routing algorithm components in each an every router interact in the control plan

#### Logically centralized control model
 * A distinct (typically remote) controller interacts with logcal control agents (CAs)

### Chapter 4.2 What's inside a router
#### Router architecture overview
 * routing, management control plan (software)
 * forwarding data plan(hardware)
 * forwording table is copied from the routing processor to the line cards over a separate bus(e.g. PCI)
 * with shadow copy at each line card, forwarding decisions can be made locally at each input port without invoking the centralized routing processor on a per-packet basis

#### Input port functions
 * Physical layer:
   * bit-level reception
 * Data link layer:
   * Ethernet
 * Decentralized switching:
   * using header field values, lookup output port using forwarding table in input port memory:
     * destination-based forwarding: forawrd based only on destination IP address (traditional)
     * generalized forwarding: forward based on any set of header field values
   * goal: complete input port processing at line speed
   * queuing : if datagrams arrive faster than forwarding rate into switch fabric

#### Longest prefix mathcing
 * Longest prefix matching :
   * when looking for forwarding table entry for given destination address, use longest address prefix that matches destination address
 * Must be performed in nanoseconds
 * Often performed using ternary constant addressable memories (TCAMs):
   * content addressable: present address to TCAM: retrieve address in one clock cycle, regardless of table size
 * Once a packet's output port has been determined via the lookup, the packet can be sent into the switching fabric

#### Other functions in input port
 * other than output port lookup, queueing, and forwarding
 * physical- and link- layer processing
 * packet's version number, checksum, and TTL must be checked:
   * TTL and checksum must be re-written
 * coutners used for network management must be updated

#### Switching fabrics
 * Transfer packet from input buffer to appropriate output buffer
 * Switching rate: rate at which packets can be transfer from inputs to outputs:
   * often measured as multiple of input/output line rate
   * N inputs: switching rate N tiems line rate desirable
 * Three types of switching fabrics:
   * memory, bus, crossbar

#### Input port queuing
 * Fabric slower than input ports combined -> queueing may occure at input queues:
   * queuing delay and loss due to input buffer overflow
 * Head-of-the-Line (HOL) blocking: queued datagram at front of queue prevents others in queue from moving forward:
   * even if other packet's output port is idle

#### Output Ports
 * Output port takes packets that have been stored in the output port's memory and transmits them over the output link
 * buffering required when datagrams arrive from fabric faster than the transmission rate:
   * Datagram (packets) can be lost due to congestion, lack of buffers
 * scheduling discipline chooses (selects) among queued pakcets and dequeue it for transmission:
   * Priority shceduling

#### Output port queueing/buffering
 * Buffering when arrival rate via switch exceeds output line speed:
   * Queueing delay and loss due to output port buffer overflow

#### Scheduling mechanisms
 * Scheduling : choose nextpacket to send on link
 * FIFO(first in first out) scheduling:
   * send in order of arrival to queue
   * discard policy :
     * tail drop: drop arriving packet
     * prioirty: drop/remove on priority basis
     * random: drop/remove randomly
     * other: e.g. RED (Random Early Detect)

#### Scheduling policies
 * Priority scheduling:
   * send higher priority queud packet first
   * multiple classes, with different priorities:
     * class may depend on marking or other header info

 * Round Robin (RR) scheduling:
   * multiple classes
   * cyclically scan class queues, sending one ocmplete packet from each clas (if available)
 * Weighted Fair queuing (WFQ):
   * generalized Round Robin
   * each class gets weighted amount of service in each cycle

### Chapter 4.3 IP: Internet Protocol
 * The Internet network layer:
   * routing protocols:
     * path selection
     * RIP, OSPF, BGP
   * IP protocol:
     * addressing conventions
     * datagram format
     * packet handling conventions
   * ICMP protocol:
     * error reporting
     * router "signaling"

#### IP datagram format
 * IP protocol version number (4bits)
 * header length (4bits)
 * type of service (8bits)
 * total datagram length (16bits)
 * 16-bit identifier (16bits)
 * flags (3bits)
 * fragment offset (13bits)
 * TTL : max number remaining hops (decremented at each router) (8bits)
 * protocol L upper layer protocol to deliver payload to (8bits)
 * header checksum (16bits)
 * 32 bit source IP address (32bits)
 * 32 bit address IP address (32bits)
 * options (if any)
 * datagram (variable length typically a TCP or UDP segment)
 * header size : 20 bytes of TCP, 20bytes of IP -> 40bytes

#### A few notes
 * TTL has many purposes, but the most important one is to ensure that datagrams do not circulate forever
 * Protocol is what connects network layer to transport layer:
   * e.g. ICMP = 1, TCP = 6, UDP = 17, IPv4 = 4, IPv6 = 41, etc.
 * Length is 16 bits, includes header + payload:
   * but IP pakcets are rarely over 1500 bytes because ethernet max size is 1518 bytes
 * Fragmentation
 * Internet checksum is for error checking in IP header:
   * must be re-computed at every router because of TTL
 * Options

#### IP fragmentation, reassembly
 * Network links has MTU:
   * MTU : maximum transfer unit - largest possible link-level frame
   * different link types, different MTUs
 * Large IP datagram divided("fragmented") within net:
   * one datagram becomes several datagrams
   * reassembled only at final destination
   * IP header bits used to identify, order related fragmentes

 * example:
   * 400 byte datagram
   * MTU = 1500 bytes
   * 1480 bytes per data (IP header)
   * Total 3 fragmentsA (1500, 1500, 1040)

#### IPv4 addressing
 * IP address: 32-bit identifier for host, router interface:
   * Must be globally unique
   * Usually written in dotted-decimal form
 * interface: connection between host/router and physical link:
   * router's typically have multiple interfaces
   * host typically has one or two interfaces
 * IP addresses associated with each interface

#### Subnet
 * IP address:
   * subnet part - high order bits
   * host part -low order bits
 * subnet:
   * device interfaces with same subnet part of IP address
   * can physically reach each other without intervening router
   * to determine the subnets:
     * detach each interface from its host or router, creating islands of isolated networks
     * each isolated network is called a subnet
   * For x.x.x.x/Y, /Y is the number of bits used for subnet address

#### IP addressing : CIDER
 * CIDR : Classless InterDomain Routing:
   * subnet portion of address of arbitrary length
   * address format:a.b.c.d/x, where x is # bits in subnet portion of address
 * Classful addressing?
 * Broken down CIDR

#### DHCP
 * Dynamic Host Configuration Protocol
 * Goal : allow host to dynamically obtains its IP address from network server when it joins network:
   * can renew its lease on address in use
   * allows reuse of addresses (only hold address hwile connected/on)
   * support for mobile users who want to join network
 * DCHP overview:
   * host broadcase DHCP discover msg (optional)
   * DHCP server espons with DHCP offer msg (optional)
   * host requests IP address : DHCP request msg
   * DHCP server sends address DHCP ack msg
 * DHCP can return more than just allocated IP address on subnet:
   * address of first-hop router for client
   * name and IP address of DNS server
   * network mast (indicatin network versus host portion of address)
 * DHCP request encapsulated in UDP

#### Hierarchical adressing
 * hierarchical addressing allows efficient advertisement of routing information

#### NAT: network address translation
 * Motivation:
   * local network uses just one IP address as far as outside world is concerned:
     * range of addresses not needed from ISP: just one IP address for all devices
     * can change addresses of devices in local network without notifying outside world
     * can change ISP without changing addresses of devices in local network
     * devices inside local net not explicitly addressable/visible by outside world (security)
 * Implementation: NAT router must:
   * outgoing datagrams:
     * replace (src IP addr, port #) of every outgoing datagram to (NAT IP addr, new port #)
     * remote machine will respond using (NAT IP addr, net port #) as destination addr
   * remember (in NAT translation table):
     * every (src IP addr, port #) to (NAT IP addr, new port #) translation pair
   * incoming datagrams:
     * replace (NAT IP addr, new port #) in dest fields of every incoming datagram with corresponding (src IP addr, port #) stored in NAT table

 * 16-bit port-number field:
   * 60,000 simulatenous connections with a single LAN-side address
 * NAT is controversial:
   * routers should only process up to layer 3
   * address shortable should be solved by IPv6
   * violates end-to-end argument:
     * NAT possibility must be taken into account by app designers
   * NAT traversal

#### IPv6
 * Initial motivation: 32bit address space soon to be completely allocated
 * Additional motivation:
   * header format helps speed processing/forwarding
   * header changes to facilitate QoS
 * IPv6 datagram format:
   * fixed-length 40 byte header
   * no fragmentation allowed

#### IPv6 datagram format
 * version
 * priority : identify priority among datagrams in flow
 * flow label: identify datagrams in sam flow
 * next header : identify upper layer protocol for data

#### Other changes from IPv4
 * checksum : remove entirely to reduce processing time at each op
 * options: allowed, but outside of ehader ,indicated by "Next Header" field
 * ICMPv6 : new version of ICMP:
   * additional message types, e.g. "Packet TOo Big"
   * multicast group management functions

#### Transition from IPv4 to IPv6
 * not all routers can be upgraded simultaneously:
   * no flag days
 * tunneling: IPv6 datagram carried as payload in IPv4 datagram among IPv4 routers

### Chapter 4.4 Generalized Forward and SDN
#### Generalized Forawrding and SDN
 * Each router contains a flow table that is computed and distributed by a logically centralized routing controller
