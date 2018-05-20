import {Component, ViewChild, OnInit, AfterViewInit, ChangeDetectorRef} from "@angular/core";
import * as ImageModule from "tns-core-modules/ui/image";
import {RestaurantService} from "./restaurants.service";
import {Router} from "@angular/router";
// import {NativeScriptUISideDrawerModule} from "nativescript-pro-ui/sidedrawer/angular";
import {Observable} from "data/observable";
import * as geolocation from "nativescript-geolocation";
import * as timePickerModule from "tns-core-modules/ui/time-picker";
import {mapsComponent} from "../maps/maps.component";
import {mapService} from "../maps/map.service"
import {Label} from "ui/label";
import {Page} from "ui/page";
import {AbsoluteLayout} from "tns-core-modules/ui/layouts/absolute-layout";
import {StackLayout} from "tns-core-modules/ui/layouts/stack-layout";
import {TimePicker} from "ui/time-picker";
import {ElementRef} from "@angular/core";
import {Accuracy} from "tns-core-modules/ui/enums";
import any = Accuracy.any;
import {ObservableArray} from "tns-core-modules/data/observable-array";
import {Restaurant} from "./resturants"
import {locations} from "../deliveryaddresses/deliveryaddress";
import {DeliverAddressService} from "../deliveryaddresses/deliveryaddress.service";
import {getCurrentLocation} from "nativescript-geolocation";
import {getString, setString} from "tns-core-modules/application-settings";
import {SearchBar} from "tns-core-modules/ui/search-bar";
import {Image} from "tns-core-modules/ui/image";
var dialog = require("nativescript-dialog");
const firebase = require("nativescript-plugin-firebase");
@Component({
    selector: "ns-items",
    moduleId: module.id,
    templateUrl: "./restaurants.component.html",
    styleUrls: ['./restaurants.css']

})
export class restaurantsComponent implements AfterViewInit, OnInit {

    public select_hour: any;
    public select_mint: any;
    public  no_restaurant_found:any;
    public allrestaurants: Restaurant[] = [];
    public allrestaurantslength:any=1;
    restaurants: Array<Restaurant> = new Array<Restaurant>();
    data: string;
    public user_loc: locations[] = [];
public isContentVisible:any;
    private _mainContentText: string = "bsfnb hdv  hfhmnsb ihdvj";
    public Current_location: string = "Loding..";
    public user: string;
    public pass: string;
    public message: string = "";
    public isBusy = true;
    public loc: string;
    // This pattern makes use of Angular�s dependency injection implementation to inject an instance of the ItemService service into this class.
    // Angular knows about this service because it is included in your app�s main NgModule, defined in app.module.ts.
    constructor(private restaurantService: RestaurantService, private router: Router, private _changeDetectionRef: ChangeDetectorRef,
                private page: Page, private mapservice: mapService, private deliveraddressservice: DeliverAddressService) {


    }

    @ViewChild("timePicker") tp: ElementRef;
    @ViewChild("timePicker2") tp2: ElementRef;

    configure(timePicker: TimePicker) {
        timePicker.hour = 9;
        timePicker.minute = 25;
    }

    ngOnInit(): void {
        this.allrestaurantslength=1;
        this.isBusy=false;
        setString("deliver_to_user","ASAP");
        this.Current_location = "Loading..";
            this.isBusy=true;
        this.getCurrentlocationofuser();
        if(typeof(getString("user_id"))!== 'undefined') {
            let id = JSON.parse(getString("user_id"));
            this.getuserlocations();
        }
        let user_token=getString("access_token");
        if(user_token.length>2){

            this.getfirebasetoken();
        }

    }
    ////get firebase token
    getfirebasetoken(){
        console.log("called...");
        firebase.init({

        }).then(
            instance => {
                console.log("firebase.init done");
            },
            error => {
                console.log(`firebase.init error: ${error}`);
            }
        );

        firebase.getCurrentPushToken().then((token: string) => {
            // may be null if not known yet
            console.log("Current push token: " + token);

            this.restaurantService.update_firebase_token({"firebase_token":token})
                .subscribe((result) => {

                   console.log("firebase token........."+JSON.stringify(result));
                }, (error) => {
                    // this.onGetDataError(error);
                    console.log(JSON.stringify(error));
                });


        });
        firebase.addOnMessageReceivedCallback(
            function(message) {
               alert(message.body);
            }
        );
    }

    public getCurrentlocationofuser() {
        let that = this;
        let marker1;
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

                that.restaurantService.getaddress_from_api(loc.latitude, loc.longitude)
                    .subscribe((result) => {
                        let helper = JSON.parse(JSON.stringify(result));
                        console.log("cc1" + JSON.stringify(helper._body.address));
                        that.Current_location = helper._body.address;
                      //  alert(helper._body.address+"     "+helper._body.postalCode);
                        setString("user_address",helper._body.address);
                        setString("user_pc",helper._body.postalCode);
                        that.getRestaurantListFromApi(loc.latitude,loc.longitude);

                    }, (error) => {
                        console.log("Error in location" + JSON.stringify(error));
                    });


            }


        }, function (e) {
            console.log("Error: " + e.message);
        });


    }


    getuserlocations() {
        let id = JSON.parse(getString("user_id"));
        this.deliveraddressservice.get_user_locations_from_api(id)
            .subscribe((result) => {
                //this.onGetDataSuccess(result);
                let helper = JSON.stringify(result);
                let data = JSON.parse(helper);
                this.onsucces(data);
            }, (error) => {
                // this.onGetDataError(error);
                console.log(JSON.stringify(error));
            });
    }


    onsucces(data) {
        // alert("called");
        let that = this;
        for (let i = 0; i < data._body.userLocations.length; i++) {
            let item = new locations(data._body.userLocations[i].user_address, data._body.userLocations[i].user_postal_code);
            that.user_loc.push(item);

            //console.log("called");
            console.log("call" + that.user_loc[i]);


        }

    }

    setTime() {
        let timePicker: TimePicker = <TimePicker>this.tp.nativeElement;
        timePicker.hour = 5;
        timePicker.minute = 21;

    }



    ngAfterViewInit() {

        this._changeDetectionRef.detectChanges();

    }

    strigy: any;
    seperate: any;

    private getRestaurantListFromApi(lat,lan) {

        this.isBusy=true;
        console.log("from component"+lat+"   "+lan);
        //{lat: 51.517899, lan: -0.124439}
        this.restaurantService
            .getRestaurants({lat,lan})
            .subscribe(res => {
                this.message = (<any>res);
                console.log("--------------------------------------------------------------------------------------------------");
                console.log("responce "+JSON.stringify(res));
                console.log("--------------------------------------------------------------------------------------------------");
                this.allrestaurantslength=1;
                this.showrestaurants(res)

            },(error) => {

                console.log("error"+JSON.stringify(error));
                this.allrestaurantslength=0;
                this.isBusy=false;
                this.no_restaurant_found=error._body.message;


            });
    }


    showrestaurants(res:any){


        this.allrestaurants = new Array<Restaurant>();
        this.strigy = JSON.stringify(res);
        this.seperate = JSON.parse(this.strigy);

        for (let i = 0; i < this.seperate._body.restRangeList.length; i++) {
            let menutype: string[] = [];

            for (let j = 0; j < this.seperate._body.menus.length; j++) {
                if (this.seperate._body.menus[j].restaurant_id == this.seperate._body.restRangeList[i].restaurant_id) {
                    console.log(this.seperate._body.menus[j].restaurant_id);
                    console.log(this.seperate._body.restRangeList[i].restaurant_id);
                    menutype.push(this.seperate._body.menus[j].menu_type);
                    console.log(menutype);
                }
            }

            let restArr = this.seperate._body.restRangeList[i];
            let rest = new Restaurant(restArr.restaurant_id, restArr.restaurant_name, restArr.restaurant_address, restArr.restaurant_contect,
                restArr.restaurant_image_url, restArr.restaurant_delievery_time, restArr.restaurant_postal_code, restArr.restaurant_phone_no,
                restArr.restaurant_email, restArr.restaurant_password, restArr.restaurant_username, menutype);
            this.allrestaurants[i] = rest;
            this.restaurantService.restaurants[i] = rest;

        }

        this.isBusy=false;

    }

    /////for side drawer
    get mainContentText() {
        return this._mainContentText;
    }

    set mainContentText(value: string) {
        this._mainContentText = value;
    }


    onItemTap(args) {


        this.allrestaurants[args.index].id;
        console.log("------------------------ ItemTapped: " + args.index + "  " + this.allrestaurants[args.index].id);
        this.router.navigate(["/restaurants-detail", this.allrestaurants[args.index].id]);


    }

    selectdeliverlocation() {


        let token=getString("access_token");


        if(token ){


            if(token!="") {


                let layout: StackLayout = <StackLayout>this.page.getViewById("locationpicker");
                let llayout: StackLayout = <StackLayout>this.page.getViewById("timepicker");


                if (layout.visibility == "collapse") {

                    layout.visibility = "visible";
                    llayout.visibility = "collapse";

                } else {

                    layout.visibility = "collapse";
                }
            }
            else{




                let layout: AbsoluteLayout = <AbsoluteLayout>this.page.getViewById("customalert");

                layout.visibility="visible";

                /* let that=this;
             dialog.show({
                     title: "Attention",
                     message: "Please login first to add location!",
                     cancelButtonText: "Cancel",
                     okButtonText:"Login"

                 }
             ).then(function(r){

                 console.log("Result: " + r);
                 if(r==true){
                    // phone.dial(abc,false);
                     that.router.navigate(["/login"]);


                 }

             });*/

            }

        }
        else{




            let layout: AbsoluteLayout = <AbsoluteLayout>this.page.getViewById("customalert");

            layout.visibility="visible";

               /* let that=this;
            dialog.show({
                    title: "Attention",
                    message: "Please login first to add location!",
                    cancelButtonText: "Cancel",
                    okButtonText:"Login"

                }
            ).then(function(r){

                console.log("Result: " + r);
                if(r==true){
                   // phone.dial(abc,false);
                    that.router.navigate(["/login"]);


                }

            });*/

        }

    }

    selectdelivertime() {

        let layout: StackLayout = <StackLayout>this.page.getViewById("timepicker");
        let llayout: StackLayout = <StackLayout>this.page.getViewById("locationpicker");

        if (layout.visibility == "collapse") {

            layout.visibility = "visible";
            llayout.visibility = "collapse";
        } else {

            layout.visibility = "collapse";
        }
    }

    onPickerLoaded(args) {
        let timePicker = <timePickerModule.TimePicker>args.object;
        this.select_hour = timePicker.hour;
        this.select_mint = timePicker.minute;


        timePicker.hour = 9;
        timePicker.minute = 25;
    }

    ontapsetdeliverytime() {

        let timePicker: TimePicker = <TimePicker>this.tp.nativeElement;

        let lable: Label = <Label>this.page.getViewById("deliverytime");
        lable.text = "Today " + timePicker.hour + ":" + timePicker.minute;

        let layout: AbsoluteLayout = <AbsoluteLayout>this.page.getViewById("timepicker");
        layout.visibility = "collapse";
       // alert(lable.text);
        setString("deliver_to_user",lable.text);

    }

    onTapTomorrowSet() {

        let timePicker2: TimePicker = <TimePicker>this.tp2.nativeElement;

        let lable: Label = <Label>this.page.getViewById("deliverytime");
        lable.text = "Tomorrow " + timePicker2.hour + ":" + timePicker2.minute;

        let layout: AbsoluteLayout = <AbsoluteLayout>this.page.getViewById("timepicker");
        layout.visibility = "collapse";
       // alert(lable.text);
        setString("deliver_to_user",lable.text);
    }

    onempty() {


    }

    onSearchRestaurants(){

        let sbar:SearchBar=<SearchBar>this .page.getViewById("searchbar");
        sbar.visibility="visible";
        let simage:Image=<Image>this.page.getViewById("simage");
        simage.visibility="collapse";
        this.allrestaurantslength=1;
    }

    onSearchTextChanged(args){
        let searchBar = <SearchBar>args.object;

        let postalCode=searchBar.text;
        this.isBusy = true;

        this.allrestaurants=null;
        this.allrestaurantslength=1;
        this.restaurantService.searchRestaurantsfromapi(postalCode)
            .subscribe((result) => {
                let helper = JSON.stringify(result);
                let data = JSON.parse(helper);
                console.log("data"+JSON.stringify(data.status));
                this.allrestaurantslength=1;
                this.isBusy=false;

                this.showrestaurants(data);

            }, (error) => {
                // this.onGetDataError(error);
                this.isBusy=false;
                this.allrestaurantslength=0;
                // alert(JSON.stringify(error._body.message));


            });
       console.log("textchange"+searchBar.text);
    }
    onSubmit(args){


        let searchBar = <SearchBar>args.object;
        console.log("submit"+searchBar.text);
        let sbar:SearchBar=<SearchBar>this .page.getViewById("searchbar");
        sbar.visibility="collapse";
        let simage:Image=<Image>this.page.getViewById("simage");
        simage.visibility="visible";

       let postalCode=searchBar.text;
        this.isBusy = true;
        this.allrestaurants=null;

        this.restaurantService.searchRestaurantsfromapi(postalCode)
            .subscribe((result) => {
                let helper = JSON.stringify(result);
                let data = JSON.parse(helper);
                console.log("data"+JSON.stringify(data.status));
                    this.showrestaurants(data);

            }, (error) => {
                this.isBusy=false;


            });



    }
    onClear(args){

        let sbar:SearchBar=<SearchBar>this .page.getViewById("searchbar");
        sbar.visibility="collapse";
        let simage:Image=<Image>this.page.getViewById("simage");
        simage.visibility="visible";
    }

    onAlertCancel(){
        let layout: AbsoluteLayout = <AbsoluteLayout>this.page.getViewById("customalert");
        layout.visibility="collapse";

    }
    OnAlertOK(){

        let layout: AbsoluteLayout = <AbsoluteLayout>this.page.getViewById("customalert");
        layout.visibility="collapse";
        this.router.navigate(["/login"]);
    }
}


