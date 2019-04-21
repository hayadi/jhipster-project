import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { ProjectJHipsterSharedModule } from 'app/shared';
import {
    CliniqueComponent,
    CliniqueDetailComponent,
    CliniqueUpdateComponent,
    CliniqueDeletePopupComponent,
    CliniqueDeleteDialogComponent,
    cliniqueRoute,
    cliniquePopupRoute
} from './';

const ENTITY_STATES = [...cliniqueRoute, ...cliniquePopupRoute];

@NgModule({
    imports: [ProjectJHipsterSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        CliniqueComponent,
        CliniqueDetailComponent,
        CliniqueUpdateComponent,
        CliniqueDeleteDialogComponent,
        CliniqueDeletePopupComponent
    ],
    entryComponents: [CliniqueComponent, CliniqueUpdateComponent, CliniqueDeleteDialogComponent, CliniqueDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProjectJHipsterCliniqueModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
