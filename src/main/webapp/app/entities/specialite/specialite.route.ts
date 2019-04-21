import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Specialite } from 'app/shared/model/specialite.model';
import { SpecialiteService } from './specialite.service';
import { SpecialiteComponent } from './specialite.component';
import { SpecialiteDetailComponent } from './specialite-detail.component';
import { SpecialiteUpdateComponent } from './specialite-update.component';
import { SpecialiteDeletePopupComponent } from './specialite-delete-dialog.component';
import { ISpecialite } from 'app/shared/model/specialite.model';

@Injectable({ providedIn: 'root' })
export class SpecialiteResolve implements Resolve<ISpecialite> {
    constructor(private service: SpecialiteService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ISpecialite> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Specialite>) => response.ok),
                map((specialite: HttpResponse<Specialite>) => specialite.body)
            );
        }
        return of(new Specialite());
    }
}

export const specialiteRoute: Routes = [
    {
        path: '',
        component: SpecialiteComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'projectJHipsterApp.specialite.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: SpecialiteDetailComponent,
        resolve: {
            specialite: SpecialiteResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'projectJHipsterApp.specialite.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: SpecialiteUpdateComponent,
        resolve: {
            specialite: SpecialiteResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'projectJHipsterApp.specialite.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: SpecialiteUpdateComponent,
        resolve: {
            specialite: SpecialiteResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'projectJHipsterApp.specialite.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const specialitePopupRoute: Routes = [
    {
        path: ':id/delete',
        component: SpecialiteDeletePopupComponent,
        resolve: {
            specialite: SpecialiteResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'projectJHipsterApp.specialite.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
