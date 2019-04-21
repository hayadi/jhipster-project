/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { ProjectJHipsterTestModule } from '../../../test.module';
import { CompteRenduUpdateComponent } from 'app/entities/compte-rendu/compte-rendu-update.component';
import { CompteRenduService } from 'app/entities/compte-rendu/compte-rendu.service';
import { CompteRendu } from 'app/shared/model/compte-rendu.model';

describe('Component Tests', () => {
    describe('CompteRendu Management Update Component', () => {
        let comp: CompteRenduUpdateComponent;
        let fixture: ComponentFixture<CompteRenduUpdateComponent>;
        let service: CompteRenduService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ProjectJHipsterTestModule],
                declarations: [CompteRenduUpdateComponent]
            })
                .overrideTemplate(CompteRenduUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CompteRenduUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CompteRenduService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new CompteRendu(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.compteRendu = entity;
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
                    const entity = new CompteRendu();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.compteRendu = entity;
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
