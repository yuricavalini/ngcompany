import { Injectable } from '@angular/core';
import * as countriesLib from 'i18n-iso-countries';
import { Observable } from 'rxjs';

declare const require: any;

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  private readonly countries: Observable<{ id: string; name: string }[]>;

  constructor() {
    countriesLib.registerLocale(require('i18n-iso-countries/langs/en.json'));
    this.countries = new Observable<{ id: string; name: string }[]>(
      (observer) => {
        const countries = Object.entries(
          countriesLib.getNames('en', { select: 'official' })
        ).map((entry) => ({ id: entry[0], name: entry[1] }));

        observer.next(countries?.length ? countries : []);
        observer.complete();
      }
    );
  }

  getCountries() {
    return this.countries;
  }
}
