import { Component, OnInit } from "@angular/core";
import { TextField } from "ui/text-field"
import { Page } from "ui/page";
import {RouterExtensions} from "nativescript-angular";
import {changePasswordService} from "./change-password.service";
import {SideDrawerPageComponent} from "../shared/side-drawer-page/side-drawer-page.component";
import {MydetailService} from "../mydetail/mydetail.component.service";

import {setString,getString,setNumber,getNumber,setBoolean,getBoolean} from "tns-core-modules/application-settings";
import { Router } from "@angular/router";


@Component({
    selector: "ns-items",
    moduleId: module.id,
    templateUrl: "./change-password.component.html",
    styleUrls: ['./change-password.css']

})
export class changePasswordComponent implements OnInit {

    public current_password: string;
    public new_password1: string;
    public new_password2: string;
    public sidedrawer:SideDrawerPageComponent;

    // This pattern makes use of Angular�s dependency injection implementation to inject an instance of the ItemService service into this class.
    // Angular knows about this service because it is included in your app�s main NgModule, defined in app.module.ts.
    constructor(private routerExtensions: RouterExtensions,private page: Page,private router:Router,private changepasswordservice:changePasswordService) {



    }

    ngOnInit(): void {




    }
    onNavBtnTap() {
        // This code will be called only in Android.
        console.log("Navigation button tapped!");
    }
    togglepassowrdone() {

        let tfield: TextField = <TextField>this.page.getViewById("cpassword");
        tfield.secure = !tfield.secure;
    }
    togglepassowrdtwo() {

        let tfield: TextField = <TextField>this.page.getViewById("npassword1");
        tfield.secure = !tfield.secure;
    }
    togglepassowrdthree() {

        let tfield: TextField = <TextField>this.page.getViewById("npassword2");
        tfield.secure = !tfield.secure;
    }
    public goBack() {
        this.routerExtensions.backToPreviousPage();
    }


    changepasswordbtn(){


        //alert("called"+this.new_password1+this.new_password2+this.current_password);
        if((this.current_password!=null || this.current_password!="") && (this.new_password1!=null || this.new_password1!="")
            && (this.new_password2 || this.new_password2!="")){

            if(this.new_password1==this.new_password2){

               this.changepasswordservice.changepasswordapi({curr_password:this.current_password,new_password:this.new_password1})
                   .subscribe(res => {
                           //console.log("Success"+JSON.stringify(res));
                           let helper=JSON.parse(JSON.stringify(res));
                           alert(helper._body.message);
                           //this.sidedrawer.logout();
                           console.log("logout");

                           setString("access_token", "");
                           setString("name", "");
                           setString("email", "");
                           setString("user_pc", "");
                           this.router.navigate(["/logout"]);
                       },
                       (error) => {

                           let string_response = JSON.stringify(error);

                           //console.log(JSON.stringify(error));
                           alert(JSON.stringify(error._body.message));


                       });

            }else{


                alert("New password incorrect");
            }

        }
        else{

            alert("All field required");

        }
    }
}

