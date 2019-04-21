import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IClinique } from 'app/shared/model/clinique.model';

@Component({
    selector: 'jhi-clinique-detail',
    templateUrl: './clinique-detail.component.html'
})
export class CliniqueDetailComponent implements OnInit {
    clinique: IClinique;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ clinique }) => {
            this.clinique = clinique;
        });
    }

    previousState() {
        window.history.back();
    }
}
