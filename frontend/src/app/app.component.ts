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
  title = 'frontend';
  lat: any;
  lng: any;
  map: any;
  zoom = 10;
  infoWindow: any;
  waypoints: any;
  public appearance = Appearance;
  public selectedAddress: PlaceResult;

  constructor(public httpClient: HttpClient) {}

  ngOnInit() {
    this.loadWaypoints();
    
  }
  //Get My Location
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

  handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
                          'Error: The Geolocation service failed.' :
                          'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(this.map);
  }
  //Get Pedágios localizações
  loadWaypoints(){
    this.httpClient.get('assets/data/waypoints.json')
    .subscribe(results => {
      this.waypoints = results;
      this.myLocation();
    })
  }
  //Autocomplete Input
  onAutocompleteSelected(result: PlaceResult) {
    console.log('onAutocompleteSelected: ', result);
  }
 
  onLocationSelected(location: Location) {
    console.log('onLocationSelected: ', location);
    this.lat = location.latitude;
    this.lng = location.longitude;
    this.zoom = 15;
  }
}
