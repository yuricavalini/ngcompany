import { Injectable } from '@angular/core';
import * as countriesLib from 'i18n-iso-countries';
import { Observable } from 'rxjs';

declare const require: any;

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  private readonly countries: Observable<{ code: string; name: string }[]>;

  constructor() {
    countriesLib.registerLocale(require('i18n-iso-countries/langs/en.json'));
    this.countries = new Observable<{ code: string; name: string }[]>(
      (observer) => {
        const countries = Object.entries(
          countriesLib.getNames('en', { select: 'official' })
        ).map((entry) => ({ code: entry[0], name: entry[1] }));

        observer.next(countries?.length ? countries : []);
        observer.complete();
      }
    );
  }

  getCountries() {
    return this.countries;
  }

  getCountryName(countryCode: string) {
    if (!countryCode) return;

    return countriesLib.getName(countryCode, 'en', {
      select: 'official'
    });
  }
}
