import { Routes } from '@angular/router';

import { WelcomeComponent } from './components/pages/welcome/welcome.component';
import { HomeComponent } from './components/pages/home/home.component';
import { SignUpComponent } from './components/pages/auth/sign-up/sign-up.component';

export const routes: Routes = [
    ///////////////////////// Public routes /////////////////////////

    
    //////////////////// Non-authenticated routes ///////////////////

    // Welcome
    { path: 'welcome', component: WelcomeComponent },

    //////////////////// Authenticated routes ///////////////////////

    // Home
    { path: '', component: HomeComponent },
    /* =========== Cycles =========== */
    { path: 'signUp', component: SignUpComponent },
    
    ///////////////////////// Other routes //////////////////////////

    // Fallback route
    { path: '**', component: HomeComponent },
];