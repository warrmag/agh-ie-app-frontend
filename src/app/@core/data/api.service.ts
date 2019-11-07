import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable()
export class ApiService {
    constructor(
        private http: HttpClient,
    ) { }

    private formatErrors(error: any) {
        return throwError(error);
    }

    get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
        return this.http.get(`${environment.apiUrl}${path}`, { params }).pipe(
            map((response: string) => {
                return response;
            }),
            catchError(this.formatErrors),
        );
    }

    getCustom(path: string, params: HttpParams = new HttpParams()): Observable<any> {
        return this.http.get(`${path}`, { params }).pipe(
            map((response: string) => {
                return response;
            }),
            catchError(this.formatErrors),
        );
    }

    put(path: string, body: Object = {}): Observable<any> {
        return this.http
            .put(`${environment.apiUrl}${path}`, JSON.stringify(body))
            .pipe(
                map((response: string) => {
                    return response;
                }),
                catchError(this.formatErrors),
            );
    }

    post(path: string, body: Object = {}, params: HttpParams = new HttpParams()): Observable<any> {
        return this.http
            .post(`${environment.apiUrl}${path}`, JSON.stringify(body), { params })
            .pipe(
                map((response: string) => {
                    return response;
                }),
                catchError(this.formatErrors),
            );
    }

    file(path: string, body: Object = {}): Observable<any> {
        return this.http
            .post(`${environment.apiUrl}${path}`, JSON.stringify(body), {
                responseType: 'blob',
            })
            .pipe(
                map((response: any) => {
                    return response;
                }),
                catchError(this.formatErrors),
            );
    }

    delete(path: string, params: HttpParams = new HttpParams()): Observable<any> {
        return this.http
            .delete(`${environment.apiUrl}${path}`, { params: params, responseType: 'text' })
            .pipe(
                map((response: any) => {
                    return response;
                }),
                catchError(this.formatErrors),
            );
    }

    prepareParams(param?: any): HttpParams {
        let params = new HttpParams();

        if (param) {
            Object.keys(param).forEach(key => {
                if (param[key].length && typeof param[key] === 'object') {
                    params = params.append(
                        key,
                        param[key]
                            .map(entity => {
                                return entity.id;
                            })
                            .join(','),
                    );
                    param[key];
                } else {
                    params = params.append(key, param[key]);
                }
            });
        }

        return params;
    }
}
