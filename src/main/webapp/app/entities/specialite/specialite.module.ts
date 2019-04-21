import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { ProjectJHipsterSharedModule } from 'app/shared';
import {
    SpecialiteComponent,
    SpecialiteDetailComponent,
    SpecialiteUpdateComponent,
    SpecialiteDeletePopupComponent,
    SpecialiteDeleteDialogComponent,
    specialiteRoute,
    specialitePopupRoute
} from './';

const ENTITY_STATES = [...specialiteRoute, ...specialitePopupRoute];

@NgModule({
    imports: [ProjectJHipsterSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        SpecialiteComponent,
        SpecialiteDetailComponent,
        SpecialiteUpdateComponent,
        SpecialiteDeleteDialogComponent,
        SpecialiteDeletePopupComponent
    ],
    entryComponents: [SpecialiteComponent, SpecialiteUpdateComponent, SpecialiteDeleteDialogComponent, SpecialiteDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProjectJHipsterSpecialiteModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
