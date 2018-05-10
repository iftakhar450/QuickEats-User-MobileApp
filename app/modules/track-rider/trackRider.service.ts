import { Injectable } from "@angular/core";
import { Observable as RxObservable } from "rxjs/Observable";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Http, Headers } from "@angular/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";
import {getString} from "tns-core-modules/application-settings";

@Injectable()
export class TrackRiderService {




    private serverUrl = "http://46.101.88.80:81";

    constructor(private http: Http) { }




    getorderDetailForTrackingRider(id) {

        let headers = this.createRequestHeader();

        return this.http.get(this.serverUrl+"/get/order/tracking/"+id, { headers: headers })
            .map(res => res);
    }



    private createRequestHeader() {
        let headers = new Headers();
        // set headers here e.g.
        let user_token=getString("access_token");
        //headers.set("AuthKey", "my-key");
        headers.append("token", user_token);
        headers.append("Content-Type", "application/json");


        return headers;
    }

    MapData(riderLat,riderLong,userLat,userLong){

     /*   console.log("lat....."+riderLat);
        console.log("lng....."+riderLong);
        console.log("lng....."+userLat);
        console.log("lng....."+userLong);*/

        let originLat = riderLat;
        let originLng = riderLong;
        let origin = originLat+","+originLng;
        let desLat = userLat;
        let desLng = userLong;
        let destination = desLat+","+desLng;
      //  console.log(origin+"     "+destination);

         // let  MapUrl = " https://maps.googleapis.com/maps/api/directions/json?alternatives=true&origin=51.517899,-0.124439&destination=51.515608,-0.115242&sensor=false&key=AIzaSyAjO8tWINXG5zpuQZSbey9eOInhMdjGvdg";
let  MapUrl = " https://maps.googleapis.com/maps/api/directions/json?alternatives=true&origin="+origin+"&destination="+destination+"&sensor=false&key=AIzaSyDyamBO1Heo8nwXfy5vwk6QrnTt--mSCVM";
      // let MapUrl = "https://maps.googleapis.com/maps/api/directions/json?alternatives=true&origin="+origin+"&destination="+destination+"&sensor=false&key=AIzaSyAjO8tWINXG5zpuQZSbey9eOInhMdjGvdg";

        let headers = this.MapHeader();
        console.log("map data method in service....");
        return this.http.get(MapUrl, { headers: headers })
            .map(res => res);
    }
    MapHeader() {


        let headers = new Headers();
        headers.append("Content-Type", "application/json");

        return headers;

    }

}
