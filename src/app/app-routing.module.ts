import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { RegisterFormComponent } from './authentication/register-form/register-form.component';
import { LoginFormComponent } from './authentication/login-form/login-form.component';
import { HomeComponent } from './components/home/home.component';
import { LogoutComponent } from './authentication/logout-component/logout.component';
import { CreateMemeComponent } from './components/create-meme/create-meme.component';
import { MemeDetailsComponent } from './components/memes/meme-details/meme-details.component';
import { UserDetailsComponent } from './components/users/user-details/user-details.component';
import { EditUserComponent } from './components/users/edit-user/edit-user.component';
import { EditMemeComponent } from './components/memes/edit-meme/edit-meme.component';
import { SearchResultsComponent } from './components/memes/search-results/search-results.component';

// Guards
import { AuthGuard } from './guards/auth.guard.service';



const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', canActivate: [AuthGuard], component: HomeComponent },
  { path: 'create', canActivate: [AuthGuard], component: CreateMemeComponent },
  { path: 'meme/:id', component: MemeDetailsComponent },
  { path: 'meme/edit/:id', component: EditMemeComponent },
  { path: 'search', component: SearchResultsComponent },
  { path: 'register', component: RegisterFormComponent },
  { path: 'login', component: LoginFormComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'users/:username', component: UserDetailsComponent },
  { path: 'users/edit/:username', component: EditUserComponent }

]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutesModule { }
