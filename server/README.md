MQTT Server
===========

##Overview

Proof of concept of MQTT server.
It will listen to two ports: 1883 as a standard MQTT server, and 1884 as a websocket server.

##Usage

1. npm install
2. To run the server: node server.js
3. To run a client that sends a message to the presence channel (it will be received by the extension): node client.js
