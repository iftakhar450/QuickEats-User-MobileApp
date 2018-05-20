import {Component, OnInit} from "@angular/core";
import {TextField} from "ui/text-field"
import {Page} from "ui/page";

var mapsModule = require("nativescript-google-maps-sdk");
import {ActivatedRoute, Router} from "@angular/router";
import {TrackRiderService} from "./trackRider.service";
import {Image} from "ui/image";
import {ImageSource} from "image-source";

var phone = require("nativescript-phone");
/*for dialog*/
var platform = require("platform");
var application = require("application");
var dialog = require("nativescript-dialog");
import {MapView, Marker, Polyline, Position} from "nativescript-google-maps-sdk";

var polyline = require('polyline');
import {Color} from "color";
import {
    isEnabled,
    enableLocationRequest,
    getCurrentLocation,
    watchLocation,
    distance,
    clearWatch
} from "nativescript-geolocation";
import {Directions} from "nativescript-directions";

@Component({
    selector: "ns-items",
    moduleId: module.id,
    templateUrl: "./trackRider.html",
    styleUrls: ['./trackRider.css']


})
export class TrackRiderComponent implements OnInit {



     // maplat:string;
     maplat = 31.584416;
     zoom = 8;
     minZoom = 0;
     maxZoom = 22;
     bearing = 0;
     tilt = 0;
    lastCamera: String;
    //  maplan :string;
     maplan = 74.382781;


    map: MapView;
    marker: Marker;
    ridermarker: Marker;
    public rider_number: string;
    public polyPoints: any;
    public intervalfuncation:any;
    order_id_id :any;
    // This pattern makes use of Angular�s dependency injection implementation to inject an instance of the ItemService service into this class.
    // Angular knows about this service because it is included in your app�s main NgModule, defined in app.module.ts.


    constructor(private trackriderService: TrackRiderService, private route: ActivatedRoute) {
        const order_id = +this.route.snapshot.params["orderid"];

        this.map= new MapView();
        console.log("map view..........................constructure...................."+this.map);

        this.order_id_id= order_id;

        console.log("order_id_id.........................constructure...................."+this.order_id_id);


    }

    onCameraChanged(args) {
        console.log("Camera changed: " + JSON.stringify(args.camera), JSON.stringify(args.camera) === this.lastCamera);
        this.lastCamera = JSON.stringify(args.camera);
    }

    ngOnInit(): void {
        /*const order_id=+this.route.snapshot.params[orderid"];
        this.trackRider(order_id);"
        */



    }

    public ngOnDestroy() {

        console.log("clear interval called");
        clearInterval(this.intervalfuncation);
    }




    onMapReady(args) {
        console.log("Map Ready");



        this.map = args.object;
        console.log("Map Ready1");
        // this.marker = new Marker();
        // this.map = new MapView();
        // this.marker = new mapsModule.Marker();
        // this.ridermarker = new mapsModule.Marker();


        // this.map.addMarker(this.marker);
        console.log("Map Ready2");

        // this.map.addMarker(this.ridermarker);
        // this.map.setMyLocationEnabled(true);

         console.log("map view..............................................");

        // this.map = new MapView();

        this.map.myLocationEnabled = true;
        console.log("map view.................................................");




        this.trackRider(this.order_id_id);


        /*this.marker = new mapsModule.Marker();
       this.marker.position = mapsModule.Position.positionFromLatLng(48.87, 2.35);
        // this.marker.title = "Sydney";
        // this.marker.snippet = "Australia";
        // this.marker.userData = { index: 1 };
        //
        // this.map.addMarker(this.marker);*/
    }

    trackRider(id) {

        console.log("track rider...");
        this.map = new MapView();
        console.log("track rider...");



        this.trackriderService.getorderDetailForTrackingRider(id)
            .subscribe((result) => {


                let helper = JSON.stringify(result);
                let data = JSON.parse(helper);
                console.log("Rider info " + JSON.stringify(data));
                let orderlat = data._body.response.order_lat;
                let orderlan = data._body.response.order_lan;
                let riderlat = data._body.response.rider_id.rider_lat;
                let riderlan = data._body.response.rider_id.rider_lan;
                this.rider_number = data._body.response.rider_id.rider_mobile_no;
                //  this.rider_number="03064148933";

                console.log("------------------------------" + orderlat + " " + orderlan + " " + riderlat + " " + riderlan + " " + this.rider_number);

              //  this.map.removeAllMarkers();
                console.log("map");

                // this.map = new MapView();

                console.log("map");

                this.maplat = orderlat;
                this.maplan= orderlan;
                this.marker = new mapsModule.Marker();
                this.ridermarker = new mapsModule.Marker();
                this.marker.position = mapsModule.Position.positionFromLatLng(orderlat, orderlan);
                this.ridermarker.position = mapsModule.Position.positionFromLatLng(riderlat, riderlan);
                console.log("6map"+this.marker);
                console.log("6map"+this.map);

                // this.map.addMarker(this.marker);
                console.log("7map");
                this.map.addMarker(this.ridermarker);
                console.log("8map");


                let imgSrc = new ImageSource();
                console.log("map1");

                imgSrc.fromResource("deliverymen");
                console.log("map2");

                let image = new Image();
                console.log("map3");

                image.imageSource = imgSrc;
                console.log("map4");

                this.marker.icon = image;
                console.log("map5");


                console.log("map view.........."+this.map);


                this.drawpolyline(riderlat, riderlan, orderlat, orderlan);
                /*  this.map.addMarker(this.marker);
                   this.map.addMarker(this.ridermarker);*/

            }, (error) => {
                // this.onGetDataError(error);
                console.log(JSON.stringify(error));
            });
    }

    drawpolyline(rlatitude, rlongitude, ulatitude, ulongitude) {

        console.log("map poly ");


        // alert(rlatitude+rlongitude+rlongitude+ulongitude);
        this.trackriderService.MapData(rlatitude, rlongitude, ulatitude, ulongitude)
            .subscribe((result) => {
                this.onSuccess(result);
               // console.log("on succes -----" + JSON.stringify(result));

            }, (error) => {
                // this.onGetDataError(error);
                alert("error");
                console.log(JSON.stringify(error));

            });


    }

    onSuccess(response) {

        // this.map = new MapView();

        console.log("map view.........."+this.map);
        console.log("map view..........");

        console.log("map view..............................................."+this.map);



        let respoise = response._body;

        let res = JSON.stringify(respoise);
        let route = JSON.parse(res);
        let routeString = JSON.stringify(route.routes);
        //  console.log("routeString..."+JSON.stringify(routeString));
        let routeStringparse = JSON.parse(routeString);
        let routeStringparsesssssPoints = routeStringparse[0].overview_polyline.points;

        //  console.log("resssssssssssssssssssssssssssssssss..............................................."+routeStringparsesssssPoints);

        this.polyPoints = polyline.decode(routeStringparsesssssPoints);

        console.log("polyPoints..............................................." + this.polyPoints);
        console.log("polyPointsLength..............................................." + this.polyPoints.length);

        let flightPath;
        let poly = new Polyline();
        for (let i = 0; i < this.polyPoints.length; i++) {

            let value = this.polyPoints[i];

            poly.addPoint(Position.positionFromLatLng(value[0], value[1]));


            // console.log(i);

        }

        poly.color = new Color("#e27900");
        poly.width = 20;
        poly.geodesic = true;

        console.log("---------------------------------------------------Polyline 1:");
        this.map.addPolyline(poly);
        console.log("----------------------------------------------------Polyline 2:");


        let position = new Position();

        console.log("current postion is ....." + position.latitude + "...,,,,...." + position.longitude);


    }

    methodOfMapFailure(error) {

        console.log("error......" + JSON.stringify(error))

    }

    onridercalltap() {

        let abc = this.rider_number;


        dialog.show({
                title: "Attention",
                message: "Call  your rider?",
                cancelButtonText: "Cancel",
                okButtonText: "Call"

            }
        ).then(function (r) {

            console.log("Result: " + r);
            if (r == true) {
                phone.dial(abc, false);
            }

        });

    }


}
