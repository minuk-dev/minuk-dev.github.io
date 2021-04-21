---
layout  : wiki
title   : 네트워크 응용 설계
summary : 네설 정리
date    : 2021-04-21 20:50:32 +0900
lastmod : 2021-04-21 23:53:28 +0900
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
