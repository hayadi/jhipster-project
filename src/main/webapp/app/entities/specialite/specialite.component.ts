import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ISpecialite } from 'app/shared/model/specialite.model';
import { AccountService } from 'app/core';
import { SpecialiteService } from './specialite.service';

@Component({
    selector: 'jhi-specialite',
    templateUrl: './specialite.component.html'
})
export class SpecialiteComponent implements OnInit, OnDestroy {
    specialites: ISpecialite[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected specialiteService: SpecialiteService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.specialiteService
            .query()
            .pipe(
                filter((res: HttpResponse<ISpecialite[]>) => res.ok),
                map((res: HttpResponse<ISpecialite[]>) => res.body)
            )
            .subscribe(
                (res: ISpecialite[]) => {
                    this.specialites = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInSpecialites();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ISpecialite) {
        return item.id;
    }

    registerChangeInSpecialites() {
        this.eventSubscriber = this.eventManager.subscribe('specialiteListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
