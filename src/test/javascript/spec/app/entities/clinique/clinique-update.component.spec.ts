/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { ProjectJHipsterTestModule } from '../../../test.module';
import { CliniqueUpdateComponent } from 'app/entities/clinique/clinique-update.component';
import { CliniqueService } from 'app/entities/clinique/clinique.service';
import { Clinique } from 'app/shared/model/clinique.model';

describe('Component Tests', () => {
    describe('Clinique Management Update Component', () => {
        let comp: CliniqueUpdateComponent;
        let fixture: ComponentFixture<CliniqueUpdateComponent>;
        let service: CliniqueService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ProjectJHipsterTestModule],
                declarations: [CliniqueUpdateComponent]
            })
                .overrideTemplate(CliniqueUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CliniqueUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CliniqueService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Clinique(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.clinique = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Clinique();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.clinique = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
