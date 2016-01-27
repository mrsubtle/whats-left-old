cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/com.telerik.plugins.wkwebview/www/wkwebview.js",
        "id": "com.telerik.plugins.wkwebview.wkwebview",
        "pluginId": "com.telerik.plugins.wkwebview",
        "clobbers": [
            "wkwebview"
        ]
    },
    {
        "file": "plugins/cordova-plugin-camera/www/CameraConstants.js",
        "id": "cordova-plugin-camera.Camera",
        "pluginId": "cordova-plugin-camera",
        "clobbers": [
            "Camera"
        ]
    },
    {
        "file": "plugins/cordova-plugin-camera/www/CameraPopoverOptions.js",
        "id": "cordova-plugin-camera.CameraPopoverOptions",
        "pluginId": "cordova-plugin-camera",
        "clobbers": [
            "CameraPopoverOptions"
        ]
    },
    {
        "file": "plugins/cordova-plugin-camera/www/Camera.js",
        "id": "cordova-plugin-camera.camera",
        "pluginId": "cordova-plugin-camera",
        "clobbers": [
            "navigator.camera"
        ]
    },
    {
        "file": "plugins/cordova-plugin-camera/www/ios/CameraPopoverHandle.js",
        "id": "cordova-plugin-camera.CameraPopoverHandle",
        "pluginId": "cordova-plugin-camera",
        "clobbers": [
            "CameraPopoverHandle"
        ]
    },
    {
        "file": "plugins/cordova-plugin-console/www/console-via-logger.js",
        "id": "cordova-plugin-console.console",
        "pluginId": "cordova-plugin-console",
        "clobbers": [
            "console"
        ]
    },
    {
        "file": "plugins/cordova-plugin-console/www/logger.js",
        "id": "cordova-plugin-console.logger",
        "pluginId": "cordova-plugin-console",
        "clobbers": [
            "cordova.logger"
        ]
    },
    {
        "file": "plugins/cordova-plugin-device/www/device.js",
        "id": "cordova-plugin-device.device",
        "pluginId": "cordova-plugin-device",
        "clobbers": [
            "device"
        ]
    },
    {
        "file": "plugins/cordova-plugin-dialogs/www/notification.js",
        "id": "cordova-plugin-dialogs.notification",
        "pluginId": "cordova-plugin-dialogs",
        "merges": [
            "navigator.notification"
        ]
    },
    {
        "file": "plugins/cordova-plugin-inappbrowser/www/inappbrowser.js",
        "id": "cordova-plugin-inappbrowser.inappbrowser",
        "pluginId": "cordova-plugin-inappbrowser",
        "clobbers": [
            "cordova.InAppBrowser.open",
            "window.open"
        ]
    },
    {
        "file": "plugins/cordova-plugin-network-information/www/network.js",
        "id": "cordova-plugin-network-information.network",
        "pluginId": "cordova-plugin-network-information",
        "clobbers": [
            "navigator.connection",
            "navigator.network.connection"
        ]
    },
    {
        "file": "plugins/cordova-plugin-network-information/www/Connection.js",
        "id": "cordova-plugin-network-information.Connection",
        "pluginId": "cordova-plugin-network-information",
        "clobbers": [
            "Connection"
        ]
    },
    {
        "file": "plugins/cordova-plugin-vibration/www/vibration.js",
        "id": "cordova-plugin-vibration.notification",
        "pluginId": "cordova-plugin-vibration",
        "merges": [
            "navigator.notification",
            "navigator"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-webserver": "1.0.3",
    "com.telerik.plugins.wkwebview": "0.6.7",
    "cordova-plugin-camera": "2.1.0",
    "cordova-plugin-console": "1.0.2",
    "cordova-plugin-device": "1.1.1",
    "cordova-plugin-dialogs": "1.2.0",
    "cordova-plugin-inappbrowser": "1.2.0",
    "cordova-plugin-network-information": "1.2.0",
    "cordova-plugin-vibration": "2.1.0"
}
// BOTTOM OF METADATA
});