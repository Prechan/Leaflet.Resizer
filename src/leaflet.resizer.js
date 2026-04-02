import './leaflet.resizer.css';

(function () {
    // Lucide "expand" icon — inline SVG, no external icon library needed
    var EXPAND_ICON =
        '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" ' +
        'fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ' +
        'class="lr-icon">' +
        '<path d="m21 21-6-6m6 6v-4.8m0 4.8h-4.8"/>' +
        '<path d="M3 16.2V21m0 0h4.8M3 21l6-6"/>' +
        '<path d="M21 7.8V3m0 0h-4.8M21 3l-6 6"/>' +
        '<path d="M3 7.8V3m0 0h4.8M3 3l6 6"/>' +
        '</svg>';

    L.Control.Resizer = L.Control.extend({
        options: {
            position: 'topleft',
            id: null,
            type: 'replace',
            states: [],
            leafletClasses: true
        },

        onAdd: function (map) {
            var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom lr-ctl');

            container.innerHTML =
                EXPAND_ICON +
                '<div class="lr-input-container">' +
                  '<label class="lr-label">Width</label>' +
                  '<label class="lr-label">Height</label>' +
                  '<input class="lr-input" name="lr-width" placeholder="Width"/>' +
                  '<input class="lr-input" name="lr-height" placeholder="Height"/>' +
                  '<button class="lr-btn" name="Resize">Resize</button>' +
                '</div>';

            // Prevent map interactions (pan, zoom) from firing through the control
            L.DomEvent.disableClickPropagation(container);

            L.DomEvent.on(container, 'click', function () {
                lrInitiate(map, container);
            });

            return container;
        },

        onRemove: function () {}
    });

    L.resizer = function (options) {
        return new L.Control.Resizer(options);
    };

    function lrInitiate(map, container) {
        var mapSize = map.getSize();

        // Scoped to this control's container — safe with multiple maps on one page
        var inputs = container.querySelectorAll('.lr-input');
        inputs[0].value = mapSize.x;
        inputs[1].value = mapSize.y;

        var btn = container.querySelector('.lr-btn');
        L.DomEvent.on(btn, 'click', function (e) {
            L.DomEvent.stopPropagation(e);
            var newWidth  = parseInt(inputs[0].value, 10) + 'px';
            var newHeight = parseInt(inputs[1].value, 10) + 'px';

            // map.getContainer() is the public API (Leaflet 1.0+)
            map.getContainer().style.width  = newWidth;
            map.getContainer().style.height = newHeight;
            map.invalidateSize();
        });
    }
})();
