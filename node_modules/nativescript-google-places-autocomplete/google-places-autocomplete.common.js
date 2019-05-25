"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var observable_1 = require("tns-core-modules/data/observable");
var google_places_autocomplete_static_1 = require("./google-places-autocomplete.static");
var http = require("tns-core-modules/http");
var Common = (function (_super) {
    __extends(Common, _super);
    function Common(key) {
        var _this = _super.call(this) || this;
        _this.apikey = key;
        return _this;
    }
    Common.prototype.search = function (terms) {
        var requestUrl = google_places_autocomplete_static_1.PLACES_API_URL +
            "?input=" + encodeURIComponent(terms.trim()) +
            "&types=geocode&key=" +
            this.apikey;
        return http
            .getJSON(requestUrl)
            .then(function (data) {
            var items = [];
            for (var i = 0; i < data.predictions.length; i++) {
                items.push({
                    description: data.predictions[i].description,
                    placeId: data.predictions[i].place_id,
                    data: data.predictions[i]
                });
            }
            return items;
        });
    };
    Common.prototype.getPlaceById = function (placeId) {
        var requestUrl = google_places_autocomplete_static_1.PLACES_DETAILS_API_URL_places +
            "?placeid=" + placeId + "&key=" +
            this.apikey;
        return http
            .getJSON(requestUrl)
            .then(function (data) {
            var place = {};
            place.latitude = data.result.geometry.location.lat;
            place.longitude = data.result.geometry.location.lng;
            place.name = data.result.name;
            place.phoneNumber = data.result.international_phone_number;
            place.formattedAddress = data.result.formatted_address;
            place.data = data;
            if (data.result.photos && data.result.photos.length > 0) {
                place.photoReference = data.result.photos[0].photo_reference;
            }
            return place;
        });
    };
    Common.prototype.handleErrors = function (response) {
        if (!response.result) {
            console.log("google-geocoder error");
            console.log(JSON.stringify(response));
        }
        return response;
    };
    return Common;
}(observable_1.Observable));
exports.Common = Common;
//# sourceMappingURL=google-places-autocomplete.common.js.map