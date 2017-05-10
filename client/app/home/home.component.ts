import { Component, OnInit } from '@angular/core';
import { User } from '../_models/index';
import { UserService } from '../_services/index';
import { Stock } from '../_models/index';
import { StockService } from '../_services/index';
import { UserStock } from '../_models/index';

@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
    currentUser: User;
    users: User[] = [];
    stocks: Stock[] = [];
    userstocks: UserStock[] = [];

    constructor(private userService: UserService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }


    ngOnInit() {
        this.loadAllUsers();
        this.loadAllStocks();
        this.loadAllUserStocks();
    }

    deleteUser(_id: string) {
        this.userService.delete(_id).subscribe(() => { this.loadAllUsers() });
    }

    private loadAllUsers() {
        setTimeout( () => {
          this.userService.getAll().subscribe(users => { this.users = users; });
        },1000);
    }

    private loadAllStocks() {
        this.userService.getAllStock().subscribe(stocks => { this.stocks = stocks; });

    }

    private loadAllUserStocks() {
        this.userService.getAllUserStock().subscribe(userstocks => { this.userstocks = userstocks; });
    }

    private buyStocks(us : UserStock) {
      this.userService.buyStocks(us).subscribe(() => { this.loadAllUserStocks() });
      console.log(us);
    }

    private sellStock(stockname: string) {
      console.log(stockname);
    }




}
