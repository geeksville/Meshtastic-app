# Meshtastic Cross-Platform App
Meshtastic app to handle chats, map sharing and configure supported LoRa transceivers.
Currently alpha version, works on iOS, Android and Windows.

## Scheme
Tabular design with three tabs: chat, map and settings

### Chat
Here it is possible to see currently joined channels, create new and join one. Everything is done by QR.
Chat detail page is pretty much like any other messaging apps, except for the fact that users are identified by a self-assigned name.

### Map
Here you can navigate through offline maps with geolocation.

### Settings
Coarse or fine-grained control over the app and the device thanks to advanced settings. You can enable push notifications, change LoRa configs (Spreading Factor, CR, Bandwith) and see the resulting bitrate. Basic settings allow to edit your current nickname (full_name) and to choose long range or higher bitrate.

## Development Status
Tested working on iOS.
Graphically very basic.

### Next Steps
Read data via bluetooth from the TTGO/Tbeam device.
Compile and use protobufs.

### Bugs
Data model on settings.
Tutorial doesn't show up on first start.