import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ISpecialite } from 'app/shared/model/specialite.model';
import { SpecialiteService } from './specialite.service';

@Component({
    selector: 'jhi-specialite-update',
    templateUrl: './specialite-update.component.html'
})
export class SpecialiteUpdateComponent implements OnInit {
    specialite: ISpecialite;
    isSaving: boolean;

    constructor(protected specialiteService: SpecialiteService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ specialite }) => {
            this.specialite = specialite;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.specialite.id !== undefined) {
            this.subscribeToSaveResponse(this.specialiteService.update(this.specialite));
        } else {
            this.subscribeToSaveResponse(this.specialiteService.create(this.specialite));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ISpecialite>>) {
        result.subscribe((res: HttpResponse<ISpecialite>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
