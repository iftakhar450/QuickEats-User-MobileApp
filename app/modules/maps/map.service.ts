import { Injectable } from "@angular/core";
var mapsModule = require("nativescript-google-maps-sdk");
import { isEnabled, enableLocationRequest, getCurrentLocation, watchLocation, distance, clearWatch } from "nativescript-geolocation";
import { registerElement } from "nativescript-angular/element-registry";
import { MapView, Marker, Position } from "nativescript-google-maps-sdk";
registerElement("MapView", () => require("nativescript-google-maps-sdk").MapView);
var http = require("http");
import { Observable as RxObservable } from "rxjs/Observable";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";
import {getString} from "tns-core-modules/application-settings";
import { Http, Headers } from "@angular/http";
@Injectable()
export class mapService {
    map: MapView;
    marker: Marker;
    public select_address:string;
    public postal_code:string;
    public  current_address:string;


    constructor(private http: Http) { }
    private serverUrl = "http://46.101.88.80:81/get/postalcode";

    // public getlocation() {
    //
    //       let that = this;
    //       let marker1;
    //       let your_current_loc;
    //        let apikeyforloc: string = "AIzaSyDyamBO1Heo8nwXfy5vwk6QrnTt--mSCVM";  //this key privided by google on enabling tha geocoding api
    //
    //    var location = getCurrentLocation({ desiredAccuracy: 3, updateDistance: 10, maximumAge: 20000, timeout: 20000 }).
    //        then(function (loc) {
    //            if (loc) {
    //
    //                console.log("Current lat/long: " + loc.latitude, loc.longitude);
    //
    //                that.getaddress_from_api(loc.latitude,loc.longitude)
    //                    .subscribe((result) => {
    //                        let helper=JSON.parse(JSON.stringify(result));
    //
    //                        //console.log(JSON.stringify(helper.address));
    //                        that.current_address=helper.address;
    //
    //
    //                    }, (error) => {
    //                        console.log(JSON.stringify(error));
    //                    });
    //
    //
    //                }
    //
    //
    //        }, function (e) {
    //            console.log("Error: " + e.message);
    //        });
    //
    //
    //
    //    }

    getaddress_from_api(lat:any,lon:any) {
        let headers = this.createRequestHeader();
        return this.http.get(this.serverUrl+"/"+lat+"/"+lon, { headers: headers })
            .map(res => res);
    }



    private createRequestHeader() {
        let headers = new Headers();
        //let user_token=getString("access_token");
        //headers.set("AuthKey", "my-key");
       // headers.set("token", user_token);
        headers.append("Content-Type", "application/json");

        return headers;
    }

}
