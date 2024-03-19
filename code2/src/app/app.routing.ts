import { Route } from '@angular/router';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard';
import { LayoutComponent } from 'app/layout/layout.component';
import { InitialDataResolver } from 'app/app.resolvers';

// @formatter:off
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [
    // Redirect empty path to '/program'
    { path: '', pathMatch: 'full', redirectTo: 'programs' },

    // Redirect signed in user to the '/program'
    //
    // After the user signs in, the sign in page will redirect the user to the 'signed-in-redirect'
    // path. Below is another redirection for that path to redirect the user to the desired
    // location. This is a small convenience to keep all main routes together here on this file.
    { path: 'signed-in-redirect', pathMatch: 'full', redirectTo: 'programs' },

    // Auth routes for guests
    {
        path: '',
        canActivate: [NoAuthGuard],
        canActivateChild: [NoAuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty',
        },
        children: [
            {
                path: 'confirmation-required',
                loadChildren: () =>
                    import(
                        'app/modules/auth/confirmation-required/confirmation-required.module'
                    ).then((m) => m.AuthConfirmationRequiredModule),
            },
            {
                path: 'forgot-password',
                loadChildren: () =>
                    import(
                        'app/modules/auth/forgot-password/forgot-password.module'
                    ).then((m) => m.AuthForgotPasswordModule),
            },
            {
                path: 'reset-password',
                loadChildren: () =>
                    import(
                        'app/modules/auth/reset-password/reset-password.module'
                    ).then((m) => m.AuthResetPasswordModule),
            },
            {
                path: 'sign-in',
                loadChildren: () =>
                    import('app/modules/auth/sign-in/sign-in.module').then(
                        (m) => m.AuthSignInModule
                    ),
            },
            {
                path: 'sign-up',
                loadChildren: () =>
                    import('app/modules/auth/sign-up/sign-up.module').then(
                        (m) => m.AuthSignUpModule
                    ),
            },
        ],
    },

    // Auth routes for authenticated users
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'classy',
        },
        children: [
            {
                path: 'sign-out',
                loadChildren: () =>
                    import('app/modules/auth/sign-out/sign-out.module').then(
                        (m) => m.AuthSignOutModule
                    ),
            },
            {
                path: 'unlock-session',
                loadChildren: () =>
                    import(
                        'app/modules/auth/unlock-session/unlock-session.module'
                    ).then((m) => m.AuthUnlockSessionModule),
            },
            {
                path: 'admin-profile',
                loadChildren: () =>
                    import(
                        'app/modules/profiles/admin-profile/admin-profile.module'
                    ).then((m) => m.AdminProfileModule),
            },
            {
                path: 'coach-profile',
                loadChildren: () =>
                    import(
                        'app/modules/profiles/coach-profile/coach-profile.module'
                    ).then((m) => m.CoachProfileModule),
            },
            {
                path: 'coachee-profile',
                loadChildren: () =>
                    import(
                        'app/modules/profiles/coachee-profile/coachee-profile.module'
                    ).then((m) => m.CoacheeProfileModule),
            },
            {
                path: 'general-settings',
                loadChildren: () =>
                    import('app/modules/settings/settings.module').then(
                        (m) => m.GeneralSettingsModule
                    ),
            },
        ],
    },

    // Landing routes
    {
        path: '',
        component: LayoutComponent,
        data: {
            layout: 'empty',
        },
        children: [
            {
                path: 'coach-search',
                loadChildren: () =>
                    import(
                        'app/modules/landing/coach-search/coach-search.module'
                    ).then((m) => m.CoachSearchModule),
            },
            {
                path: 'coach-search-result',
                loadChildren: () =>
                    import(
                        'app/modules/landing/coach-search-result/coach-search-result.module'
                    ).then((m) => m.CoachSearchResultModule),
            },
        ],
    },

    // Admin routes
    {
        path: '',
        // canActivate: [AuthGuard],
        // canActivateChild: [AuthGuard],
        component: LayoutComponent,
        resolve: {
            initialData: InitialDataResolver,
        },
        children: [
            {
                path: 'programs',
                loadChildren: () =>
                    import(
                        'app/modules/admin/programs/program-dashboard/program-dashboard.module'
                    ).then((m) => m.ProgramDashboardModule),
            },
            {
                path: 'program-details',
                loadChildren: () =>
                    import(
                        'app/modules/admin/programs/program-details/program-details.module'
                    ).then((m) => m.ProgramDetailsModule),
            },
            {
                path: 'user-management',
                loadChildren: () =>
                    import(
                        'app/modules/admin/user-management/user-management.module'
                    ).then((m) => m.UserManagementModule),
            },
        ],
    },
];
