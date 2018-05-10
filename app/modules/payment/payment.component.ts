import { Component, OnInit } from "@angular/core";
import { Page } from "ui/page";
import {TextField} from "tns-core-modules/ui/text-field";
import {RouterExtensions} from "nativescript-angular";




@Component({
    selector: "ns-items",
    moduleId: module.id,
    templateUrl: "./payment.component.html",
    styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

    public card_num:number;
    public card_exp:number;
    public card_cvv:number;


    constructor(private routerExtensions: RouterExtensions,private page: Page) { }

    ngOnInit(): void {
    }

    togglepassowrd(){
        let cardtfield:TextField=<TextField> this.page.getViewById("cardnum");
        cardtfield.secure = !cardtfield.secure;
    }
    saveCard(){
        alert("card saved");
    }
    public goBack() {
        this.routerExtensions.backToPreviousPage();
    }
}