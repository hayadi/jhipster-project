import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IClinique } from 'app/shared/model/clinique.model';
import { CliniqueService } from './clinique.service';
import { IMedecin } from 'app/shared/model/medecin.model';
import { MedecinService } from 'app/entities/medecin';

@Component({
    selector: 'jhi-clinique-update',
    templateUrl: './clinique-update.component.html'
})
export class CliniqueUpdateComponent implements OnInit {
    clinique: IClinique;
    isSaving: boolean;

    medecins: IMedecin[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected cliniqueService: CliniqueService,
        protected medecinService: MedecinService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ clinique }) => {
            this.clinique = clinique;
        });
        this.medecinService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IMedecin[]>) => mayBeOk.ok),
                map((response: HttpResponse<IMedecin[]>) => response.body)
            )
            .subscribe((res: IMedecin[]) => (this.medecins = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.clinique.id !== undefined) {
            this.subscribeToSaveResponse(this.cliniqueService.update(this.clinique));
        } else {
            this.subscribeToSaveResponse(this.cliniqueService.create(this.clinique));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IClinique>>) {
        result.subscribe((res: HttpResponse<IClinique>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
