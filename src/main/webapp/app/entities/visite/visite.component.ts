import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IVisite } from 'app/shared/model/visite.model';
import { AccountService } from 'app/core';
import { VisiteService } from './visite.service';

@Component({
    selector: 'jhi-visite',
    templateUrl: './visite.component.html'
})
export class VisiteComponent implements OnInit, OnDestroy {
    visites: IVisite[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected visiteService: VisiteService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.visiteService
            .query()
            .pipe(
                filter((res: HttpResponse<IVisite[]>) => res.ok),
                map((res: HttpResponse<IVisite[]>) => res.body)
            )
            .subscribe(
                (res: IVisite[]) => {
                    this.visites = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInVisites();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IVisite) {
        return item.id;
    }

    registerChangeInVisites() {
        this.eventSubscriber = this.eventManager.subscribe('visiteListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
