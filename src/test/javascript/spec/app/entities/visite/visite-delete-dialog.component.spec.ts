/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ProjectJHipsterTestModule } from '../../../test.module';
import { VisiteDeleteDialogComponent } from 'app/entities/visite/visite-delete-dialog.component';
import { VisiteService } from 'app/entities/visite/visite.service';

describe('Component Tests', () => {
    describe('Visite Management Delete Component', () => {
        let comp: VisiteDeleteDialogComponent;
        let fixture: ComponentFixture<VisiteDeleteDialogComponent>;
        let service: VisiteService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ProjectJHipsterTestModule],
                declarations: [VisiteDeleteDialogComponent]
            })
                .overrideTemplate(VisiteDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(VisiteDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(VisiteService);
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
