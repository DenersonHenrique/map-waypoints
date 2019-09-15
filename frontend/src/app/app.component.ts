import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { google } from '@agm/core/services/google-maps-types';

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
  infoWindow: any;
  waypoints: any;

  constructor(public httpClient: HttpClient) {}

  ngOnInit() {
    this.loadWaypoints();
    
  }
  //Get My Location
  async myLocation() {
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
      console.log(this.waypoints)
      this.myLocation();
    })
  }
  //Enter route
  myRoute() {
    let input = document.getElementById('pac-input');
    let autocomplete = new google.maps.places.Autocomplete(input);

    autocomplete.setFields(
      ['address_components', 'geometry', 'icon', 'name']);
    
    this.infoWindow = new google.maps.infoWindow();
    
  }
}
