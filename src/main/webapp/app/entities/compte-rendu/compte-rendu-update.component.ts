import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { ICompteRendu } from 'app/shared/model/compte-rendu.model';
import { CompteRenduService } from './compte-rendu.service';
import { IVisite } from 'app/shared/model/visite.model';
import { VisiteService } from 'app/entities/visite';

@Component({
    selector: 'jhi-compte-rendu-update',
    templateUrl: './compte-rendu-update.component.html'
})
export class CompteRenduUpdateComponent implements OnInit {
    compteRendu: ICompteRendu;
    isSaving: boolean;

    visites: IVisite[];
    dateCompteRenduDp: any;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected compteRenduService: CompteRenduService,
        protected visiteService: VisiteService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ compteRendu }) => {
            this.compteRendu = compteRendu;
        });
        this.visiteService
            .query({ filter: 'compterendu-is-null' })
            .pipe(
                filter((mayBeOk: HttpResponse<IVisite[]>) => mayBeOk.ok),
                map((response: HttpResponse<IVisite[]>) => response.body)
            )
            .subscribe(
                (res: IVisite[]) => {
                    if (!this.compteRendu.visite || !this.compteRendu.visite.id) {
                        this.visites = res;
                    } else {
                        this.visiteService
                            .find(this.compteRendu.visite.id)
                            .pipe(
                                filter((subResMayBeOk: HttpResponse<IVisite>) => subResMayBeOk.ok),
                                map((subResponse: HttpResponse<IVisite>) => subResponse.body)
                            )
                            .subscribe(
                                (subRes: IVisite) => (this.visites = [subRes].concat(res)),
                                (subRes: HttpErrorResponse) => this.onError(subRes.message)
                            );
                    }
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.compteRendu.id !== undefined) {
            this.subscribeToSaveResponse(this.compteRenduService.update(this.compteRendu));
        } else {
            this.subscribeToSaveResponse(this.compteRenduService.create(this.compteRendu));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ICompteRendu>>) {
        result.subscribe((res: HttpResponse<ICompteRendu>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackVisiteById(index: number, item: IVisite) {
        return item.id;
    }
}
