import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISpecialite } from 'app/shared/model/specialite.model';
import { SpecialiteService } from './specialite.service';

@Component({
    selector: 'jhi-specialite-delete-dialog',
    templateUrl: './specialite-delete-dialog.component.html'
})
export class SpecialiteDeleteDialogComponent {
    specialite: ISpecialite;

    constructor(
        protected specialiteService: SpecialiteService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.specialiteService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'specialiteListModification',
                content: 'Deleted an specialite'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-specialite-delete-popup',
    template: ''
})
export class SpecialiteDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ specialite }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(SpecialiteDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.specialite = specialite;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/specialite', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/specialite', { outlets: { popup: null } }]);
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
