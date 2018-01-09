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
import { PageNotFoundComponent } from './components/common/page-not-found/page-not-found.component';
import { AdminPanelComponent } from './components/admin/admin-panel/admin-panel.component';

// Guards
import { AuthGuard } from './guards/auth.guard.service';
import { OwnerGuard } from './guards/owner.guard';
import { ProfileGuard } from './guards/profile.guard';
import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'create', canActivate: [AuthGuard], component: CreateMemeComponent },
  { path: 'meme/:id', canActivate: [AuthGuard], component: MemeDetailsComponent },
  { path: 'meme/edit/:id', canActivate: [AuthGuard, OwnerGuard], component: EditMemeComponent },
  { path: 'search', component: SearchResultsComponent },
  { path: 'register', component: RegisterFormComponent },
  { path: 'login', component: LoginFormComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'users/:username', canActivate: [AuthGuard], component: UserDetailsComponent },
  { path: 'users/edit/:username', canActivate: [ProfileGuard, AuthGuard], component: EditUserComponent },
  { path: 'admin', canActivate: [AdminGuard], component: AdminPanelComponent },
  { path: 'not-found', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/not-found' }
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutesModule { }
