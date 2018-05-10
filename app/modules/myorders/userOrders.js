"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Orders = /** @class */ (function () {
    function Orders(id, rest_name, rest_add, rest_cont, r_name, r_m_no, o_payment, o_status, items, r_lat, r_lan, o_lat, o_lan, r_tip, r_id) {
        //public menuitems:string[]=[];
        this.menuitems = [];
        this.order_id = id;
        this.restaurant_name = rest_name;
        this.restaurant_addrss = rest_add;
        this.restaurant_contact = rest_cont;
        this.rider_name = r_name;
        this.rider_mobile_no = r_m_no;
        this.rider_tip = r_tip;
        this.order_payment = o_payment;
        this.order_status = o_status;
        this.menuitems = items;
        this.rider_lat = r_lat;
        this.rider_lan = r_lan;
        this.order_lat = o_lat;
        this.order_lan = o_lan;
        this.rider_id = r_id;
    }
    return Orders;
}());
exports.Orders = Orders;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlck9yZGVycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInVzZXJPcmRlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQTtJQW9CSSxnQkFBWSxFQUFVLEVBQUUsU0FBaUIsRUFBRSxRQUFnQixFQUMvQyxTQUFpQixFQUFFLE1BQWMsRUFBRSxNQUFjLEVBQ2pELFNBQWlCLEVBQUUsUUFBZ0IsRUFBRSxLQUFhLEVBQ2xELEtBQWEsRUFBRSxLQUFhLEVBQUUsS0FBYSxFQUMzQyxLQUFhLEVBQUMsS0FBWSxFQUFDLElBQUk7UUFQM0MsK0JBQStCO1FBQ3hCLGNBQVMsR0FBWSxFQUFFLENBQUM7UUFPM0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLGVBQWUsR0FBRyxTQUFTLENBQUM7UUFDakMsSUFBSSxDQUFDLGlCQUFpQixHQUFHLFFBQVEsQ0FBQztRQUNsQyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsU0FBUyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxlQUFlLEdBQUcsTUFBTSxDQUFDO1FBQzlCLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxhQUFhLEdBQUcsU0FBUyxDQUFDO1FBQy9CLElBQUksQ0FBQyxZQUFZLEdBQUcsUUFBUSxDQUFDO1FBQzdCLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1FBQzNCLElBQUksQ0FBQyxRQUFRLEdBQUMsSUFBSSxDQUFDO0lBRW5CLENBQUM7SUFHTCxhQUFDO0FBQUQsQ0FBQyxBQTVDRCxJQTRDQztBQTVDWSx3QkFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SXRlbXN9IGZyb20gXCIuL0Zvb2RpdGVtXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgT3JkZXJzIHtcclxuXHJcbiAgICBwdWJsaWMgb3JkZXJfaWQ6IHN0cmluZztcclxuICAgIHB1YmxpYyByZXN0YXVyYW50X25hbWU6IHN0cmluZztcclxuICAgIHB1YmxpYyByZXN0YXVyYW50X2FkZHJzczogc3RyaW5nO1xyXG4gICAgcHVibGljIHJlc3RhdXJhbnRfY29udGFjdDogc3RyaW5nO1xyXG4gICAgcHVibGljIHJpZGVyX25hbWU6IHN0cmluZztcclxuICAgIHB1YmxpYyByaWRlcl9tb2JpbGVfbm86IHN0cmluZztcclxuICAgIHB1YmxpYyByaWRlcl90aXA6IHN0cmluZztcclxuICAgIHB1YmxpYyByaWRlcl9sYXQ6IHN0cmluZztcclxuICAgIHB1YmxpYyByaWRlcl9sYW46IHN0cmluZztcclxuXHJcbiAgICBwdWJsaWMgb3JkZXJfcGF5bWVudDogc3RyaW5nO1xyXG4gICAgcHVibGljIG9yZGVyX3N0YXR1czogc3RyaW5nO1xyXG4gICAgcHVibGljIG9yZGVyX2xhdDogc3RyaW5nO1xyXG4gICAgcHVibGljIG9yZGVyX2xhbjogc3RyaW5nO1xyXG4gICAgcHVibGljIHJpZGVyX2lkOm51bWJlcjtcclxuICAgIC8vcHVibGljIG1lbnVpdGVtczpzdHJpbmdbXT1bXTtcclxuICAgIHB1YmxpYyBtZW51aXRlbXM6IEl0ZW1zW10gPSBbXTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihpZDogc3RyaW5nLCByZXN0X25hbWU6IHN0cmluZywgcmVzdF9hZGQ6IHN0cmluZyxcclxuICAgICAgICAgICAgICAgIHJlc3RfY29udDogc3RyaW5nLCByX25hbWU6IHN0cmluZywgcl9tX25vOiBzdHJpbmcsXHJcbiAgICAgICAgICAgICAgICBvX3BheW1lbnQ6IHN0cmluZywgb19zdGF0dXM6IHN0cmluZywgaXRlbXM6SXRlbXNbXSxcclxuICAgICAgICAgICAgICAgIHJfbGF0OiBzdHJpbmcsIHJfbGFuOiBzdHJpbmcsIG9fbGF0OiBzdHJpbmcsXHJcbiAgICAgICAgICAgICAgICBvX2xhbjogc3RyaW5nLHJfdGlwOnN0cmluZyxyX2lkICl7XHJcbiAgICAgICAgdGhpcy5vcmRlcl9pZCA9IGlkO1xyXG4gICAgICAgIHRoaXMucmVzdGF1cmFudF9uYW1lID0gcmVzdF9uYW1lO1xyXG4gICAgICAgIHRoaXMucmVzdGF1cmFudF9hZGRyc3MgPSByZXN0X2FkZDtcclxuICAgICAgICB0aGlzLnJlc3RhdXJhbnRfY29udGFjdCA9IHJlc3RfY29udDtcclxuICAgICAgICB0aGlzLnJpZGVyX25hbWUgPSByX25hbWU7XHJcbiAgICAgICAgdGhpcy5yaWRlcl9tb2JpbGVfbm8gPSByX21fbm87XHJcbiAgICAgICAgdGhpcy5yaWRlcl90aXAgPSByX3RpcDtcclxuICAgICAgICB0aGlzLm9yZGVyX3BheW1lbnQgPSBvX3BheW1lbnQ7XHJcbiAgICAgICAgdGhpcy5vcmRlcl9zdGF0dXMgPSBvX3N0YXR1cztcclxuICAgICAgICB0aGlzLm1lbnVpdGVtcyA9IGl0ZW1zO1xyXG4gICAgICAgIHRoaXMucmlkZXJfbGF0ID0gcl9sYXQ7XHJcbiAgICAgICAgdGhpcy5yaWRlcl9sYW4gPSByX2xhbjtcclxuICAgICAgICB0aGlzLm9yZGVyX2xhdCA9IG9fbGF0O1xyXG4gICAgICAgIHRoaXMub3JkZXJfbGFuID0gb19sYW47XHJcbiAgICB0aGlzLnJpZGVyX2lkPXJfaWQ7XHJcblxyXG4gICAgfVxyXG5cclxuXHJcbn1cclxuXHJcblxyXG4iXX0=