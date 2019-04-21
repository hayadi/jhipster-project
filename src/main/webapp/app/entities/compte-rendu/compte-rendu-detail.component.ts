import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICompteRendu } from 'app/shared/model/compte-rendu.model';

@Component({
    selector: 'jhi-compte-rendu-detail',
    templateUrl: './compte-rendu-detail.component.html'
})
export class CompteRenduDetailComponent implements OnInit {
    compteRendu: ICompteRendu;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ compteRendu }) => {
            this.compteRendu = compteRendu;
        });
    }

    previousState() {
        window.history.back();
    }
}
