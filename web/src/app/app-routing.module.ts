import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ChatComponent } from './component/chat/chat.component';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { AuthGuard } from './modules/guards/auth.guard';


const routes: Routes = [
  {
    path: '', 
    component: AppComponent,
    // canActivate: [AuthGuard],
    children: [
      { path: ':id', component: HomeComponent },
      { path: 'chat/:name', component: ChatComponent }
    ]
  },
  {
    path: 'login', component: LoginComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
