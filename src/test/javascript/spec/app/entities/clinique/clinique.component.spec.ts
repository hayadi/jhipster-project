/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ProjectJHipsterTestModule } from '../../../test.module';
import { CliniqueComponent } from 'app/entities/clinique/clinique.component';
import { CliniqueService } from 'app/entities/clinique/clinique.service';
import { Clinique } from 'app/shared/model/clinique.model';

describe('Component Tests', () => {
    describe('Clinique Management Component', () => {
        let comp: CliniqueComponent;
        let fixture: ComponentFixture<CliniqueComponent>;
        let service: CliniqueService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ProjectJHipsterTestModule],
                declarations: [CliniqueComponent],
                providers: []
            })
                .overrideTemplate(CliniqueComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CliniqueComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CliniqueService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Clinique(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.cliniques[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
