import { Routes } from '@angular/router';
import { EcommerceComponent } from './pages/dashboard/ecommerce/ecommerce.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { FormElementsComponent } from './pages/forms/form-elements/form-elements.component';
import { BasicTablesComponent } from './pages/tables/basic-tables/basic-tables.component';
import { BlankComponent } from './pages/blank/blank.component';
import { NotFoundComponent } from './pages/other-page/not-found/not-found.component';
import { AppLayoutComponent } from './shared/layout/app-layout/app-layout.component';
import { InvoicesComponent } from './pages/invoices/invoices.component';
import { LineChartComponent } from './pages/charts/line-chart/line-chart.component';
import { BarChartComponent } from './pages/charts/bar-chart/bar-chart.component';
import { AlertsComponent } from './pages/ui-elements/alerts/alerts.component';
import { AvatarElementComponent } from './pages/ui-elements/avatar-element/avatar-element.component';
import { BadgesComponent } from './pages/ui-elements/badges/badges.component';
import { ButtonsComponent } from './pages/ui-elements/buttons/buttons.component';
import { ImagesComponent } from './pages/ui-elements/images/images.component';
import { VideosComponent } from './pages/ui-elements/videos/videos.component';
import { SignInComponent } from './pages/auth-pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/auth-pages/sign-up/sign-up.component';
import { CalenderComponent } from './pages/calender/calender.component';

export const routes: Routes = [
  {
    path:'',
    component:AppLayoutComponent,
    children:[
      {
        path: '',
        component: EcommerceComponent,
        pathMatch: 'full',
        title: 'Dashboard | OpenTax Maestro',
      },
      {
        path:'calendar',
        component:CalenderComponent,
        title:'Calender | OpenTax Maestro'
      },
      {
        path:'profile',
        component:ProfileComponent,
        title:'Profile | OpenTax Maestro'
      },
      {
        path:'form-elements',
        component:FormElementsComponent,
        title:'Form Elements | OpenTax Maestro'
      },
      {
        path:'basic-tables',
        component:BasicTablesComponent,
        title:'Basic Tables | OpenTax Maestro'
      },
      {
        path:'blank',
        component:BlankComponent,
        title:'Blank | OpenTax Maestro'
      },
      // support tickets
      {
        path:'invoice',
        component:InvoicesComponent,
        title:'Invoice Details | OpenTax Maestro'
      },
      {
        path:'line-chart',
        component:LineChartComponent,
        title:'Line Chart | OpenTax Maestro'
      },
      {
        path:'bar-chart',
        component:BarChartComponent,
        title:'Bar Chart | OpenTax Maestro'
      },
      {
        path:'alerts',
        component:AlertsComponent,
        title:'Alerts | OpenTax Maestro'
      },
      {
        path:'avatars',
        component:AvatarElementComponent,
        title:'Avatars | OpenTax Maestro'
      },
      {
        path:'badge',
        component:BadgesComponent,
        title:'Badges | OpenTax Maestro'
      },
      {
        path:'buttons',
        component:ButtonsComponent,
        title:'Buttons | OpenTax Maestro'
      },
      {
        path:'images',
        component:ImagesComponent,
        title:'Images | OpenTax Maestro'
      },
      {
        path:'videos',
        component:VideosComponent,
        title:'Videos | OpenTax Maestro'
      },
    ]
  },
  // auth pages
  {
    path:'signin',
    component:SignInComponent,
    title:'Sign In | OpenTax Maestro'
  },
  {
    path:'signup',
    component:SignUpComponent,
    title:'Sign Up | OpenTax Maestro'
  },
  // error pages
  {
    path:'**',
    component:NotFoundComponent,
    title:'NotFound | OpenTax Maestro'
  },
];
