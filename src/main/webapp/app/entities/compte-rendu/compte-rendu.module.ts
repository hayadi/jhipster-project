import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { ProjectJHipsterSharedModule } from 'app/shared';
import {
    CompteRenduComponent,
    CompteRenduDetailComponent,
    CompteRenduUpdateComponent,
    CompteRenduDeletePopupComponent,
    CompteRenduDeleteDialogComponent,
    compteRenduRoute,
    compteRenduPopupRoute
} from './';

const ENTITY_STATES = [...compteRenduRoute, ...compteRenduPopupRoute];

@NgModule({
    imports: [ProjectJHipsterSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        CompteRenduComponent,
        CompteRenduDetailComponent,
        CompteRenduUpdateComponent,
        CompteRenduDeleteDialogComponent,
        CompteRenduDeletePopupComponent
    ],
    entryComponents: [CompteRenduComponent, CompteRenduUpdateComponent, CompteRenduDeleteDialogComponent, CompteRenduDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProjectJHipsterCompteRenduModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
