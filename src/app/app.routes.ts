import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AhorcadoComponent } from './components/home/ahorcado/ahorcado.component';
import { MayormenorComponent } from './components/home/mayormenor/mayormenor.component';
import { PreguntadosComponent } from './components/home/preguntados/preguntados.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AboutMeComponent } from './components/about-me/about-me.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: "full" },
    { path: 'home', 
        loadComponent:()=> import('./components/home/home.component').then(c =>c.HomeComponent)},
    { path: 'ahorcado', 
        loadComponent:()=> import('./components/home/ahorcado/ahorcado.component').then(c =>c.AhorcadoComponent)},
    { path: 'mayormenor', 
        loadComponent:()=> import('./components/home/mayormenor/mayormenor.component').then(c =>c.MayormenorComponent) },
    { path: 'preguntados',
        loadComponent:()=> import('./components/home/preguntados/preguntados.component').then(c =>c.PreguntadosComponent) },
    { path: 'log-in', 
        loadComponent:()=> import('./components/log-in/log-in.component').then(c =>c.LogInComponent)},
    { path: 'sign-up', 
        loadComponent:()=> import('./components/sign-up/sign-up.component').then(c =>c.SignUpComponent)},
    { path: 'about-me', 
        loadComponent:()=> import('./components/about-me/about-me.component').then(c =>c.AboutMeComponent)},
    { path: '**', 
        loadComponent:()=> import('./components/page-not-found/page-not-found.component').then(c =>c.PageNotFoundComponent)},
];