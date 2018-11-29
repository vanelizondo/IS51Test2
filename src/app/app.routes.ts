import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TestScoreComponent } from './test-score/test-score.component';
import { HomeComponent } from './home/home.component';

const appRoutes: Routes = [
  {
    path: '',
    component: LoginComponent
  }, {
    path: 'home',
    component: HomeComponent
  }, {
    path: 'my-tests',
    component: TestScoreComponent
  }, {
    path: '**',
    component: LoginComponent
  }
];

export const AppRoutes = RouterModule.forRoot(appRoutes);
