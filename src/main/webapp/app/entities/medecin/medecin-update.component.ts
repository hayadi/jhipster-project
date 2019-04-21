import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IMedecin } from 'app/shared/model/medecin.model';
import { MedecinService } from './medecin.service';
import { ISpecialite } from 'app/shared/model/specialite.model';
import { SpecialiteService } from 'app/entities/specialite';
import { IClinique } from 'app/shared/model/clinique.model';
import { CliniqueService } from 'app/entities/clinique';

@Component({
    selector: 'jhi-medecin-update',
    templateUrl: './medecin-update.component.html'
})
export class MedecinUpdateComponent implements OnInit {
    medecin: IMedecin;
    isSaving: boolean;

    specialites: ISpecialite[];

    cliniques: IClinique[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected medecinService: MedecinService,
        protected specialiteService: SpecialiteService,
        protected cliniqueService: CliniqueService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ medecin }) => {
            this.medecin = medecin;
        });
        this.specialiteService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<ISpecialite[]>) => mayBeOk.ok),
                map((response: HttpResponse<ISpecialite[]>) => response.body)
            )
            .subscribe((res: ISpecialite[]) => (this.specialites = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.cliniqueService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IClinique[]>) => mayBeOk.ok),
                map((response: HttpResponse<IClinique[]>) => response.body)
            )
            .subscribe((res: IClinique[]) => (this.cliniques = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.medecin.id !== undefined) {
            this.subscribeToSaveResponse(this.medecinService.update(this.medecin));
        } else {
            this.subscribeToSaveResponse(this.medecinService.create(this.medecin));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IMedecin>>) {
        result.subscribe((res: HttpResponse<IMedecin>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackSpecialiteById(index: number, item: ISpecialite) {
        return item.id;
    }

    trackCliniqueById(index: number, item: IClinique) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}
