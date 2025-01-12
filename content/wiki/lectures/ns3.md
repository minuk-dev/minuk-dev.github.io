---
layout  : wiki
title   : Network Simulator 3
summary :
date    : 2021-05-07 08:59:07 +0900
lastmod : 2021-05-07 11:07:35 +0900
tags    : [wireless, ns3]
draft   : false
parent  : lectures/wireless
---

## Configuration
```bash
git clone https://github.com/nsnam/ns-3-dev-git.git --depth=1
cd ns-3-dev-git
./waf configure --enable-examples
./waf
```

## Basic
### Basic From
```cpp
#include "ns3/core-module.h"
#include "ns3/network-module.h"
#include "ns3/internet-module.h"
#include "ns3/point-to-point-module.h"
#include "ns3/applications-module.h"

using namespace ns3;

NS_LOG_COMPONENT_DEFINE ("LMU_FirstScriptExample");

int main (int argc, char *argv[]) {
  CommandLine cmd(__FILE__);
  cmd.Parse(argc, argv);

  /* 시간 정확도 설정 */
  Time::SetResolution (Time::NS);
  /* Log Level 설정 */
  LogComponentEnable("UdpEchoClientApplication", LOG_LEVEL_INFO);
  LogComponentEnable("UdpEchoServerApplication", LOG_LEVEL_INFO);

  /* Node 설정 */
  NodeContainer nodes;
  nodes.Create(2);

  PointToPointHelper pointToPoint;
  pointToPoint.SetDeviceAttribute("DataRate", StringValue("5Mbps"));
  pointToPoint.SetChannelAttribute("Delay", StringValue("2ms"));

  /* Network Device 설정 */
  NetDeviceContainer devices;
  devices = pointToPoint.Install(nodes);

  /* Internet Stack 설정 */
  InternetStackHelper stack;
  stack.Install(nodes);

  /* IP 할당 */
  Ipv4AddressHelper address;
  address.SetBase("10.1.1.0", "255.255.255.0");

  Ipv4InterfaceContainer interfaces = address.Assign (devices);

  /* Application 설정 */
  UdpEchoServerHelper echoServer(9);

  ApplicationContainer serverApps = echoServer.Install(nodes.Get(1));
  serverApps.Start (Seconds(1.0));
  serverApps.Stop (Seconds(10.0));

  UdpEchoClientHelper echoClient (interfaces.GetAddress(1), 9);
  echoClient.SetAttribute("MaxPackets", UintegerValue(1));
  echoClient.SetAttribute("Interval", TimeValue(Seconds(1.0)));
  echoClient.SetAttribute("PacketSize", UintegerValue(1024));

  ApplicationContainer clientApps = echoClient.Install (nodes.Get(0));

  /* 실행 */
  clientApps.Start (Seconds(2.0));
  clientApps.Stop (Seconds(10.0));

  Simulator::Run();
  Simulator::Destroy();

  return 0;
}
```


 * `NS_LOG_COMPONENT_DEFINE` in `ns/log.h`

```cpp
#define NS_LOG_COMPONENT_DEFINE(name)                           \
  static ns3::LogComponent g_log = ns3::LogComponent (name, __FILE__)
```

 * `CommandLine` class in `ns/command-line.h`

```cpp
/**
 * \code
 *   int value1;
 *   int value2;
 *
 *   CommandLine cmd (__FILE__);
 *   cmd.Usage ("...");
 *   cmd.AddValue ("value1", "first value", value1);
 *   cmd.AddValue ("value2", "second value", value1);
 *
 *   cmd.Parse (argc, argv);
 *
 *   if (value1 * value2 < 0)
 *     {
 *       std::cerr << "value1 and value2 must have the same sign!" << std::endl;
 *       std::cerr << cmd;
 *       exit (-1);
 *     }
 * \endcode
 **/
```

 *
