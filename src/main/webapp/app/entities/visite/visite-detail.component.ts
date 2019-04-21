import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IVisite } from 'app/shared/model/visite.model';

@Component({
    selector: 'jhi-visite-detail',
    templateUrl: './visite-detail.component.html'
})
export class VisiteDetailComponent implements OnInit {
    visite: IVisite;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ visite }) => {
            this.visite = visite;
        });
    }

    previousState() {
        window.history.back();
    }
}
