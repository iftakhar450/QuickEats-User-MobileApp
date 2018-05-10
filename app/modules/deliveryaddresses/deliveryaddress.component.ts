import { Component, OnInit } from "@angular/core";
import { TextField } from "ui/text-field"
import { Page } from "ui/page";
import {DeliverAddressService} from "./deliveryaddress.service";
import {locations} from "./deliveryaddress";
import {getString} from "tns-core-modules/application-settings";
var http = require("http");

@Component({
    selector: "ns-items",
    moduleId: module.id,
    templateUrl: "./deliveryaddresses.component.html",
    styleUrls: ['./deliveryaddresses.css']

})
export class deliveryaddressComponent implements OnInit {

    public login_email: string;
    public login_possword: string;

        public user_loc:locations[]=[];


    // This pattern makes use of Angular�s dependency injection implementation to inject an instance of the ItemService service into this class.
    // Angular knows about this service because it is included in your app�s main NgModule, defined in app.module.ts.
    constructor(private page: Page,private deliveraddressservice:DeliverAddressService) {



    }

    ngOnInit(): void {
        this.get_user_locations();
    }


    get_user_locations() {
        let id=JSON.parse(getString("user_id"));

        this.deliveraddressservice.get_user_locations_from_api(id)
            .subscribe((result) => {
                //this.onGetDataSuccess(result);
                let helper=JSON.stringify(result);
                let data =JSON.parse(helper);
                    this.onsucces(data);






            }, (error) => {
               // this.onGetDataError(error);
                console.log(JSON.stringify(error));
            });
    }



    onsucces(data){
        //console.log(JSON.stringify(data.userLocations));
            let that=this;
        for(let i=0;i<data._body.userLocations.length;i++){
            let item=new locations(data._body.userLocations[i].user_address,data._body.userLocations[i].user_postal_code);
                that.user_loc.push(item);

            //console.log("called");
           console.log("call"+that.user_loc[i]);


        }

    }

}

