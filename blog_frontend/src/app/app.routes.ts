import { Routes } from '@angular/router';

import { WelcomeComponent } from './components/welcome/welcome.component';
import { HomeComponent } from './components/home/home.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignOutComponent } from './components/sign-out/sign-out.component';
import { ProfileComponent } from './components/profile/profile.component';

import { UserGuardService } from './services/accounts/guard/user-guard/user-guard.service';
import { GuestGuardService } from './services/accounts/guard/guest-guard/guest-guard.service';

export const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [UserGuardService] },
    { path: 'sign-out', component: SignOutComponent, canActivate: [UserGuardService] },
    { path: 'profile', component: ProfileComponent, canActivate: [UserGuardService] },

    { path: 'welcome', component: WelcomeComponent, canActivate: [GuestGuardService] },
    { path: 'sign-in', component: SignInComponent, canActivate: [GuestGuardService] },
    { path: 'sign-up', component: SignUpComponent, canActivate: [GuestGuardService] },

    { path: '**', redirectTo: 'sign-in' },//Others URL
];