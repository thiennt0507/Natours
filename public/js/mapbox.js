export const displayMap = () => {
  let map;
  function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 8,
    });
  }
  console.log('hello map box');
  window.initMap = initMap;
};
