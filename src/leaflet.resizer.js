(function () {
    L.Control.resizer = L.Control.extend({
        options: {
            position: 'topleft',
            id: null,
            type: 'replace',
            states: [],
            leafletClasses: true
        },
        onAdd: function (map) {
            var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom lr-ctl');
            // Add all the elements into the container
            container.innerHTML = '<span class="fa fa-arrows-alt fa-lg lr-span"></span><div class="lr-input-container"><label class="lr-label">Width</label><label class="lr-label">Height</label><input class="lr-input" name="lr-width" placeholder="Width"/><input class="lr-input" name="lr-height" placeholder="Height"/><button id="lr-btn" name="Resize">Resize</button></div>';

            // Initiate behaviour on user click                        
            container.onclick = function () {
                lrInitiate(map);
            };
            return container;
        }

    });
    L.resizer = function (/* args will pass automatically */) {
        var args = Array.prototype.concat.apply([L.Control.resizer], arguments);
        return new(Function.prototype.bind.apply(L.Control.resizer, args));
    };

    // Initiate behaviour (Inputs and Resizer)
    function lrInitiate(map) {
        var mapSize = map.getSize();

        // Get input elements to put in value of map.getSize 
        var inputs = document.getElementsByClassName('lr-input');
        inputs[0].setAttribute('value', mapSize.x);
        inputs[1].setAttribute('value', mapSize.y);

        // Initiate resize button behaviour
        var btn = document.getElementById('lr-btn');
        btn.onclick = function () {
            var newWidth = inputs[0].value + "px";
            var newHeight = inputs[1].value + "px";
            
            map._container.style.width = newWidth;
            map._container.style.height = newHeight;
            
            map.invalidateSize();
        };
    }

})();

