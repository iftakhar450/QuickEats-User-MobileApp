"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var page_1 = require("ui/page");
var router_1 = require("@angular/router");
var nativescript_geolocation_1 = require("nativescript-geolocation");
var map_service_1 = require("./map.service");
var http = require("http");
var mapsModule = require("nativescript-google-maps-sdk");
var nativescript_google_places_autocomplete_1 = require("nativescript-google-places-autocomplete");
var location_1 = require("./location");
//import * as GooglePlaces from 'nativescript-plugin-google-places';
var mapsComponent = /** @class */ (function () {
    function mapsComponent(router, mapservice, page) {
        this.router = router;
        this.mapservice = mapservice;
        this.page = page;
        this.latitude = 0;
        this.longitude = 0;
        this.locations = [];
        this.count = 0;
        this.apikey = "AIzaSyDyamBO1Heo8nwXfy5vwk6QrnTt--mSCVM"; //this key privided by google on enabling tha geocoding api
    }
    mapsComponent.prototype.ngOnInit = function () {
        this.getCurrentlocationofuser();
        //  this.searchLocation();
    };
    mapsComponent.prototype.onlocationTap = function (args) {
        var _this = this;
        console.log(this.locations[args.index].loc_id);
        var API_KEY = "AIzaSyDyamBO1Heo8nwXfy5vwk6QrnTt--mSCVM";
        var googlePlacesAutocomplete = new nativescript_google_places_autocomplete_1.GooglePlacesAutocomplete(API_KEY);
        googlePlacesAutocomplete.getPlaceById(this.locations[args.index].loc_id)
            .then(function (places) {
            _this.selected_latitude = places.latitude;
            _this.selected_longitude = places.longitude;
            console.log("----------------------Succes---------------");
            console.log(_this.selected_latitude + "---------" + _this.selected_longitude);
            _this.onuserSelectedl_location();
            console.log("----------------------Succes---------------");
        }, (function (error) {
            console.log("----------------------error---------------");
            console.log(error);
            console.log("----------------------error---------------");
        }));
    };
    mapsComponent.prototype.onSearchbartap = function () {
        var sbar = this.page.getViewById("searchbar");
        sbar.visibility = "visible";
    };
    mapsComponent.prototype.onSearchTextChanged = function (args) {
        var searchBar = args.object;
        var searchtext = searchBar.text;
        console.log(searchtext);
        this.searchLocation(searchtext);
    };
    mapsComponent.prototype.onSubmit = function (args) {
        /*   let searchBar = <SearchBar>args.object;
           console.log("submit"+searchBar.text);
           let sbar:SearchBar=<SearchBar>this .page.getViewById("searchbar");
           sbar.visibility="collapse";*/
    };
    mapsComponent.prototype.onClear = function (args) {
        var sbar = this.page.getViewById("searchbar");
        sbar.visibility = "collapse";
    };
    mapsComponent.prototype.searchLocation = function (text) {
        var locationsTem = [];
        var API_KEY = "AIzaSyDyamBO1Heo8nwXfy5vwk6QrnTt--mSCVM";
        var googlePlacesAutocomplete = new nativescript_google_places_autocomplete_1.GooglePlacesAutocomplete(API_KEY);
        googlePlacesAutocomplete.search(text)
            .then(function (places) {
            //console.log(JSON.stringify(places));
            for (var i = 0; i < places.length; i++) {
                var loc = new location_1.SearchLocations(places[i].placeId, places[i].description);
                // console.log("id"+places[i].placeId);
                // console.log("description"+places[i].description);
                locationsTem.push(loc);
            }
            /* console.log("-------------------locations--------------------------");
             console.log(JSON.stringify(this.locations));
             console.log("-------------------locations--------------------------");*/
        }, (function (error) {
            /* console.log("----------------------error---------------");
             console.log(error);
             console.log("----------------------error---------------")*/
        }));
        this.locations = locationsTem;
    };
    mapsComponent.prototype.getCurrentlocationofuser = function () {
        var that = this;
        var your_current_loc;
        var apikeyforloc = "AIzaSyDyamBO1Heo8nwXfy5vwk6QrnTt--mSCVM"; //this key privided by google on enabling tha geocoding api
        var location = nativescript_geolocation_1.getCurrentLocation({
            desiredAccuracy: 3,
            updateDistance: 10,
            maximumAge: 20000,
            timeout: 20000
        }).then(function (loc) {
            if (loc) {
                console.log("Cu lat/long: " + loc.latitude, loc.longitude);
                that.latitude = loc.latitude;
                that.longitude = loc.longitude;
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
    };
    mapsComponent.prototype.onMapReady = function (args) {
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
    };
    mapsComponent.prototype.onCameraChanged = function (args) {
        this.selected_latitude = args.camera.latitude;
        this.selected_longitude = args.camera.longitude;
    };
    mapsComponent.prototype.onuserSelectedl_location = function () {
        var _this = this;
        var that = this;
        console.log("your location is:" + this.selected_latitude + "   " + this.selected_longitude);
        this.mapservice.getaddress_from_api(this.selected_latitude, this.selected_longitude)
            .subscribe(function (result) {
            var helper = JSON.parse(JSON.stringify(result));
            _this.mapservice.postal_code = helper._body.postalCode;
            _this.mapservice.select_address = helper._body.address;
            _this.router.navigate(["/add-new-address"]);
        }, function (error) {
            console.log(JSON.stringify(error));
        });
    };
    mapsComponent.prototype.ngOnDestroy = function () {
        //alert("on destroy called");
    };
    mapsComponent = __decorate([
        core_1.Component({
            selector: "ns-items",
            moduleId: module.id,
            templateUrl: "./maps.component.html",
            styleUrls: ['./maps.css']
        }),
        __metadata("design:paramtypes", [router_1.Router, map_service_1.mapService, page_1.Page])
    ], mapsComponent);
    return mapsComponent;
}());
exports.mapsComponent = mapsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwcy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJtYXBzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFrRDtBQUVsRCxnQ0FBK0I7QUFFL0IsMENBQXlDO0FBQ3pDLHFFQUFxSTtBQUVySSw2Q0FBeUM7QUFDekMsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQzNCLElBQUksVUFBVSxHQUFHLE9BQU8sQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO0FBQ3pELG1HQUFtRjtBQUduRix1Q0FBMkM7QUFLM0Msb0VBQW9FO0FBUXBFO0lBU0ksdUJBQW9CLE1BQWMsRUFBUyxVQUFxQixFQUFTLElBQVM7UUFBOUQsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFTLGVBQVUsR0FBVixVQUFVLENBQVc7UUFBUyxTQUFJLEdBQUosSUFBSSxDQUFLO1FBTC9FLGFBQVEsR0FBSyxDQUFDLENBQUM7UUFDZixjQUFTLEdBQUssQ0FBQyxDQUFDO1FBQ1osY0FBUyxHQUFzQixFQUFFLENBQUM7UUFDbEMsVUFBSyxHQUFRLENBQUMsQ0FBQztRQXlMbkIsV0FBTSxHQUFXLHlDQUF5QyxDQUFDLENBQUUsMkRBQTJEO0lBckwzSCxDQUFDO0lBR0QsZ0NBQVEsR0FBUjtRQUdPLElBQUksQ0FBQyx3QkFBd0IsRUFBRSxDQUFDO1FBRXJDLDBCQUEwQjtJQUM1QixDQUFDO0lBRUQscUNBQWEsR0FBYixVQUFjLElBQUk7UUFBbEIsaUJBeUJDO1FBdEJFLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDOUMsSUFBSSxPQUFPLEdBQUcseUNBQXlDLENBQUM7UUFDeEQsSUFBSSx3QkFBd0IsR0FBRyxJQUFJLGtFQUF3QixDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRXJFLHdCQUF3QixDQUFDLFlBQVksQ0FBQyxJ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QUEsQUF4TkQsSUF3TkM7QUF4Tlksc0NBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IFRleHRGaWVsZCB9IGZyb20gXCJ1aS90ZXh0LWZpZWxkXCJcclxuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7XHJcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IGlzRW5hYmxlZCwgZW5hYmxlTG9jYXRpb25SZXF1ZXN0LCBnZXRDdXJyZW50TG9jYXRpb24sIHdhdGNoTG9jYXRpb24sIGRpc3RhbmNlLCBjbGVhcldhdGNoIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1nZW9sb2NhdGlvblwiO1xyXG5pbXBvcnQgeyBNYXBWaWV3LCBNYXJrZXIsIFBvc2l0aW9uIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1nb29nbGUtbWFwcy1zZGtcIjtcclxuaW1wb3J0IHttYXBTZXJ2aWNlfSBmcm9tIFwiLi9tYXAuc2VydmljZVwiO1xyXG52YXIgaHR0cCA9IHJlcXVpcmUoXCJodHRwXCIpO1xyXG52YXIgbWFwc01vZHVsZSA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtZ29vZ2xlLW1hcHMtc2RrXCIpO1xyXG5pbXBvcnQgeyBHb29nbGVQbGFjZXNBdXRvY29tcGxldGUgfSBmcm9tICduYXRpdmVzY3JpcHQtZ29vZ2xlLXBsYWNlcy1hdXRvY29tcGxldGUnO1xyXG5pbXBvcnQge3NldFN0cmluZ30gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvYXBwbGljYXRpb24tc2V0dGluZ3NcIjtcclxuaW1wb3J0IHtJdGVtc30gZnJvbSBcIi4uL215b3JkZXJzL0Zvb2RpdGVtXCI7XHJcbmltcG9ydCB7U2VhcmNoTG9jYXRpb25zfSBmcm9tIFwiLi9sb2NhdGlvblwiO1xyXG5pbXBvcnQge1NlYXJjaEJhcn0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvc2VhcmNoLWJhclwiO1xyXG5pbXBvcnQge1N0YWNrTGF5b3V0fSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9sYXlvdXRzL3N0YWNrLWxheW91dFwiO1xyXG5pbXBvcnQge0ltYWdlfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9pbWFnZVwiO1xyXG5cclxuLy9pbXBvcnQgKiBhcyBHb29nbGVQbGFjZXMgZnJvbSAnbmF0aXZlc2NyaXB0LXBsdWdpbi1nb29nbGUtcGxhY2VzJztcclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogXCJucy1pdGVtc1wiLFxyXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICAgIHRlbXBsYXRlVXJsOiBcIi4vbWFwcy5jb21wb25lbnQuaHRtbFwiLFxyXG4gICAgc3R5bGVVcmxzOiBbJy4vbWFwcy5jc3MnXVxyXG5cclxufSlcclxuZXhwb3J0IGNsYXNzIG1hcHNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG5cclxuIFxyXG4gICBcclxucHVibGljIGxhdGl0dWRlOmFueT0wO1xyXG5wdWJsaWMgbG9uZ2l0dWRlOmFueT0wO1xyXG4gICAgcHVibGljIGxvY2F0aW9uczogU2VhcmNoTG9jYXRpb25zW10gPSBbXTtcclxuICAgIHB1YmxpYyBjb3VudDpudW1iZXI9MDtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlcjogUm91dGVyLHByaXZhdGUgbWFwc2VydmljZTptYXBTZXJ2aWNlLHByaXZhdGUgcGFnZTpQYWdlKSB7XHJcbiAgICAgICBcclxuICAgIH1cclxuXHJcbiAgIFxyXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XHJcblxyXG5cclxuICAgICAgICAgICB0aGlzLmdldEN1cnJlbnRsb2NhdGlvbm9mdXNlcigpO1xyXG5cclxuICAgICAgLy8gIHRoaXMuc2VhcmNoTG9jYXRpb24oKTtcclxuICAgIH1cclxuXHJcbiAgICBvbmxvY2F0aW9uVGFwKGFyZ3Mpe1xyXG5cclxuXHJcbiAgICAgICBjb25zb2xlLmxvZyh0aGlzLmxvY2F0aW9uc1thcmdzLmluZGV4XS5sb2NfaWQpO1xyXG4gICAgICAgIGxldCBBUElfS0VZID0gXCJBSXphU3lEeWFtQk8xSGVvOG53WGZ5NXZ3azZRcm5UdC0tbVNDVk1cIjtcclxuICAgICAgICBsZXQgZ29vZ2xlUGxhY2VzQXV0b2NvbXBsZXRlID0gbmV3IEdvb2dsZVBsYWNlc0F1dG9jb21wbGV0ZShBUElfS0VZKTtcclxuXHJcbiAgICAgICAgZ29vZ2xlUGxhY2VzQXV0b2NvbXBsZXRlLmdldFBsYWNlQnlJZCh0aGlzLmxvY2F0aW9uc1thcmdzLmluZGV4XS5sb2NfaWQpXHJcbiAgICAgICAgICAgIC50aGVuKChwbGFjZXM6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZF9sYXRpdHVkZT1wbGFjZXMubGF0aXR1ZGU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkX2xvbmdpdHVkZT1wbGFjZXMubG9uZ2l0dWRlO1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVN1Y2Nlcy0tLS0tLS0tLS0tLS0tLVwiKTtcclxuXHJcbiAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuc2VsZWN0ZWRfbGF0aXR1ZGUrXCItLS0tLS0tLS1cIit0aGlzLnNlbGVjdGVkX2xvbmdpdHVkZSk7XHJcbiAgICAgICAgICAgICAgIHRoaXMub251c2VyU2VsZWN0ZWRsX2xvY2F0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIi0tLS0tLS0tLS0tLS0tLS0tLS0tLS1TdWNjZXMtLS0tLS0tLS0tLS0tLS1cIilcclxuXHJcbiAgICAgICAgICAgIH0sIChlcnJvciA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIi0tLS0tLS0tLS0tLS0tLS0tLS0tLS1lcnJvci0tLS0tLS0tLS0tLS0tLVwiKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiLS0tLS0tLS0tLS0tLS0tLS0tLS0tLWVycm9yLS0tLS0tLS0tLS0tLS0tXCIpXHJcbiAgICAgICAgICAgIH0pKTtcclxuXHJcblxyXG4gICAgfVxyXG5cclxuICAgIG9uU2VhcmNoYmFydGFwKCl7XHJcblxyXG4gICAgICAgIGxldCBzYmFyOlN0YWNrTGF5b3V0PTxTdGFja0xheW91dD50aGlzIC5wYWdlLmdldFZpZXdCeUlkKFwic2VhcmNoYmFyXCIpO1xyXG4gICAgICAgIHNiYXIudmlzaWJpbGl0eT1cInZpc2libGVcIjtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgb25TZWFyY2hUZXh0Q2hhbmdlZChhcmdzKXtcclxuXHJcbiAgICAgICAgbGV0IHNlYXJjaEJhciA9IDxTZWFyY2hCYXI+YXJncy5vYmplY3Q7XHJcblxyXG4gICAgICAgIGxldCBzZWFyY2h0ZXh0PXNlYXJjaEJhci50ZXh0O1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHNlYXJjaHRleHQpO1xyXG4gICAgICAgIHRoaXMuc2VhcmNoTG9jYXRpb24oc2VhcmNodGV4dCk7XHJcblxyXG4gICAgfVxyXG4gICAgb25TdWJtaXQoYXJncyl7XHJcblxyXG5cclxuICAgICAvKiAgIGxldCBzZWFyY2hCYXIgPSA8U2VhcmNoQmFyPmFyZ3Mub2JqZWN0O1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwic3VibWl0XCIrc2VhcmNoQmFyLnRleHQpO1xyXG4gICAgICAgIGxldCBzYmFyOlNlYXJjaEJhcj08U2VhcmNoQmFyPnRoaXMgLnBhZ2UuZ2V0Vmlld0J5SWQoXCJzZWFyY2hiYXJcIik7XHJcbiAgICAgICAgc2Jhci52aXNpYmlsaXR5PVwiY29sbGFwc2VcIjsqL1xyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG4gICAgfVxyXG4gICAgb25DbGVhcihhcmdzKXtcclxuICAgICAgICBsZXQgc2JhcjpTdGFja0xheW91dD08U3RhY2tMYXlvdXQ+dGhpcyAucGFnZS5nZXRWaWV3QnlJZChcInNlYXJjaGJhclwiKTtcclxuICAgICAgICBzYmFyLnZpc2liaWxpdHk9XCJjb2xsYXBzZVwiO1xyXG5cclxuICAgIH1cclxuICAgIHNlYXJjaExvY2F0aW9uKHRleHQpe1xyXG5cclxuXHJcbiAgICBsZXQgbG9jYXRpb25zVGVtOiBTZWFyY2hMb2NhdGlvbnNbXSA9IFtdO1xyXG4gICAgICAgIGxldCBBUElfS0VZID0gXCJBSXphU3lEeWFtQk8xSGVvOG53WGZ5NXZ3azZRcm5UdC0tbVNDVk1cIjtcclxuICAgICAgICBsZXQgZ29vZ2xlUGxhY2VzQXV0b2NvbXBsZXRlID0gbmV3IEdvb2dsZVBsYWNlc0F1dG9jb21wbGV0ZShBUElfS0VZKTtcclxuXHJcbiAgICAgICAgZ29vZ2xlUGxhY2VzQXV0b2NvbXBsZXRlLnNlYXJjaCh0ZXh0KVxyXG4gICAgICAgICAgICAudGhlbigocGxhY2VzOiBhbnkpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHBsYWNlcykpO1xyXG4gICAgICAgICAgICAgICAgZm9yKGxldCBpPTA7aTxwbGFjZXMubGVuZ3RoO2krKyl7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGxldCBsb2M9bmV3IFNlYXJjaExvY2F0aW9ucyhwbGFjZXNbaV0ucGxhY2VJZCxwbGFjZXNbaV0uZGVzY3JpcHRpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJpZFwiK3BsYWNlc1tpXS5wbGFjZUlkKTtcclxuICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiZGVzY3JpcHRpb25cIitwbGFjZXNbaV0uZGVzY3JpcHRpb24pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBsb2NhdGlvbnNUZW0ucHVzaChsb2MpO1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICAgICAvKiBjb25zb2xlLmxvZyhcIi0tLS0tLS0tLS0tLS0tLS0tLS1sb2NhdGlvbnMtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVwiKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHRoaXMubG9jYXRpb25zKSk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIi0tLS0tLS0tLS0tLS0tLS0tLS1sb2NhdGlvbnMtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVwiKTsqL1xyXG5cclxuICAgICAgICAgICAgfSwgKGVycm9yID0+IHtcclxuICAgICAgICAgICAgICAgLyogY29uc29sZS5sb2coXCItLS0tLS0tLS0tLS0tLS0tLS0tLS0tZXJyb3ItLS0tLS0tLS0tLS0tLS1cIik7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIi0tLS0tLS0tLS0tLS0tLS0tLS0tLS1lcnJvci0tLS0tLS0tLS0tLS0tLVwiKSovXHJcbiAgICAgICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgdGhpcy5sb2NhdGlvbnM9bG9jYXRpb25zVGVtO1xyXG5cclxuICAgIH1cclxuXHJcblxyXG4gICAgbWFwOiBNYXBWaWV3O1xyXG4gICAgbWFya2VyOiBNYXJrZXI7XHJcblxyXG5cclxuICAgIHNlbGVjdGVkX2xhdGl0dWRlOiBhbnk7XHJcbiAgICBzZWxlY3RlZF9sb25naXR1ZGU6IGFueTtcclxuXHJcbiAgICBwdWJsaWMgZ2V0Q3VycmVudGxvY2F0aW9ub2Z1c2VyKCkge1xyXG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuXHJcbiAgICAgICAgbGV0IHlvdXJfY3VycmVudF9sb2M7XHJcbiAgICAgICAgbGV0IGFwaWtleWZvcmxvYzogc3RyaW5nID0gXCJBSXphU3lEeWFtQk8xSGVvOG53WGZ5NXZ3azZRcm5UdC0tbVNDVk1cIjsgIC8vdGhpcyBrZXkgcHJpdmlkZWQgYnkgZ29vZ2xlIG9uIGVuYWJsaW5nIHRoYSBnZW9jb2RpbmcgYXBpXHJcbiAgICAgICAgdmFyIGxvY2F0aW9uID0gZ2V0Q3VycmVudExvY2F0aW9uKHtcclxuICAgICAgICAgICAgZGVzaXJlZEFjY3VyYWN5OiAzLFxyXG4gICAgICAgICAgICB1cGRhdGVEaXN0YW5jZTogMTAsXHJcbiAgICAgICAgICAgIG1heGltdW1BZ2U6IDIwMDAwLFxyXG4gICAgICAgICAgICB0aW1lb3V0OiAyMDAwMFxyXG4gICAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKGxvYykge1xyXG4gICAgICAgICAgICBpZiAobG9jKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkN1IGxhdC9sb25nOiBcIiArIGxvYy5sYXRpdHVkZSwgbG9jLmxvbmdpdHVkZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQubGF0aXR1ZGU9bG9jLmxhdGl0dWRlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQubG9uZ2l0dWRlPWxvYy5sb25naXR1ZGU7XHJcblxyXG4gICAgICAgICAgICAgICAgLyp0aGF0Lm1hcmtlciA9IG5ldyBtYXBzTW9kdWxlLk1hcmtlcigpO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5tYXJrZXIucG9zaXRpb24gPSBtYXBzTW9kdWxlLlBvc2l0aW9uLnBvc2l0aW9uRnJvbUxhdExuZyh0aGF0LmxhdGl0dWRlLCB0aGF0LmxvbmdpdHVkZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhhdC5tYXJrZXIudXNlckRhdGEgPSB7IGluZGV4OiAxIH07XHJcbiAgICAgICAgICAgICAgICB0aGF0Lm1hcmtlci5zaG93SW5mb1dpbmRvdygpO1xyXG4gICAgICAgICAgICAgICAgdGhhdC5tYXAuYWRkTWFya2VyKHRoYXQubWFya2VyKTsqL1xyXG4gICAgICAgICAgICAgICAgICAgLy8gdGhhdC5tYXAudXBkYXRlQ2FtZXJhKCk7XHJcblxyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgfSwgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvcjogXCIgKyBlLm1lc3NhZ2UpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICB9XHJcblxyXG5cclxuICAgIG9uTWFwUmVhZHkoYXJncykge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiTWFwIFJlYWR5XCIpO1xyXG5cclxuXHJcblxyXG4gICAgICAgIHRoaXMubWFwID0gYXJncy5vYmplY3Q7XHJcbiAgICAgIC8qICB0aGlzLm1hcmtlciA9IG5ldyBtYXBzTW9kdWxlLk1hcmtlcigpO1xyXG4gICAgICAgdGhpcy5tYXJrZXIucG9zaXRpb24gPSBtYXBzTW9kdWxlLlBvc2l0aW9uLnBvc2l0aW9uRnJvbUxhdExuZyh0aGlzLmxhdGl0dWRlLCB0aGlzLmxvbmdpdHVkZSk7XHJcbiAgICAgIC8hKiAgdGhpcy5tYXJrZXIudGl0bGUgPSBcIlN5ZG5leVwiO1xyXG4gICAgICAgIHRoaXMubWFya2VyLnNuaXBwZXQgPSBcIkF1c3RyYWxpYVwiOyohL1xyXG4gICAgICAgIHRoaXMubWFya2VyLnVzZXJEYXRhID0geyBpbmRleDogMSB9O1xyXG4gICAgICAgIHRoaXMubWFya2VyLnNob3dJbmZvV2luZG93KCk7XHJcbiAgICAgICAgICB0aGlzLm1hcC5hZGRNYXJrZXIodGhpcy5tYXJrZXIpOyovXHJcbiAgICAgICAgLy8gdGhpcy5tYXAudXBkYXRlQ2FtZXJhKCk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgICAgICBcclxuICAgICAgIG9uQ2FtZXJhQ2hhbmdlZChhcmdzKSB7XHJcbiAgICAgICAgICAgdGhpcy5zZWxlY3RlZF9sYXRpdHVkZSA9IGFyZ3MuY2FtZXJhLmxhdGl0dWRlO1xyXG4gICAgICAgICAgIHRoaXMuc2VsZWN0ZWRfbG9uZ2l0dWRlPWFyZ3MuY2FtZXJhLmxvbmdpdHVkZTtcclxuXHJcblxyXG5cclxuICAgICAgIH1cclxuXHJcbiAgIFxyXG4gICAgICAgYXBpa2V5OiBzdHJpbmcgPSBcIkFJemFTeUR5YW1CTzFIZW84bndYZnk1dndrNlFyblR0LS1tU0NWTVwiOyAgLy90aGlzIGtleSBwcml2aWRlZCBieSBnb29nbGUgb24gZW5hYmxpbmcgdGhhIGdlb2NvZGluZyBhcGlcclxuICAgICAgIGFkZHJlczogc3RyaW5nXHJcbiAgICAgICBvbnVzZXJTZWxlY3RlZGxfbG9jYXRpb24oKSB7XHJcbiAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgICAgIGNvbnNvbGUubG9nKFwieW91ciBsb2NhdGlvbiBpczpcIiArIHRoaXMuc2VsZWN0ZWRfbGF0aXR1ZGUgKyBcIiAgIFwiICsgdGhpcy5zZWxlY3RlZF9sb25naXR1ZGUpO1xyXG4gICAgICAgICAgICAgICAgIHRoaXMubWFwc2VydmljZS5nZXRhZGRyZXNzX2Zyb21fYXBpKHRoaXMuc2VsZWN0ZWRfbGF0aXR1ZGUsdGhpcy5zZWxlY3RlZF9sb25naXR1ZGUpXHJcbiAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgbGV0IGhlbHBlcj1KU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHJlc3VsdCkpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgIHRoaXMubWFwc2VydmljZS5wb3N0YWxfY29kZT1oZWxwZXIuX2JvZHkucG9zdGFsQ29kZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICB0aGlzLm1hcHNlcnZpY2Uuc2VsZWN0X2FkZHJlc3M9aGVscGVyLl9ib2R5LmFkZHJlc3M7XHJcbiAgICAgICAgICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCIvYWRkLW5ldy1hZGRyZXNzXCJdKTtcclxuICAgICAgICAgICAgICAgfSwgKGVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShlcnJvcikpO1xyXG4gICAgICAgICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgIH1cclxuICAgIHB1YmxpYyBuZ09uRGVzdHJveSgpIHtcclxuICAgICAgLy9hbGVydChcIm9uIGRlc3Ryb3kgY2FsbGVkXCIpO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuIl19