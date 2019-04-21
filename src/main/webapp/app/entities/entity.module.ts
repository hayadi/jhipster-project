import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'clinique',
                loadChildren: './clinique/clinique.module#ProjectJHipsterCliniqueModule'
            },
            {
                path: 'specialite',
                loadChildren: './specialite/specialite.module#ProjectJHipsterSpecialiteModule'
            },
            {
                path: 'medecin',
                loadChildren: './medecin/medecin.module#ProjectJHipsterMedecinModule'
            },
            {
                path: 'patient',
                loadChildren: './patient/patient.module#ProjectJHipsterPatientModule'
            },
            {
                path: 'visite',
                loadChildren: './visite/visite.module#ProjectJHipsterVisiteModule'
            },
            {
                path: 'compte-rendu',
                loadChildren: './compte-rendu/compte-rendu.module#ProjectJHipsterCompteRenduModule'
            }
            /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
        ])
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProjectJHipsterEntityModule {}
