import { Component, OnInit } from "@angular/core";
import { TextField } from "ui/text-field"
import { Page } from "ui/page";
import {mapService} from "../maps/map.service";
import {setString,getString,setNumber,getNumber,setBoolean,getBoolean} from "tns-core-modules/application-settings";
import {AddnewAddressService} from "./add-new-address.service";
import { Router } from "@angular/router";
@Component({
    selector: "ns-items",
    moduleId: module.id,
    templateUrl: "./add-new-address.component.html",
    styleUrls: ['./add-new-address.css']

})
export class addnewaddressComponent implements OnInit {


    public nickname: string;
    public flatnumber: string;
    public address_lin1: string;
    public post_code: string;
    public phone_number: string;
    public instruction_to_rider: string;


    // This pattern makes use of Angular�s dependency injection implementation to inject an instance of the ItemService service into this class.
    // Angular knows about this service because it is included in your app�s main NgModule, defined in app.module.ts.


    constructor(private router:Router,private page: Page,private mapservice:mapService,private addnewlocservice:AddnewAddressService) { }

    ngOnInit(): void {

        this.address_lin1=this.mapservice.select_address;
        this.post_code=this.mapservice.postal_code;

    }

    submitLocation(){
    console.log("called");
        let that=this;
        this.addnewlocservice.post_new_location({ user_id:getString("user_id"),user_nickname:this.nickname,user_flat_no:this.flatnumber,user_address:this.address_lin1,user_postal_code:this.post_code,user_phone_no:this.phone_number,rider_instructions:this.instruction_to_rider })
            .subscribe(res => {
                console.log("ffff" + JSON.stringify(res));
                let helper = JSON.stringify(res);
                let data = JSON.parse(helper);

                alert(JSON.stringify(data._body.message));
                that.router.navigate(['/deliveryaddress'])

            },
                (error) => {
                    //this.onGetDataError(error);
                    ///alert("error");
                    let helper = JSON.stringify(error);
                    let data = JSON.parse(helper);
                    console.log("error"+JSON.stringify(data._body));
                    alert(JSON.stringify(data._body.error.message))


                });



    }

}
