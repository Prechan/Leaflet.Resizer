// Minimal Leaflet global mock — loaded before every test file
globalThis.L = {
    Control: {
        extend(proto) {
            function Control(options) {
                this.options = Object.assign({}, proto.options, options);
            }
            Control.prototype = Object.assign({}, proto);
            globalThis.L.Control.Resizer = Control;
            return Control;
        },
    },
    DomUtil: {
        create(tag, className) {
            const el = document.createElement(tag);
            if (className) el.className = className;
            return el;
        },
    },
    DomEvent: {
        disableClickPropagation: () => {},
        on(el, event, fn) { el.addEventListener(event, fn); },
        stopPropagation(e) { e.stopPropagation(); },
    },
    resizer: null,
};
