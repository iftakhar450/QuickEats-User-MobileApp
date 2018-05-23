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


    public latitude:any=51.517899;
    public maplat:any=51.517899;
    public longitude:any=-0.124439;
    public maplan:any=-0.124439;

    map: MapView;
    marker: Marker;
    ridermarker: Marker;
    public rider_number: string;
    public polyPoints: any;

    // This pattern makes use of Angular�s dependency injection implementation to inject an instance of the ItemService service into this class.
    // Angular knows about this service because it is included in your app�s main NgModule, defined in app.module.ts.


    constructor(private trackriderService: TrackRiderService, private route: ActivatedRoute) {
        const order_id = +this.route.snapshot.params["orderid"];
        this.map= new MapView();
        this.trackRider(order_id);

    }

    ngOnInit(): void {
        /*const order_id=+this.route.snapshot.params["orderid"];
        this.trackRider(order_id);
        */

    }




    onMapReady(args) {
        console.log("Map Ready");

        this.map = args.object;
        this.map.addMarker(this.marker);
        this.map.addMarker(this.ridermarker);

        /*this.marker = new mapsModule.Marker();
       this.marker.position = mapsModule.Position.positionFromLatLng(48.87, 2.35);
        // this.marker.title = "Sydney";
        // this.marker.snippet = "Australia";
        // this.marker.userData = { index: 1 };
        //
        // this.map.addMarker(this.marker);*/
    }

    trackRider(id) {

        this.map= new MapView();

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

                this.latitude = orderlat;
                this.longitude = orderlan;
                this.marker = new mapsModule.Marker();
                this.ridermarker = new mapsModule.Marker();
                this.marker.position = mapsModule.Position.positionFromLatLng(orderlat, orderlan);
                this.ridermarker.position = mapsModule.Position.positionFromLatLng(riderlat, riderlan);


                let imgSrc = new ImageSource();
                imgSrc.fromResource("deliverymen");
                let image = new Image();
                image.imageSource = imgSrc;
                this.marker.icon = image;


                this.drawpolyline(riderlat, riderlan, orderlat, orderlan);
                /*  this.map.addMarker(this.marker);
                   this.map.addMarker(this.ridermarker);*/

            }, (error) => {
                // this.onGetDataError(error);
                console.log(JSON.stringify(error));
            });
    }

    drawpolyline(rlatitude, rlongitude, ulatitude, ulongitude) {

        // alert(rlatitude+rlongitude+rlongitude+ulongitude);
        this.trackriderService.MapData(rlatitude, rlongitude, ulatitude, ulongitude)
            .subscribe((result) => {
                this.onSuccess(result);
                console.log("on succes -----" + JSON.stringify(result));
                alert("succes");
            }, (error) => {
                // this.onGetDataError(error);
                alert("error");
                console.log(JSON.stringify(error));

            });


    }

    onSuccess(response) {


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
        poly.width = 8;
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
