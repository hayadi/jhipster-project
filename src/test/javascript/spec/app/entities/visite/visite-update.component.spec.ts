/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { ProjectJHipsterTestModule } from '../../../test.module';
import { VisiteUpdateComponent } from 'app/entities/visite/visite-update.component';
import { VisiteService } from 'app/entities/visite/visite.service';
import { Visite } from 'app/shared/model/visite.model';

describe('Component Tests', () => {
    describe('Visite Management Update Component', () => {
        let comp: VisiteUpdateComponent;
        let fixture: ComponentFixture<VisiteUpdateComponent>;
        let service: VisiteService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ProjectJHipsterTestModule],
                declarations: [VisiteUpdateComponent]
            })
                .overrideTemplate(VisiteUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(VisiteUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(VisiteService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Visite(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.visite = entity;
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
                    const entity = new Visite();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.visite = entity;
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
