# Leaflet.Resizer

[![npm version](https://badge.fury.io/js/leaflet.resizer.svg)](https://badge.fury.io/js/leaflet.resizer) 

Easily resize your Leaflet map container with a button, in vanilla JS.

Tested with [Leaflet](http://leafletjs.com/) 0.7.7 in Firefox and WebKit.

## Demo

![Gif Demo](https://raw.githubusercontent.com/Prechan/Leaflet.Resizer/gh-pages/demo/leaflet.resizer.gif)

You can check out the [Demo](https://prechan.github.io/Leaflet.Resizer/demo).


## Install & Usage

### Set up:

### Bower
```javascript
bower install --save leaflet.resizer
```

### NPM
```javascript
npm install --save leaflet.resizer
```

### The Classical Way 

Download and include 
[CSS file](https://raw.githubusercontent.com/Prechan/Leaflet.Resizer/gh-pages/dist/leaflet.resizer.min.css)
and [JS file](https://raw.githubusercontent.com/Prechan/Leaflet.Resizer/gh-pages/dist/leaflet.resizer.min.js)

### Initialize plugin (so easy !)

```javascript
L.resizer().addTo(map);
```

#### Dependencies

Obviously, Leaflet.Resizer needs [Leaflet](http://leafletjs.com/).
But also [Font Awesome](https://fortawesome.github.io/Font-Awesome/) to handle the icon.

## License

MIT