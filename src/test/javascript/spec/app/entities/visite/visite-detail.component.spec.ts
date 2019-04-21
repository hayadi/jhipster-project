/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ProjectJHipsterTestModule } from '../../../test.module';
import { VisiteDetailComponent } from 'app/entities/visite/visite-detail.component';
import { Visite } from 'app/shared/model/visite.model';

describe('Component Tests', () => {
    describe('Visite Management Detail Component', () => {
        let comp: VisiteDetailComponent;
        let fixture: ComponentFixture<VisiteDetailComponent>;
        const route = ({ data: of({ visite: new Visite(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ProjectJHipsterTestModule],
                declarations: [VisiteDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(VisiteDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(VisiteDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.visite).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
