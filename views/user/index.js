async function initMap() {
     const {
         Map
     } = await google.maps.importLibrary("maps");
     const {
         AdvancedMarkerElement
     } = await google.maps.importLibrary("marker");
     const map = new Map(document.getElementById("map"), {
         zoom: 11,
         center: {
             lat: -8.532829,
             lng: 118.305939
         },
         mapTypeControl: true,
         mapTypeControlOptions: {
             style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
             position: google.maps.ControlPosition.BOTTOM_CENTER,
         },
         zoomControl: true,
         zoomControlOptions: {
             position: google.maps.ControlPosition.LEFT_CENTER,
         },
         scaleControl: true,
         streetViewControl: true,
         streetViewControlOptions: {
             position: google.maps.ControlPosition.LEFT_TOP,
         },
         fullscreenControl: true,
     });

     // Ambil data fasilitas pendidikan dari backend
     fetch('/fasilitaspendidikan')
         .then(response => response.json())
         .then(fasilitasPendidikan => {
             fasilitasPendidikan.forEach(fasilitas => {
                 if (fasilitas.latitude && fasilitas.longitude) {
                     // Tambahkan marker untuk setiap fasilitas

                     new AdvancedMarkerElement({
                         position: {
                             lat: fasilitas.latitude,
                             lng: fasilitas.longitude
                         },
                         map,
                         title: fasilitas.nama,
                     });
                 }
             });
         })
         .catch(error => console.error('Error fetching data:', error));
 }