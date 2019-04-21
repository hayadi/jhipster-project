/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ProjectJHipsterTestModule } from '../../../test.module';
import { VisiteComponent } from 'app/entities/visite/visite.component';
import { VisiteService } from 'app/entities/visite/visite.service';
import { Visite } from 'app/shared/model/visite.model';

describe('Component Tests', () => {
    describe('Visite Management Component', () => {
        let comp: VisiteComponent;
        let fixture: ComponentFixture<VisiteComponent>;
        let service: VisiteService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ProjectJHipsterTestModule],
                declarations: [VisiteComponent],
                providers: []
            })
                .overrideTemplate(VisiteComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(VisiteComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(VisiteService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Visite(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.visites[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
