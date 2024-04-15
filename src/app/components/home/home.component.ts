import { FetchService } from '../../services/fetch.service';
import { Component, NgZone, OnInit } from '@angular/core';
import { ITrip } from '../trip/trip.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  trips: ITrip | null = null;

  constructor(private router: Router, private ngZone: NgZone, private fetch: FetchService) { }

  routerLink(route: any[]): void {
    this.ngZone.run(() => this.router.navigate(route)).then();
  }

  ngOnInit(): void {
    this.fetch.request('trips').subscribe((response: ITrip) => {
      this.trips = response;
    });
  }
}
