import { Component, OnInit } from "@angular/core";
import { TextField } from "ui/text-field"
import { Page } from "ui/page";
import {MydetailService} from "./mydetail.component.service";
import {Label} from "tns-core-modules/ui/label";
import {TimePicker} from "tns-core-modules/ui/time-picker";
import {AbsoluteLayout} from "tns-core-modules/ui/layouts/absolute-layout";
import {setString,getString,setNumber,getNumber,setBoolean,getBoolean} from "tns-core-modules/application-settings";

@Component({
    selector: "ns-items",
    moduleId: module.id,
    templateUrl: "./mydetail.component.html",
    styleUrls: ['./mydetail.css']

})
export class MydetailComponent implements OnInit {




    // This pattern makes use of Angular�s dependency injection implementation to inject an instance of the ItemService service into this class.
    // Angular knows about this service because it is included in your app�s main NgModule, defined in app.module.ts.
    public name:string="";
    public username :string="";
    public phoneno:string="";
    public user:any;


    constructor(private mydetailService: MydetailService,private page: Page) { }

    ngOnInit() {

        let token=getString("access_token");
      let id=JSON.parse(getString("user_id"));

       console.log("token="+token);
     console.log("id="+id);

       this.getUserProfile(id);

    }


    getUserProfile(id) {
        this.mydetailService.getUserProfileFromApi(id)
            .subscribe((result) => {
                let string_response = JSON.stringify(result);
                let helper = JSON.parse(string_response);

                this.name=helper._body.response.user_name;
                this.phoneno=helper._body.response.user_mobile_no;
                this.user=helper._body.response;
                this.username="your account email address is "+helper._body.response.user_username+".You can change this by visting the Quickeats website";

            }, (error) => {
                //this.onGetDataError(error);
                console.log(JSON.stringify(error));
                alert( console.log(JSON.stringify(error.message)));
            });
    }

    private onGetDataSuccess(res) {

      // console.log("fjsdfh"+JSON.stringify(res));

    }

    private onGetDataError(error: Response | any) {
        const body = error.json() || "";
        const err = body.error || JSON.stringify(body);
        console.log("onGetDataError: " + err);
    }


    editprofile(){

        let layout: AbsoluteLayout = <AbsoluteLayout>this.page.getViewById("editprofile");
        if (layout.visibility == "collapse") {

            layout.visibility = "visible";
        } else {

            layout.visibility = "collapse";
        }
    }


    onSaveEditProfile(){
        this.user.user_name=this.name;
        this.user.user_mobile_no=this.phoneno;

        this.mydetailService.updateuserProfileFromApi(this.user)
           .subscribe((result) => {
             console.log("update result"+result);

            }, (error) => {
                //this.onGetDataError(error);
                console.log(JSON.stringify(error));
            });

        let layout: AbsoluteLayout = <AbsoluteLayout>this.page.getViewById("editprofile");
        layout.visibility = "collapse";



    }

}

