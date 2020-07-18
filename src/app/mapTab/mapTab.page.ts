import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Map, Marker, NavigationControl } from 'mapbox-gl';

@Component({
  selector: 'app-mapTab',
  templateUrl: 'mapTab.page.html',
  styleUrls: ['mapTab.page.scss']
})
export class MapTabPage implements OnInit {
  map: Map;
  mapOptions: any;
  mapCenter = {lat: null, lng: null};
  marker: Marker;

  constructor(private geolocation: Geolocation,
              private toastCtrl: ToastController) { }

  ngOnInit() {
    this.geolocation.getCurrentPosition().then(
      (resp) => {
        this.mapCenter.lat = resp.coords.latitude;
        this.mapCenter.lng = resp.coords.longitude;
        this.mapOptions = {
          container: 'map',
          style: 'mapbox://styles/mapbox/streets-v11',
          zoom: 15,
          center: this.mapCenter,
          accessToken: 'pk.eyJ1IjoiYW5lbGl0byIsImEiOiJja2NqcXZ3cHQxbGk4MnRwMDMya3N6OHJpIn0.is339MMewXaUcbv2YtUKzA'
        };

        this.map = new Map(this.mapOptions);
        this.map.addControl(new NavigationControl());

        this.marker = new Marker()
        .setLngLat([12.550343, 55.665957])
        .addTo(this.map);
      },
      (err) => {
        this.showError(err.message);

        this.mapCenter.lat = 0;
        this.mapCenter.lng = 0;
        this.mapOptions = {
          container: 'map',
          style: 'mapbox://styles/mapbox/dark-v10',
          zoom: 15,
          center: this.mapCenter,
          accessToken: 'pk.eyJ1IjoiYW5lbGl0byIsImEiOiJja2NqcXZ3cHQxbGk4MnRwMDMya3N6OHJpIn0.is339MMewXaUcbv2YtUKzA'
        };

        this.map = new Map(this.mapOptions);
        this.map.addControl(new NavigationControl());
      }
    );
   
   let watch = this.geolocation.watchPosition();
   watch.subscribe((data) => {
     this.mapCenter.lat = data.coords.latitude;
     this.mapCenter.lng = data.coords.longitude;
     this.map.setCenter(this.mapCenter);
     this.marker.setLngLat(this.mapCenter);
   });

  }

  async showError(err: string) {
    const toast = await this.toastCtrl.create({
      message: err,
      duration: 2000
    });
    toast.present();
  }
}
