import { Component, OnInit } from "@angular/core";
import { TextField } from "ui/text-field"
import { Page } from "ui/page";
import {RouterExtensions} from "nativescript-angular";
import {MydetailService} from "../mydetail/mydetail.component.service";
import {loginService} from "./login.service";
import {setString,getString,setNumber,getNumber,setBoolean,getBoolean} from "tns-core-modules/application-settings";
import { Router } from "@angular/router";
import {Label} from "tns-core-modules/ui/label";
import {AbsoluteLayout} from "tns-core-modules/ui/layouts/absolute-layout";
import {GridLayout} from "tns-core-modules/ui/layouts/grid-layout";
import {StackLayout} from "tns-core-modules/ui/layouts/stack-layout";
var Toast = require("nativescript-toast");
@Component({
    selector: "ns-items",
    moduleId: module.id,
    templateUrl: "./login.component.html",
    styleUrls: ['./login.css']
    
})
export class loginComponent implements OnInit {

   public login_email: string;
   public login_possword: string;
   public reset_email: string;


    // This pattern makes use of Angular�s dependency injection implementation to inject an instance of the ItemService service into this class. 
    // Angular knows about this service because it is included in your app�s main NgModule, defined in app.module.ts.
   constructor(private routerExtensions: RouterExtensions,private page: Page,private myloginservice:loginService,private router:Router) {

       this.login_email;
       this.login_possword;

   }

    ngOnInit(): void {

       /* if(getString("access_token") !=null){
            this.router.navigate(["/restaurants"]);

        }*/

        
    }
    onNavBtnTap() {
        // This code will be called only in Android.
        console.log("Navigation button tapped!");
    }
    onSignpTap() {
       this.router.navigate(['/signup']);

    }
    onLoginTap() {

    if(this.login_email!="" && this.login_possword!=""){
            let that=this;
        that.myloginservice
            .user_login_api_call({ user_name: that.login_email, user_password: that.login_possword })
            .subscribe(res => {
                    console.log("Success");
                    that.onSuccess(res);
                },
                (error) => {

                    let string_response = JSON.stringify(error);

                    //alert("user not exsist");
                    alert(JSON.stringify(error._body.message));


                });

    }else{

        alert("Email or Password required");
    }


    }

    onSuccess(res){

              let string_response = JSON.stringify(res);
              let helper = JSON.parse(string_response);
              setString("access_token",JSON.stringify(helper._body.user.user_token));

              setString("user_id",JSON.stringify(helper._body.user.user_id));
              setString("email",helper._body.user.user_username);
              setString("name",helper._body.user.user_name);
        setString("user_mobile_no",JSON.stringify(helper._body.user.user_mobile_no));
       // setString("user_address",JSON.stringify(helper._body.user.user_address));
      //  setString("user_pc",JSON.stringify(helper._body.user.user_postal_code));
       // alert(getString("user_address"),getString("user_address"));

              console.log("jjjjj"+getString("user_id"),getString("access_token"));
              this.router.navigate(["/restaurants"]);



    }
    togglepassowrd() {

        let tfield: TextField = <TextField>this.page.getViewById("password");
        tfield.secure = !tfield.secure;
    }
    public goBack() {
        this.routerExtensions.backToPreviousPage();
    }



    forgotpassword(){
        let layout1: GridLayout = <GridLayout>this.page.getViewById("logindiv");
        layout1.visibility="collapse";
        let layout: StackLayout = <StackLayout>this.page.getViewById("forgotpasswordlabel");

        layout.visibility="visible";




    }

    onresetbtn(){

        if(this.reset_email!=null ){
            let that=this;
            that.myloginservice
                .user_reset_password({ user_name: that.reset_email})
                .subscribe(res => {
                    let helper=JSON.parse(JSON.stringify(res));
                       // alert(helper._body.message);
                        var toast = Toast.makeText("Your "+helper._body.message+" please Check Your Email!");
                        toast.show();
                        let layout1: GridLayout = <GridLayout>this.page.getViewById("logindiv");
                        layout1.visibility="visible";
                        let layout: StackLayout = <StackLayout>this.page.getViewById("forgotpasswordlabel");

                        layout.visibility="collapse";
                    },
                    (error) => {

                        ///
                        alert("error"+JSON.stringify(error._body.message));


                    });


        }else{

            alert("Email required");
        }


    }

    onresetlogin(){

        let layout1: GridLayout = <GridLayout>this.page.getViewById("logindiv");
        layout1.visibility="visible";
        let layout: StackLayout = <StackLayout>this.page.getViewById("forgotpasswordlabel");

        layout.visibility="collapse";



    }
}
 
