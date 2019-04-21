/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ProjectJHipsterTestModule } from '../../../test.module';
import { MedecinComponent } from 'app/entities/medecin/medecin.component';
import { MedecinService } from 'app/entities/medecin/medecin.service';
import { Medecin } from 'app/shared/model/medecin.model';

describe('Component Tests', () => {
    describe('Medecin Management Component', () => {
        let comp: MedecinComponent;
        let fixture: ComponentFixture<MedecinComponent>;
        let service: MedecinService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ProjectJHipsterTestModule],
                declarations: [MedecinComponent],
                providers: []
            })
                .overrideTemplate(MedecinComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(MedecinComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MedecinService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Medecin(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.medecins[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
