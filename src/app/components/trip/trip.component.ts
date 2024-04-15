import { FetchService } from '../../services/fetch.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, NgZone } from '@angular/core';

export interface IToc {
  folder: string;
  lfolder: string | null;
  ofolder: string | null;
  format: string;
  lformat: string | null;
  oformat: string | null;
  images: string[];
};

export interface ITrip {
  [date: string]: {
    title: string;
    focus: string;
    country: string;
    state:  string;
    city: string;
  };
};

export interface IVid {
  [date: string]: {
    format: string;
    videos: string[];
  };
};

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrl: './trip.component.scss'
})
export class TripComponent {
  head: IToc | undefined = undefined;
  trips: ITrip | null = null;
  toc: IToc[] | null = null;
  vid: IVid | null = null;
  ready: boolean = false;
  date: string = "";

  constructor(private router: Router, private ngZone: NgZone, private route: ActivatedRoute, private fetch: FetchService) {
    if (this.route.snapshot.paramMap.get('date') == null) {
      this.router.navigate(['/']);
    } else {
      this.date = this.route.snapshot.paramMap.get('date')!.toUpperCase();
      this.router.navigate(['/trip/' + this.date]);
    }
  }
  
  routerLink(route: any[]): void {
    this.ngZone.run(() => this.router.navigate(route)).then();
  }

  ngOnInit(): void {
    this.fetch.request('trips').subscribe((response: ITrip) => {
      this.trips = response;
    });

    this.fetch.request(`${this.date}/toc`).subscribe((response: IToc[]) => {
      this.head = response.shift();
      this.toc = response;
    });

    this.fetch.request('vids').subscribe((response: IVid) => {
      this.vid = response;
    });
  }

  month(num: string): string {
    return Intl.DateTimeFormat('en', {month: 'long'}).format(new Date(num))
  }
}
