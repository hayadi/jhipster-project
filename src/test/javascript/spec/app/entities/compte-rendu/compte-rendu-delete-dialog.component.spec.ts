/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ProjectJHipsterTestModule } from '../../../test.module';
import { CompteRenduDeleteDialogComponent } from 'app/entities/compte-rendu/compte-rendu-delete-dialog.component';
import { CompteRenduService } from 'app/entities/compte-rendu/compte-rendu.service';

describe('Component Tests', () => {
    describe('CompteRendu Management Delete Component', () => {
        let comp: CompteRenduDeleteDialogComponent;
        let fixture: ComponentFixture<CompteRenduDeleteDialogComponent>;
        let service: CompteRenduService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ProjectJHipsterTestModule],
                declarations: [CompteRenduDeleteDialogComponent]
            })
                .overrideTemplate(CompteRenduDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CompteRenduDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CompteRenduService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
