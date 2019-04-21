/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ProjectJHipsterTestModule } from '../../../test.module';
import { CliniqueDetailComponent } from 'app/entities/clinique/clinique-detail.component';
import { Clinique } from 'app/shared/model/clinique.model';

describe('Component Tests', () => {
    describe('Clinique Management Detail Component', () => {
        let comp: CliniqueDetailComponent;
        let fixture: ComponentFixture<CliniqueDetailComponent>;
        const route = ({ data: of({ clinique: new Clinique(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ProjectJHipsterTestModule],
                declarations: [CliniqueDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(CliniqueDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CliniqueDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.clinique).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
