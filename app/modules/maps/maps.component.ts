import { Component, OnInit } from "@angular/core";
import { TextField } from "ui/text-field"
import { Page } from "ui/page";
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import { isEnabled, enableLocationRequest, getCurrentLocation, watchLocation, distance, clearWatch } from "nativescript-geolocation";
import { MapView, Marker, Position } from "nativescript-google-maps-sdk";
import {mapService} from "./map.service";
var http = require("http");
var mapsModule = require("nativescript-google-maps-sdk");
import { GooglePlacesAutocomplete } from 'nativescript-google-places-autocomplete';
import {setString} from "tns-core-modules/application-settings";
import {Items} from "../myorders/Fooditem";
import {SearchLocations} from "./location";
import {SearchBar} from "tns-core-modules/ui/search-bar";
import {StackLayout} from "tns-core-modules/ui/layouts/stack-layout";
import {Image} from "tns-core-modules/ui/image";

//import * as GooglePlaces from 'nativescript-plugin-google-places';
@Component({
    selector: "ns-items",
    moduleId: module.id,
    templateUrl: "./maps.component.html",
    styleUrls: ['./maps.css']

})
export class mapsComponent implements OnInit {

 
   
public latitude:any=0;
public longitude:any=0;
    public locations: SearchLocations[] = [];
    public count:number=0;

    constructor(private router: Router,private mapservice:mapService,private page:Page) {
       
    }

   
    ngOnInit(): void {


           this.getCurrentlocationofuser();

      //  this.searchLocation();
    }

    onlocationTap(args){


       console.log(this.locations[args.index].loc_id);
        let API_KEY = "AIzaSyDyamBO1Heo8nwXfy5vwk6QrnTt--mSCVM";
        let googlePlacesAutocomplete = new GooglePlacesAutocomplete(API_KEY);

        googlePlacesAutocomplete.getPlaceById(this.locations[args.index].loc_id)
            .then((places: any) => {
                this.selected_latitude=places.latitude;
                this.selected_longitude=places.longitude;

                console.log("----------------------Succes---------------");

               console.log(this.selected_latitude+"---------"+this.selected_longitude);
               this.onuserSelectedl_location();
                console.log("----------------------Succes---------------")

            }, (error => {
                console.log("----------------------error---------------");
                console.log(error);
                console.log("----------------------error---------------")
            }));


    }

    onSearchbartap(){

        let sbar:StackLayout=<StackLayout>this .page.getViewById("searchbar");
        sbar.visibility="visible";

    }

    onSearchTextChanged(args){

        let searchBar = <SearchBar>args.object;

        let searchtext=searchBar.text;
        console.log(searchtext);
        this.searchLocation(searchtext);

    }
    onSubmit(args){


     /*   let searchBar = <SearchBar>args.object;
        console.log("submit"+searchBar.text);
        let sbar:SearchBar=<SearchBar>this .page.getViewById("searchbar");
        sbar.visibility="collapse";*/






    }
    onClear(args){
        let sbar:StackLayout=<StackLayout>this .page.getViewById("searchbar");
        sbar.visibility="collapse";

    }
    searchLocation(text){


    let locationsTem: SearchLocations[] = [];
        let API_KEY = "AIzaSyDyamBO1Heo8nwXfy5vwk6QrnTt--mSCVM";
        let googlePlacesAutocomplete = new GooglePlacesAutocomplete(API_KEY);

        googlePlacesAutocomplete.search(text)
            .then((places: any) => {

                //console.log(JSON.stringify(places));
                for(let i=0;i<places.length;i++){

                    let loc=new SearchLocations(places[i].placeId,places[i].description);
                   // console.log("id"+places[i].placeId);
                   // console.log("description"+places[i].description);

                    locationsTem.push(loc);

                }


               /* console.log("-------------------locations--------------------------");
                console.log(JSON.stringify(this.locations));
                console.log("-------------------locations--------------------------");*/

            }, (error => {
               /* console.log("----------------------error---------------");
                console.log(error);
                console.log("----------------------error---------------")*/
            }));

        this.locations=locationsTem;

    }


    map: MapView;
    marker: Marker;


    selected_latitude: any;
    selected_longitude: any;

    public getCurrentlocationofuser() {
        let that = this;

        let your_current_loc;
        let apikeyforloc: string = "AIzaSyDyamBO1Heo8nwXfy5vwk6QrnTt--mSCVM";  //this key privided by google on enabling tha geocoding api
        var location = getCurrentLocation({
            desiredAccuracy: 3,
            updateDistance: 10,
            maximumAge: 20000,
            timeout: 20000
        }).then(function (loc) {
            if (loc) {
                console.log("Cu lat/long: " + loc.latitude, loc.longitude);

                    that.latitude=loc.latitude;
                    that.longitude=loc.longitude;

                /*that.marker = new mapsModule.Marker();
                that.marker.position = mapsModule.Position.positionFromLatLng(that.latitude, that.longitude);

                that.marker.userData = { index: 1 };
                that.marker.showInfoWindow();
                that.map.addMarker(that.marker);*/
                   // that.map.updateCamera();


            }


        }, function (e) {
            console.log("Error: " + e.message);
        });


    }


    onMapReady(args) {
        console.log("Map Ready");



        this.map = args.object;
      /*  this.marker = new mapsModule.Marker();
       this.marker.position = mapsModule.Position.positionFromLatLng(this.latitude, this.longitude);
      /!*  this.marker.title = "Sydney";
        this.marker.snippet = "Australia";*!/
        this.marker.userData = { index: 1 };
        this.marker.showInfoWindow();
          this.map.addMarker(this.marker);*/
        // this.map.updateCamera();
    }


        
       onCameraChanged(args) {
           this.selected_latitude = args.camera.latitude;
           this.selected_longitude=args.camera.longitude;



       }

   
       apikey: string = "AIzaSyDyamBO1Heo8nwXfy5vwk6QrnTt--mSCVM";  //this key privided by google on enabling tha geocoding api
       addres: string
       onuserSelectedl_location() {
           let that = this;
           console.log("your location is:" + this.selected_latitude + "   " + this.selected_longitude);
                 this.mapservice.getaddress_from_api(this.selected_latitude,this.selected_longitude)
               .subscribe((result) => {
                   let helper=JSON.parse(JSON.stringify(result));

                   this.mapservice.postal_code=helper._body.postalCode;

                   this.mapservice.select_address=helper._body.address;
                   this.router.navigate(["/add-new-address"]);
               }, (error) => {
                   console.log(JSON.stringify(error));
               });



       }
    public ngOnDestroy() {
      //alert("on destroy called");
    }

}

