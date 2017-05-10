"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var index_1 = require("../_services/index");
var HomeComponent = (function () {
    function HomeComponent(userService) {
        this.userService = userService;
        this.users = [];
        this.stocks = [];
        this.userstocks = [];
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
    HomeComponent.prototype.ngOnInit = function () {
        this.loadAllUsers();
        this.loadAllStocks();
        this.loadAllUserStocks();
    };
    HomeComponent.prototype.deleteUser = function (_id) {
        var _this = this;
        this.userService.delete(_id).subscribe(function () { _this.loadAllUsers(); });
    };
    HomeComponent.prototype.loadAllUsers = function () {
        var _this = this;
        setTimeout(function () {
            _this.userService.getAll().subscribe(function (users) { _this.users = users; });
        }, 1000);
    };
    HomeComponent.prototype.loadAllStocks = function () {
        var _this = this;
        this.userService.getAllStock().subscribe(function (stocks) { _this.stocks = stocks; });
    };
    HomeComponent.prototype.loadAllUserStocks = function () {
        var _this = this;
        this.userService.getAllUserStock().subscribe(function (userstocks) { _this.userstocks = userstocks; });
    };
    HomeComponent.prototype.buyStocks = function (us) {
        var _this = this;
        this.userService.buyStocks(us).subscribe(function () { _this.loadAllUserStocks(); });
        console.log(us);
    };
    HomeComponent.prototype.sellStock = function (stockname) {
        console.log(stockname);
    };
    return HomeComponent;
}());
HomeComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'home.component.html'
    }),
    __metadata("design:paramtypes", [index_1.UserService])
], HomeComponent);
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map