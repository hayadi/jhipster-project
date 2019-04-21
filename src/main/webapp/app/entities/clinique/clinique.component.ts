import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IClinique } from 'app/shared/model/clinique.model';
import { AccountService } from 'app/core';
import { CliniqueService } from './clinique.service';

@Component({
    selector: 'jhi-clinique',
    templateUrl: './clinique.component.html'
})
export class CliniqueComponent implements OnInit, OnDestroy {
    cliniques: IClinique[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected cliniqueService: CliniqueService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.cliniqueService
            .query()
            .pipe(
                filter((res: HttpResponse<IClinique[]>) => res.ok),
                map((res: HttpResponse<IClinique[]>) => res.body)
            )
            .subscribe(
                (res: IClinique[]) => {
                    this.cliniques = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInCliniques();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IClinique) {
        return item.id;
    }

    registerChangeInCliniques() {
        this.eventSubscriber = this.eventManager.subscribe('cliniqueListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
