import { FetchService } from '../../services/fetch.service';
import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

export interface ITrip {
  [date: string]: {
    title: string;
    focus: string;
    country: string;
    state:  string;
    city: string;
  };
};

export interface IToc {
  folder: string;
  lfolder?: string;
  ofolder?: string;
  format: string;
  lformat?: string;
  oformat?: string;
  media: {
    [name: string]: number[];
  };
};

export interface IVid {
  [date: string]: {
    format: string;
    media: {
      [name: string]: number[];
    };
  };
};

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrl: './trip.component.scss'
})
export class TripComponent implements OnInit {
  ready: boolean = false;
  vid?: IVid['date'];
  date: string = '';
  trips?: ITrip;
  toc?: IToc[];
  head?: IToc;

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
      this.vid = response[this.date];

      console.log(this.vid);
    });
  }

  address(tab: IToc | IVid['date'], med: string, opt: number = 0): string {
    let url = 'https://';

    const img = 'content.kpnc.io/img/trip';
    const vid = 'video.kpnc.io/trip';

    if ('folder' in tab) {
      if (opt > 0 && tab.lformat != undefined) {
        url += `${img}/${this.date}/${tab.folder}/${tab.lfolder}/${med}.${tab.lformat}`
      } else {
        url += `${img}/${this.date}/${tab.folder}/${med}.${tab.format}`
      }

      if (opt == 2) {
        url = `background-image: url(${url})`
      }
    } else {
      url += `${vid}/${this.date}/${med}.${tab.format}`
    }

    return url;
  }

  month(num: string): string {
    return Intl.DateTimeFormat('en', {month: 'long'}).format(new Date(num))
  }
}
