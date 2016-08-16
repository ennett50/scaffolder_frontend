var map, center_map = [];

function initMap(){

    center_map["spb"] = {lat: 59.970444, lng: 30.314265};
    center_map["smolensk"] = {lat: 54.7903112, lng: 32.05036629999995};
    center_map["surgut"] = {lat: 61.25595029999999, lng: 73.38454709999996};
    center_map["murmansk"] = {lat: 68.9585244, lng: 33.08265979999999};

    var big_map_elem = document.getElementById('js-mapBig');

    map = new google.maps.Map(big_map_elem, {
        center: center_map[big_map_elem.getAttribute('data-city_code')],
        zoom: 10
    });
    var latingsArray = [],
        allCoordinates = document.querySelectorAll('.js-init-map'),
        image = App.BX.TEMPLATE_PATH +  'images/icons/map-icon.png';

    if(allCoordinates.length <= 0){
        allCoordinates = document.querySelectorAll('.js-init-map');
    }

    for (var i = 0; i < allCoordinates.length; i++) {
        var shopLatLng = {
                'lat': 1 * allCoordinates[i].getAttribute('data-lat'),
                'lng': 1 * allCoordinates[i].getAttribute('data-lng')
            },
            marker = new google.maps.Marker({
                position: shopLatLng,
                map: map,
                icon: image
            });

    }
}
initMap();



jQuery(document).ready(function($) {
    var map;
    $('.js-show-map').on('click', function(event) {
        event.preventDefault();
        var closestParent = $(this).closest('.js-init-map'),
            $mapId = closestParent.data('id'),
            $mapLat = closestParent.data('lat'),
            $mapLng = closestParent.data('lng'),
            $image = App.BX.TEMPLATE_PATH +  'images/icons/map-icon.png';

        console.log($('#map'+$mapId).is(':visible'));
        if( $('#map'+$mapId).is(':visible') ) {
            closestParent.find('.contacts-list-map').hide();
        } else {
            function initMap () {
                var shopLatLng = {
                    lat: $mapLat,
                    lng: $mapLng
                };
                map = new google.maps.Map(document.getElementById('map' + $mapId), {
                    center: shopLatLng,
                    zoom: 15
                });
                var marker = new google.maps.Marker({
                    position: shopLatLng,
                    map: map,
                    icon: $image
                });
            }
            closestParent.find('.contacts-list-map').show();
            initMap();
        }
    });
});