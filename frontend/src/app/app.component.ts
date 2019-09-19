import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Location, Appearance } from '@angular-material-extensions/google-maps-autocomplete';
import PlaceResult = google.maps.places.PlaceResult;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Rotas e Pedágios';
  lat: any;
  lng: any;
  map: any;
  zoom = 10;
  waypoints: any;//Informações de pontos.(Pedágios da planilha).
  infoWindow: any;
  appearance = Appearance;//Aparência Inputs(Angular Material)
  selectedAddress: PlaceResult;
  origin: any;//Origem para componente de Direction.
  destination: any;//Destino para componente de Direction
  waypointsIcon = {
    url: 'assets/images/flag.png', scaledSize: {//ícone de pedágio.
      width: 20,
      height: 20
    }
  }
  @ViewChild('mapPage', { static: false }) mapPage: any;//Informações do elemento html.

  constructor(public httpClient: HttpClient) { }

  ngOnInit() {
    this.loadWaypoints();//Buscar waypoints(Pedágios ao iniciar aplicação.)    
  }
  //Definir localização inicial da aplicação ao ser iniciada.
  myLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition((pos: Position) => {
        this.lat = pos.coords.latitude;
        this.lng = pos.coords.longitude;
      })
    } else {
      this.handleLocationError(false, this.infoWindow, this.map.getCenter());
    }
  }
  //Retornar erro caso ocorra problemas na busca de localizações.
  handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
      'Error: The Geolocation service failed.' :
      'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(this.map);
  }
  //Get Pedágios localizações
  loadWaypoints() {//Buscar informações de pedágios do JSON criado com informações da planilha.
    this.httpClient.get('assets/data/waypoints.json')
      .subscribe(results => {
        this.waypoints = results;
        this.myLocation();//Iniciar na localização do Usuário ao iniciar aplicação.
      })
  }
  //Autocomplete Input. Exibir resultados no select com base nas informações nos inputs de origem e destino.
  onAutocompleteSelected(result: PlaceResult) { }
  //Definir ponto de origem Selecionado.
  onLocationSelectedOrigin(location: Location) {
    this.lat = location.latitude;
    this.lng = location.longitude;
    this.zoom = 15;//Definir zoom do maps exibido.
    this.origin = { lat: this.lat, lng: this.lng };
  }
  //Definir ponto de Destino selecionado.
  onLocationSelectedDestination(location: Location) {
    this.lat = location.latitude;
    this.lng = location.longitude;
    this.destination = { lat: this.lat, lng: this.lng };
  }
  //Verificar se coordenadas estão na rota(polygon).
  onResponse(map) {
    let route = map.routes[0].overview_path;//Objeto com coordenadas da direction. Linha do mapa.
    let polygon = new google.maps.Polygon({ paths: route });//Montar polygon para rota.
    let arrayPolygon = polygon.getPath();
    // Percorrer waypoints verificando quais estão na rota.
    this.waypoints.forEach(element => {//Percorrer array para definir marcações.
      let location = new google.maps.LatLng(element.Latitude, element.Longitude);
      element.Visible = google.maps.geometry.poly.containsLocation(location, polygon);//Verificar se elemento está no polygon   
    });
  }

}


// Melhoria Futura ====================================
// for (const item of arrayPolygon.getArray()) {
//   //Melhorar Precisão dos pontos. Exibir pontos com no máximo 1000 metros da linha da rota.
//   // if (google.maps.geometry.spherical.computeDistanceBetween(location, item) <= 1000) {
//   //   element.Visible = true;
//   // }
//   // Função para verificar se waypoint está na rota.
//   // console.log(element.Visible);
// }
