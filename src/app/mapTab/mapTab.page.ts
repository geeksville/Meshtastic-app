import { Component, ViewChild } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';

declare var google;

@Component({
  selector: 'app-mapTab',
  templateUrl: 'mapTab.page.html',
  styleUrls: ['mapTab.page.scss']
})
export class MapTabPage {
  @ViewChild('map', {static:true}) mapElement;

  map: any;
  mapOptions: any;
  mapCenter = {lat: null, lng: null};

  constructor(private geolocation: Geolocation) {

    this.geolocation.getCurrentPosition().then((resp) => {
      this.mapCenter.lat = resp.coords.latitude;
      this.mapCenter.lng = resp.coords.longitude;
      this.mapOptions = {
        zoom: 15,
        center: this.mapCenter,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      this.map = new google.maps.Map(this.mapElement.nativeElement, this.mapOptions);
      console.log("init google map");
    });
   
   let watch = this.geolocation.watchPosition();
   watch.subscribe((data) => {
             console.log(data.coords.latitude);
             console.log(data.coords.longitude);
   });

  }
}
