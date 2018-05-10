import { Component, OnInit } from "@angular/core";
import { TextField } from "ui/text-field"
import { Page } from "ui/page";
var http = require("http");

@Component({
    selector: "ns-items",
    moduleId: module.id,
    templateUrl: "./aboutus.component.html",
    styleUrls: ['./aboutus.css']

})
export class aboutusComponent implements OnInit {



    // This pattern makes use of Angular�s dependency injection implementation to inject an instance of the ItemService service into this class.
    // Angular knows about this service because it is included in your app�s main NgModule, defined in app.module.ts.
    constructor(private page: Page) {



    }

    ngOnInit(): void {

    }


}

