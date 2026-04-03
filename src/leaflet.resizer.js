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
                  '<div class="lr-row"><span class="lr-label">Width</span><input class="lr-input" name="lr-width"/></div>' +
                  '<div class="lr-row"><span class="lr-label">Height</span><input class="lr-input" name="lr-height"/></div>' +
                  '<button class="lr-btn" name="Resize">Resize</button>' +
                '</div>';

            // Prevent map interactions (pan, zoom) from firing through the control
            L.DomEvent.disableClickPropagation(container);

            var inputs = container.querySelectorAll('.lr-input');
            var btn    = container.querySelector('.lr-btn');

            // Populate inputs with current map size whenever the panel appears
            L.DomEvent.on(container, 'mouseenter', function () {
                var mapSize = map.getSize();
                inputs[0].value = mapSize.x;
                inputs[1].value = mapSize.y;
            });

            // Apply resize — registered once, no risk of duplicate listeners
            L.DomEvent.on(btn, 'click', function (e) {
                L.DomEvent.stopPropagation(e);
                map.getContainer().style.width  = parseInt(inputs[0].value, 10) + 'px';
                map.getContainer().style.height = parseInt(inputs[1].value, 10) + 'px';
                map.invalidateSize();
            });

            return container;
        },

        onRemove: function () {}
    });

    L.resizer = function (options) {
        return new L.Control.Resizer(options);
    };
})();
