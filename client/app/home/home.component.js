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
var index_2 = require("../_models/index");
var HomeComponent = (function () {
    function HomeComponent(userService, cd) {
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
        this.userService.getAll().subscribe(function (users) {
            _this.users = users;
            for (var i = 0; i < users.length; i++) {
                if (users[i].username == _this.currentUser.username)
                    _this.currentMoney = users[i].money;
            }
        });
    };
    HomeComponent.prototype.loadAllStocks = function () {
        var _this = this;
        this.userService.getAllStock().subscribe(function (stocks) { _this.stocks = stocks; });
        console.log('users length: ' + this.users.length);
    };
    HomeComponent.prototype.loadAllUserStocks = function () {
        var _this = this;
        this.userService.getAllUserStock().subscribe(function (userstocks) {
            for (var i = 0; i < userstocks.length; i++) {
                if (userstocks[i].username == _this.currentUser.username) {
                    _this.userstocks.push(userstocks[i]);
                }
            }
            _this.moneyInStocks = 0;
            for (var i = 0; i < _this.userstocks.length; i++) {
                for (var j = 0; j < _this.stocks.length; j++) {
                    if (_this.userstocks[i].stockname == _this.stocks[j].stockname) {
                        console.log('yay');
                        _this.moneyInStocks = _this.moneyInStocks + (_this.stocks[j].price * _this.userstocks[i].amount);
                    }
                }
            }
        });
    };
    HomeComponent.prototype.buyStocks = function (username, stockname, buy) {
        var _this = this;
        var sstock = new index_2.UserStock;
        sstock.stockname = stockname;
        sstock.username = username;
        if (buy)
            sstock.amount = Number(this.inputAmount);
        else
            sstock.amount = -this.inputAmount;
        this.inputAmount = 0;
        console.log(sstock.amount);
        this.userService.buyStocks(sstock).subscribe(function () { _this.loadAllUserStocks(); });
    };
    return HomeComponent;
}());
HomeComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'home.component.html'
    }),
    __metadata("design:paramtypes", [index_1.UserService, core_1.ChangeDetectorRef])
], HomeComponent);
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map