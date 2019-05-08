import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from '../components/home/home.component';
import { TokenService } from '../services/token.service';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { FeedbackComponent } from '../components/feedback/feedback.component';
import { AllSpeakersComponent } from '../components/speakers/all-speakers/all-speakers.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { Speaker0Component } from '../components/speakers/speaker0/speaker0.component';
import { Speaker1Component } from '../components/speakers/speaker1/speaker1.component';
import { Speaker2Component } from '../components/speakers/speaker2/speaker2.component';
import { PostFormComponent } from '../components/feedback/post-form/post-form.component';
import { PostComponent } from '../components/feedback/post/post.component';
import { PostService } from '../services/post.service';

@NgModule({
  declarations: [
    HomeComponent,
    NavbarComponent,
    FeedbackComponent,
    AllSpeakersComponent,
    Speaker0Component,
    Speaker1Component,
    Speaker2Component,
    PostFormComponent,
    PostComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule
  ],
  exports: [
    HomeComponent,
    NavbarComponent
  ],
  providers: [
    TokenService,
    PostService
  ]
})
export class HomeModule { }
