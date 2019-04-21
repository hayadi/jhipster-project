import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IVisite } from 'app/shared/model/visite.model';

type EntityResponseType = HttpResponse<IVisite>;
type EntityArrayResponseType = HttpResponse<IVisite[]>;

@Injectable({ providedIn: 'root' })
export class VisiteService {
    public resourceUrl = SERVER_API_URL + 'api/visites';

    constructor(protected http: HttpClient) {}

    create(visite: IVisite): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(visite);
        return this.http
            .post<IVisite>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(visite: IVisite): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(visite);
        return this.http
            .put<IVisite>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IVisite>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IVisite[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(visite: IVisite): IVisite {
        const copy: IVisite = Object.assign({}, visite, {
            dateVisite: visite.dateVisite != null && visite.dateVisite.isValid() ? visite.dateVisite.format(DATE_FORMAT) : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.dateVisite = res.body.dateVisite != null ? moment(res.body.dateVisite) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((visite: IVisite) => {
                visite.dateVisite = visite.dateVisite != null ? moment(visite.dateVisite) : null;
            });
        }
        return res;
    }
}
