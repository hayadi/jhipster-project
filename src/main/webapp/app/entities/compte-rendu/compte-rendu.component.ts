import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ICompteRendu } from 'app/shared/model/compte-rendu.model';
import { AccountService } from 'app/core';
import { CompteRenduService } from './compte-rendu.service';

@Component({
    selector: 'jhi-compte-rendu',
    templateUrl: './compte-rendu.component.html'
})
export class CompteRenduComponent implements OnInit, OnDestroy {
    compteRendus: ICompteRendu[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected compteRenduService: CompteRenduService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.compteRenduService
            .query()
            .pipe(
                filter((res: HttpResponse<ICompteRendu[]>) => res.ok),
                map((res: HttpResponse<ICompteRendu[]>) => res.body)
            )
            .subscribe(
                (res: ICompteRendu[]) => {
                    this.compteRendus = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInCompteRendus();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ICompteRendu) {
        return item.id;
    }

    registerChangeInCompteRendus() {
        this.eventSubscriber = this.eventManager.subscribe('compteRenduListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
