import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICompteRendu } from 'app/shared/model/compte-rendu.model';
import { CompteRenduService } from './compte-rendu.service';

@Component({
    selector: 'jhi-compte-rendu-delete-dialog',
    templateUrl: './compte-rendu-delete-dialog.component.html'
})
export class CompteRenduDeleteDialogComponent {
    compteRendu: ICompteRendu;

    constructor(
        protected compteRenduService: CompteRenduService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.compteRenduService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'compteRenduListModification',
                content: 'Deleted an compteRendu'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-compte-rendu-delete-popup',
    template: ''
})
export class CompteRenduDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ compteRendu }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(CompteRenduDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.compteRendu = compteRendu;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/compte-rendu', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/compte-rendu', { outlets: { popup: null } }]);
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
