import { Injectable } from "@angular/core";
import { Observable as RxObservable } from "rxjs/Observable";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Http, Headers } from "@angular/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";

@Injectable()
export class SignupService {




    private serverUrl = "http://46.101.88.80:81";

    constructor(private http: Http) { }




    user_signup_api_call(data: any) {
        console.log(JSON.stringify(data));
        let options = this.createRequestOptions();
        return this.http.post(this.serverUrl+"/user/register", { data }, { headers: options })
            .map(res => res);
    }
    get_verification_code(data: any) {
        console.log(JSON.stringify(data));
        let options = this.createRequestOptions();

        return this.http.post(this.serverUrl+"/get/verification/code", { data }, { headers: options })
            .map(res => res);
    }
    private createRequestOptions() {

        let headers = new Headers();
        //  headers.set("AuthKey", "my-key");
        //  headers.set("AuthToken", "my-token");
        headers.set("Content-Type", "application/json");
        return headers;
    }

}
