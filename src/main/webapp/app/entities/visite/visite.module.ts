import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { ProjectJHipsterSharedModule } from 'app/shared';
import {
    VisiteComponent,
    VisiteDetailComponent,
    VisiteUpdateComponent,
    VisiteDeletePopupComponent,
    VisiteDeleteDialogComponent,
    visiteRoute,
    visitePopupRoute
} from './';

const ENTITY_STATES = [...visiteRoute, ...visitePopupRoute];

@NgModule({
    imports: [ProjectJHipsterSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [VisiteComponent, VisiteDetailComponent, VisiteUpdateComponent, VisiteDeleteDialogComponent, VisiteDeletePopupComponent],
    entryComponents: [VisiteComponent, VisiteUpdateComponent, VisiteDeleteDialogComponent, VisiteDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProjectJHipsterVisiteModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
