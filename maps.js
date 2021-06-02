let map, marker;
const obtenerLocalizacion = ()=> {
    if(!navigator.geolocation) {
        document.write('Not allowed get Position');
    } else {
    navigator.geolocation.getCurrentPosition(updateLocation);
}
}
const updateLocation = (position) => {
    console.log('position:',position)
    let lat = +position.coords.latitude;
    let lon = +position.coords.longitude;
    let pre = position.coords.accuracy;
 
   initMap(lat,lon);
}

const initMap = (lat,lon) =>{
    map = L.map("mapId").setView([lat, lon], 5);    
    const tileURL = "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png";
    L.tileLayer(tileURL).addTo(map);
    map.locate({ enableHighAccuracy: true });
    map.on("locationfound", e => console.log(e));
    marker = L.marker([lat, lon]);
    map.addLayer(marker);
}

const setMap = (lat,lon) => {
  //document.getElementById('mapId').innerHTML='';
//   const map = L.map("mapId").setView([lat, lon], 5);
  map.setView([lat,lon],5);
  const tileURL = "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png";
  L.tileLayer(tileURL).addTo(map);
  map.locate({ enableHighAccuracy: true });
  map.on("locationfound", e => console.log(e));
//   map.eachLayer(layer => map.removeLayer(layer));
  marker.remove();
  marker = L.marker([lat, lon]);

  map.addLayer(marker);
};

