import { Component, OnInit } from '@angular/core';

import { User } from '../_models/index';
import { UserService } from '../_services/index';
import { Stock } from '../_models/index';
import { StockService } from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
    currentUser: User;
    users: User[] = [];
    stocks: Stock[] = [];

    constructor(private userService: UserService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }


    ngOnInit() {
        this.loadAllUsers();
        //this.loadAllStocks();
    }

    deleteUser(_id: string) {
        this.userService.delete(_id).subscribe(() => { this.loadAllUsers() });
    }

    private loadAllUsers() {
        this.userService.getAll().subscribe(users => { this.users = users; });
    }
    
   /* private loadAllStocks() {
        this.stockService.getAll().subscribe(stock => { this.stocks = stocks; });
    }

    deleteStock(_id: string) {
        this.stockService.delete(_id).subscribe(() => { this.loadAllStocks() });
    }*/

}