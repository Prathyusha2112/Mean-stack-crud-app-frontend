import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Compensation } from './compensation.model';

@Injectable()
export class CompensationService {
  selectedCompensation: Compensation;
  compensations: Compensation[];
  readonly baseURL = 'http://localhost:4000/compensations';

  constructor(public http: HttpClient) { }

  postCompensation(comp: Compensation) {
    return this.http.post(this.baseURL, comp);
  }

  getCompensationList() {
    return this.http.get(this.baseURL);
  }

  putCompensation(comp: Compensation) {
    return this.http.put(this.baseURL + `/${comp._id}`, comp);
  }

  deleteCompensation(_id: string) {
    return this.http.delete(this.baseURL + `/${_id}`);
  }

}



