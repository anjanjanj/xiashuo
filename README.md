# xiashuo
Yik Yak-style demo built with Meteor targeted at mobile

### Overview
Users can search for chat threads posted within 100m, 1km, or 10km of their current location and reply to them, or create new threads that other users can find when in range. Each participant in a thread is automatically assigned a unique emoji as their name within that thread.

Seems to compile ok to an app. Working in iOS Simulator and on Android devices.

### Structure
Layout uses the [meteor-ionic](https://github.com/meteoric/meteor-ionic) as a quick fix for a mobile look and behaviour.

Users accessing the site or app are automatically logged in anonymously and receive a user id via the `brettle:accounts-anonymous-auto` package.

### Demo
Web demo: (http://xiashuo.meteor.com/)
(May require refreshing after enabling geolocation privileges and the hosting is a bit slow)
