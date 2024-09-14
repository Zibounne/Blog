import { Routes } from '@angular/router';

import { WelcomeComponent } from './components/pages/welcome/welcome.component';
import { HomeComponent } from './components/pages/home/home.component';

export const routes: Routes = [
    ///////////////////////// Public routes /////////////////////////

    
    //////////////////// Non-authenticated routes ///////////////////

    // Welcome
    { path: '', component: WelcomeComponent },

    //////////////////// Authenticated routes ///////////////////////

    // Home
    //{ path: '', component: HomeComponent },
    
    ///////////////////////// Other routes //////////////////////////

    // Fallback route
    { path: '**', component: HomeComponent },
];