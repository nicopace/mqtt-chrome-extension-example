// var mqtt = require('mqtt')
var notificationId = 0;
var urls = [];

function connect() {
  var client = mqtt.connect('mqtt://localhost:1884')


  client.on('packetreceive', function() {
    console.log('packetreceive ocurred', arguments);
  });

  client.on('error', function() {
    console.log('error ocurred', arguments);
  });

  client.on('connect', function() {
    console.log('Client connected...');
    client.publish('presence', 'Hello mqtt')
  })

  client.subscribe('presence');

  client.on('message', function(topic, message) {
    console.log(topic, message);
    popupNotification("SIP Notifications", "Message arrived from " + topic + ": " + message, 'icon.png', "https://github.com");
  });

  console.log('Client started...');
}

// Clear the popupNotification
function clearNotification(notificationId)
{
  chrome.notifications.clear(notificationId, clearedCallback);
}

//not sure what to do with this yet!
function createdCallback(n_id) {
  console.log("Succesfully created " + n_id + " notification");
}

function clearedCallback(wasCleared) {
  console.log("Succesfully cleared notification: " + wasCleared);
}

// create the popupNotification in Chrome
function popupNotification(poptitle, popmessage, popicon, popurl) {
  options = {
    type : "basic",
    title: poptitle,
    message: popmessage,
    iconUrl: popicon,
    priority: 2
  };
  var n_id = "id" + notificationId++;
  
  chrome.notifications.create(n_id, options, createdCallback);
  
  //add the url to the array.
  //if(typeof popurl === 'undefined'){ popurl = 'http://google.com' };
  urls[n_id] = popurl;

  if (JSON.parse(localStorage.clearNotifications))
  {
    // discard notification after timeout period
    window.setTimeout(function() {clearNotification(n_id)},
                      parseInt(localStorage.notificationTimeout) * 1000);
  }
}

//open the url in a new tab
function notificationClicked(id) {
  console.log("The notification '" + id + "' was clicked" );
  if(!(typeof urls[id] === 'undefined'))
    {
      chrome.tabs.create({url: urls[id]});
    };
}

function notifyClose(id, byUser) {
  // Clean up the matching
  console.log("The notification '" + id + "' was cleaned up" );
  delete urls[id];
}

window.addEventListener("load", function() {
  chrome.notifications.onClicked.addListener(notificationClicked);
  chrome.notifications.onClosed.addListener(notifyClose);
});

//check notification permission is there before we connect to the broker
chrome.notifications.getPermissionLevel(
  function(permissionLevel) {
    console.log('Noification Permission: ' + permissionLevel);
    if (permissionLevel == 'granted')
    {
      connect();
    }
    else if (permissionLevel == 'denied')
    {
      console.log('check your notifications permission level');
    }
  }
);
