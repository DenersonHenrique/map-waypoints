import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Location, Appearance} from '@angular-material-extensions/google-maps-autocomplete';
// import {} from '@types/googlemaps';
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
  infoWindow: any;
  waypoints: any;
  waypointsIcon = {url: 'assets/images/estrada-com-pedagio.svg', scaledSize: {//ícone de pedágio.
    width: 20,
    height: 20
  }}
  appearance = Appearance;
  selectedAddress: PlaceResult;
  origin: any;//Origem para componente de Direction.
  destination: any;//Destino para componente de Direction

  constructor(public httpClient: HttpClient) {}

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
  loadWaypoints(){//Buscar informações de pedágios do JSON criado com informações da planilha.
    this.httpClient.get('assets/data/waypoints.json')
    .subscribe(results => {
      this.waypoints = results;
      this.myLocation();//Iniciar na localização do Usuário ao iniciar aplicação.
    })
  }
  //Autocomplete Input
  //Exibir resultados com base nas informações inseridas nos inputs de origem e destino.
  onAutocompleteSelected(result: PlaceResult) {
    console.log('onAutocompleteSelected: ', result);
  }
  //Definir ponto de origem Selecionado.
  onLocationSelectedOrigin(location: Location) {
    console.log('onLocationSelected: ', location);
    this.lat = location.latitude;
    this.lng = location.longitude;
    this.zoom = 15;//Definir zoom do maps exibido.
    this.origin = { lat: this.lat, lng: this.lng };
  }
  //Definir ponto de Destino selecionado.
  onLocationSelectedDestination(location: Location) {
    console.log('onLocationSelected: ', location);
    this.lat = location.latitude;
    this.lng = location.longitude;
    this.destination = { lat: this.lat, lng: this.lng };
  }
}
