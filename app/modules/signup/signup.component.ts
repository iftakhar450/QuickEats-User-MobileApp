import { Component, OnInit } from "@angular/core";
import { TextField } from "ui/text-field"
import { Page } from "ui/page";
import {RouterExtensions} from "nativescript-angular";
import {SignupService} from "./signup.service";
import { Router } from "@angular/router";
import { loginService } from "../login/login.service";
import {getString, setString} from "tns-core-modules/application-settings";
import {AbsoluteLayout} from "tns-core-modules/ui/layouts/absolute-layout";
import {StackLayout} from "tns-core-modules/ui/layouts/stack-layout";
var Toast = require("nativescript-toast");
@Component({
    selector: "ns-items",
    moduleId: module.id,
    templateUrl: "./signup.component.html",
    styleUrls: ['./signup.css']

})
export class signupComponent implements OnInit {


    public signup_name: string;
    public postal_code: string;
    public signup_email: string;
    public signup_phone: string;
    public signup_password: string;
    public v_code: string;


    // This pattern makes use of Angular�s dependency injection implementation to inject an instance of the ItemService service into this class. 
    // Angular knows about this service because it is included in your app�s main NgModule, defined in app.module.ts.
 


    constructor(private routerExtensions: RouterExtensions,private page: Page,private mysignupservice:SignupService,private router:Router,private  myloginservice:loginService) { }

    ngOnInit(): void {

    }
    isValidEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;
        return re.test(email);
    }

    getVerificationCode(){
        let check=this.isValidEmail(this.signup_email);
        //console.log(check);
        if(check==true && this.signup_name!="" && this.signup_phone!="" && this.postal_code!="" &&this.signup_password!="")
        {
            console.log(check);
            this.mysignupservice
                .get_verification_code({ user_username:this.signup_email})
                .subscribe(res => {
                        var toast = Toast.makeText("Please Check Your Email for Code");
                        toast.show();
                        console.log("---------------------------------------------------------------------");

                      let helper =JSON.parse(JSON.stringify(res));
                      console.log(JSON.stringify(helper._body.Code));
                        console.log("---------------------------------------------------------------------");
                        setString("signup_verification_code",helper._body.Code);
                        this.addVarificationCode();




                    },
                    (error) => {
                        //this.onGetDataError(error);
                        console.log(JSON.stringify("error"+error));


                    });

        }

        else{

            alert("Invaild Inputs");
        }



    }

    addVarificationCode(){

        let layout:StackLayout=<StackLayout>this.page.getViewById("verification_layout");
        layout.visibility="visible";
        let layout1:StackLayout=<StackLayout>this.page.getViewById("signup_form");
        layout1.visibility="collapse";


    }
    submitVerificationCode(){

            let code=getString("signup_verification_code");
        //alert(this.v_code+"--------"+code);
        if(this.v_code.toUpperCase()==code){


            this.signup();
        }else{

            var toast = Toast.makeText("Incorrect Please try again");
            toast.show();
        }

    }
    signup() {
        let check=this.isValidEmail(this.signup_email);
        //console.log(check);
        if(check==true && this.signup_name!="" && this.signup_phone!="" && this.postal_code!="" &&this.signup_password!="")
        {
            console.log(check);
            this.mysignupservice
                .user_signup_api_call({ user_name: this.signup_name,  user_password: this.signup_password,user_username:this.signup_email,user_mobile_no:this.signup_phone , user_postal_code:this.postal_code,user_email_status:"verified"})
                .subscribe(res => {

                        console.log("res"+JSON.stringify(res));

                        this.router.navigate(["/login"]);


                    },
                    (error) => {
                        let helper=JSON.parse(JSON.stringify(error));
                      //  alert(helper._body.err.invalidAttributes.user_username[0].message);
                        alert(JSON.stringify(error));



                    });

        }

        else{

            alert("Invaild Inputs");
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
        setString("user_address",JSON.stringify(helper._body.user.user_address));

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

}
