import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { IVisite } from 'app/shared/model/visite.model';
import { VisiteService } from './visite.service';
import { IMedecin } from 'app/shared/model/medecin.model';
import { MedecinService } from 'app/entities/medecin';
import { IClinique } from 'app/shared/model/clinique.model';
import { CliniqueService } from 'app/entities/clinique';
import { ICompteRendu } from 'app/shared/model/compte-rendu.model';
import { CompteRenduService } from 'app/entities/compte-rendu';

@Component({
    selector: 'jhi-visite-update',
    templateUrl: './visite-update.component.html'
})
export class VisiteUpdateComponent implements OnInit {
    visite: IVisite;
    isSaving: boolean;

    medecins: IMedecin[];

    cliniques: IClinique[];

    compterendus: ICompteRendu[];
    dateVisiteDp: any;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected visiteService: VisiteService,
        protected medecinService: MedecinService,
        protected cliniqueService: CliniqueService,
        protected compteRenduService: CompteRenduService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ visite }) => {
            this.visite = visite;
        });
        this.medecinService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IMedecin[]>) => mayBeOk.ok),
                map((response: HttpResponse<IMedecin[]>) => response.body)
            )
            .subscribe((res: IMedecin[]) => (this.medecins = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.cliniqueService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IClinique[]>) => mayBeOk.ok),
                map((response: HttpResponse<IClinique[]>) => response.body)
            )
            .subscribe((res: IClinique[]) => (this.cliniques = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.compteRenduService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<ICompteRendu[]>) => mayBeOk.ok),
                map((response: HttpResponse<ICompteRendu[]>) => response.body)
            )
            .subscribe((res: ICompteRendu[]) => (this.compterendus = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.visite.id !== undefined) {
            this.subscribeToSaveResponse(this.visiteService.update(this.visite));
        } else {
            this.subscribeToSaveResponse(this.visiteService.create(this.visite));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IVisite>>) {
        result.subscribe((res: HttpResponse<IVisite>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackMedecinById(index: number, item: IMedecin) {
        return item.id;
    }

    trackCliniqueById(index: number, item: IClinique) {
        return item.id;
    }

    trackCompteRenduById(index: number, item: ICompteRendu) {
        return item.id;
    }
}
