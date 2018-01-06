// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AuthenticationModule } from './authentication/auth.module';
import { AppRoutesModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Components
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { CreateMemeComponent } from './components/create-meme/create-meme.component';
import { MemeListComponent } from './components/memes/meme-list/meme-list.component';
import { MemeComponent } from './components/memes/meme/meme.component';
import { MemeDetailsComponent } from './components/memes/meme-details/meme-details.component';
import { CommentComponent } from './components/comments/comment/comment.component';
import { CommentSectionComponent } from './components/comments/comment-section/comment-section.component';
import { PostCommentComponent } from './components/comments/post-comment/post-comment.component';
import { UserDetailsComponent } from './components/users/user-details/user-details.component';
import { EditUserComponent } from './components/users/edit-user/edit-user.component';
import { UserService } from './services/user.service';

// Services
import { AuthGuard } from './guards/auth.guard.service';
import { MemeServiceService } from './services/meme-service.service';
import { CommentService } from './services/comment.service';
import { LoadingSpinnerComponent } from './components/common/loading-spinner/loading-spinner.component';
import { HeaderComponent } from './components/common/header/header.component';
import { LikedMemesComponent } from './components/memes/liked-memes/liked-memes.component';
import { EditMemeComponent } from './components/memes/edit-meme/edit-meme.component';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CreateMemeComponent,
    MemeListComponent,
    MemeComponent,
    MemeDetailsComponent,
    CommentComponent,
    CommentSectionComponent,
    PostCommentComponent,
    UserDetailsComponent,
    EditUserComponent,
    LoadingSpinnerComponent,
    HeaderComponent,
    LikedMemesComponent,
    EditMemeComponent
  ],
  imports: [
    BrowserModule,
    AuthenticationModule,
    AppRoutesModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthGuard,
    MemeServiceService,
    CommentService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
