import { Injectable } from '@angular/core';
import { Fact } from '../model/fact';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  public getFacts(): Observable<Fact[]> {
    return this.http.get
      ('https://sheets.googleapis.com/v4/spreadsheets/13YchDltJ_ckx2A3IGocV9RClHT_KuPxmVluBIxG3FkM/values/data?key=AIzaSyA0aYFQhORUVgI1wAGjG82HPdWocFiUVCM')
      .pipe<Fact[]>(
        map((data: any) => {
          const values = data.values.slice(1);
          return values.map(v => {
            const category = v[0];
            const action = v[1];
            let steps = v.slice(2);
            let todo = false;
            if (steps.length && steps[steps.length - 1] === 'TRUE') {
              todo = true;
              steps = steps.slice(0, steps.length - 1);
            }
            return new Fact(category, action, steps.filter(s => s !== ''), todo);
          });
        })
      );
  }
}
