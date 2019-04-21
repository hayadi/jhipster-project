/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ProjectJHipsterTestModule } from '../../../test.module';
import { CompteRenduComponent } from 'app/entities/compte-rendu/compte-rendu.component';
import { CompteRenduService } from 'app/entities/compte-rendu/compte-rendu.service';
import { CompteRendu } from 'app/shared/model/compte-rendu.model';

describe('Component Tests', () => {
    describe('CompteRendu Management Component', () => {
        let comp: CompteRenduComponent;
        let fixture: ComponentFixture<CompteRenduComponent>;
        let service: CompteRenduService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ProjectJHipsterTestModule],
                declarations: [CompteRenduComponent],
                providers: []
            })
                .overrideTemplate(CompteRenduComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CompteRenduComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CompteRenduService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new CompteRendu(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.compteRendus[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
