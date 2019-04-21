import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IVisite } from 'app/shared/model/visite.model';
import { VisiteService } from './visite.service';

@Component({
    selector: 'jhi-visite-delete-dialog',
    templateUrl: './visite-delete-dialog.component.html'
})
export class VisiteDeleteDialogComponent {
    visite: IVisite;

    constructor(protected visiteService: VisiteService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.visiteService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'visiteListModification',
                content: 'Deleted an visite'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-visite-delete-popup',
    template: ''
})
export class VisiteDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ visite }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(VisiteDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.visite = visite;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/visite', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/visite', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
