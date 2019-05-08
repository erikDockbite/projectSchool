import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  token: any;

  constructor(private tokenService: TokenService, private router: Router) { }

  ngOnInit() {
    this.token = this.tokenService.GetToken()
    console.log(this.token)
  }

  logout() {
    this.tokenService.DeleteToken();
    this.router.navigate(['']);
  }

}
