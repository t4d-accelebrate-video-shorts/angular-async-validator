import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

const colorNameAsyncValidator = (httpClient: HttpClient) => (c: FormControl) => {

  if (!c || String(c.value).length === 0) {
    return of(null);
  }

  return httpClient
    .get('http://localhost:4250/colors?name=' + String(c.value))
    .pipe(
      map((colors: any[]) => {
        return colors.length === 1
          ? null : { colorName: true };
      }),
    );

};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public colorName = new FormControl('', null, [ colorNameAsyncValidator(this.httpClient) ]);

  constructor(private httpClient: HttpClient) {
  }
}
