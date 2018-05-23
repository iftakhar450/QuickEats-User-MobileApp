import { Injectable } from "@angular/core";
import { Observable as RxObservable } from "rxjs/Observable";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Http, Headers } from "@angular/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";

@Injectable()
export class loginService {




    private serverUrl = "http://46.101.88.80:81";

    constructor(private http: Http) { }


    user_reset_password(data: any) {
        //console.log(JSON.stringify(data));
        let options = this.createRequestOptions();
        return this.http.put(this.serverUrl+"/user/forget/password", { data }, { headers: options })
            .map(res => res);
    }


    testservice() {
        // console.log("data"+JSON.stringify(data));
        let options = this.createRequestOptions();
        return this.http.get("https://api.atom.purevpn.com/inventory/v1/getCountries?iResellerId="+272, { headers: options })
            .map(res => res);
    }
    user_login_api_call(data: any) {
       // console.log("data"+JSON.stringify(data));
        let options = this.createRequestOptions();
        return this.http.post(this.serverUrl+"/user/login", { data }, { headers: options })
            .map(res => res);
    }

    private createRequestOptions() {
        let headers = new Headers();
      //  headers.set("AuthKey", "my-key");
       // headers.set("token", "my-token");
        headers.set("Content-Type", "application/json");
        headers.set("X-AccessToken", "bdfb7a61e60b94d07926e32b6f46bdcd83bd21fb267c113c1399eb2e69595429");
        return headers;
    }

}
