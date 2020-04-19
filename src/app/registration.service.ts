import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  postUrl = 'http://localhost:3000/express-server/enroll';

  constructor(private httpClient: HttpClient) {
  }

  register(userData: any): Observable<any> {
    return this.httpClient.post<any>(this.postUrl, userData);
  }
}
