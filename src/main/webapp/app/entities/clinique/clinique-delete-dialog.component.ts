import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IClinique } from 'app/shared/model/clinique.model';
import { CliniqueService } from './clinique.service';

@Component({
    selector: 'jhi-clinique-delete-dialog',
    templateUrl: './clinique-delete-dialog.component.html'
})
export class CliniqueDeleteDialogComponent {
    clinique: IClinique;

    constructor(protected cliniqueService: CliniqueService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.cliniqueService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'cliniqueListModification',
                content: 'Deleted an clinique'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-clinique-delete-popup',
    template: ''
})
export class CliniqueDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ clinique }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(CliniqueDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.clinique = clinique;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/clinique', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/clinique', { outlets: { popup: null } }]);
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
