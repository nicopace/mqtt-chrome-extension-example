mqtt2chrome
===========

##Overview

Proof of concept of MQTT client.
It will show any message received over MQTT from a local server (hardcoded to localhost:1884) as a notification.
When clicking the notification, a new tab is opened.

##Installation

1. Download all the files to a directory.
2. In Chrome, goto Tools -> Extenstions.
3. Tick the 'Developer mode' box, then click 'Load unpacked extension...'
4. Select the directory where you have downloaded the extension.
5. The extension will automatically load and connect using the default settings.
6. The settings page will open allowing you to change them to suit your configuration.
7. Click Save & Close. Note: if you changed the broker, port or subtopic settings you need to click the MQTT2Chrome toolbar to trigger a reconnect.

