import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISpecialite } from 'app/shared/model/specialite.model';

@Component({
    selector: 'jhi-specialite-detail',
    templateUrl: './specialite-detail.component.html'
})
export class SpecialiteDetailComponent implements OnInit {
    specialite: ISpecialite;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ specialite }) => {
            this.specialite = specialite;
        });
    }

    previousState() {
        window.history.back();
    }
}
