import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICompteRendu } from 'app/shared/model/compte-rendu.model';

type EntityResponseType = HttpResponse<ICompteRendu>;
type EntityArrayResponseType = HttpResponse<ICompteRendu[]>;

@Injectable({ providedIn: 'root' })
export class CompteRenduService {
    public resourceUrl = SERVER_API_URL + 'api/compte-rendus';

    constructor(protected http: HttpClient) {}

    create(compteRendu: ICompteRendu): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(compteRendu);
        return this.http
            .post<ICompteRendu>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(compteRendu: ICompteRendu): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(compteRendu);
        return this.http
            .put<ICompteRendu>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<ICompteRendu>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ICompteRendu[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(compteRendu: ICompteRendu): ICompteRendu {
        const copy: ICompteRendu = Object.assign({}, compteRendu, {
            dateCompteRendu:
                compteRendu.dateCompteRendu != null && compteRendu.dateCompteRendu.isValid()
                    ? compteRendu.dateCompteRendu.format(DATE_FORMAT)
                    : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.dateCompteRendu = res.body.dateCompteRendu != null ? moment(res.body.dateCompteRendu) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((compteRendu: ICompteRendu) => {
                compteRendu.dateCompteRendu = compteRendu.dateCompteRendu != null ? moment(compteRendu.dateCompteRendu) : null;
            });
        }
        return res;
    }
}
