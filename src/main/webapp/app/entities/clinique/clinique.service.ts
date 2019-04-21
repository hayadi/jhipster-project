import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IClinique } from 'app/shared/model/clinique.model';

type EntityResponseType = HttpResponse<IClinique>;
type EntityArrayResponseType = HttpResponse<IClinique[]>;

@Injectable({ providedIn: 'root' })
export class CliniqueService {
    public resourceUrl = SERVER_API_URL + 'api/cliniques';

    constructor(protected http: HttpClient) {}

    create(clinique: IClinique): Observable<EntityResponseType> {
        return this.http.post<IClinique>(this.resourceUrl, clinique, { observe: 'response' });
    }

    update(clinique: IClinique): Observable<EntityResponseType> {
        return this.http.put<IClinique>(this.resourceUrl, clinique, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IClinique>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IClinique[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
