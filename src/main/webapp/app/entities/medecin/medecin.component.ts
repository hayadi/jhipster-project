import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IMedecin } from 'app/shared/model/medecin.model';
import { AccountService } from 'app/core';
import { MedecinService } from './medecin.service';

@Component({
    selector: 'jhi-medecin',
    templateUrl: './medecin.component.html'
})
export class MedecinComponent implements OnInit, OnDestroy {
    medecins: IMedecin[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected medecinService: MedecinService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.medecinService
            .query()
            .pipe(
                filter((res: HttpResponse<IMedecin[]>) => res.ok),
                map((res: HttpResponse<IMedecin[]>) => res.body)
            )
            .subscribe(
                (res: IMedecin[]) => {
                    this.medecins = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInMedecins();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IMedecin) {
        return item.id;
    }

    registerChangeInMedecins() {
        this.eventSubscriber = this.eventManager.subscribe('medecinListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
