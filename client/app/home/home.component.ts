import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
    currentMoney : number;
    moneyInStocks : number;
    inputAmount : number;


    constructor(private userService: UserService, cd: ChangeDetectorRef) {
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
          this.userService.getAll().subscribe(users => { this.users = users;

            for(let i=0; i<users.length; i++) {
              if (users[i].username == this.currentUser.username)
                this.currentMoney = users[i].money;
            }



          });

    }

    private loadAllStocks() {
        this.userService.getAllStock().subscribe(stocks => { this.stocks = stocks; });
        console.log('users length: ' + this.users.length);
    }

    private loadAllUserStocks() {
        this.userService.getAllUserStock().subscribe(userstocks => { //this.userstocks = userstocks;

          for(let i=0; i<userstocks.length; i++) {
            if (userstocks[i].username == this.currentUser.username) {
              this.userstocks.push(userstocks[i]);
            }
          }
          this.moneyInStocks = 0;
          for(let i=0; i<this.userstocks.length; i++) {
            for(let j=0; j<this.stocks.length; j++) {
              if(this.userstocks[i].stockname == this.stocks[j].stockname){
                console.log('yay');
                this.moneyInStocks = this.moneyInStocks + (this.stocks[j].price * this.userstocks[i].amount);
              }
            }
          }

        });
    }
    private buyStocks(username : string, stockname : string, buy : boolean) {
      var sstock = new UserStock;
      sstock.stockname = stockname;
      sstock.username = username;
      if (buy) sstock.amount = Number(this.inputAmount);
      else sstock.amount = -this.inputAmount;
      this.inputAmount = 0;
      console.log(sstock.amount);
      this.userService.buyStocks(sstock).subscribe(() => { this.loadAllUserStocks() });

    }






}
