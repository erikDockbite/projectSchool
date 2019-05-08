import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from '../components/home/home.component';
import { AuthGuard } from '../services/auth.guard';
import { FeedbackComponent } from '../components/feedback/feedback.component';
import { AllSpeakersComponent } from '../components/speakers/all-speakers/all-speakers.component';
import { Speaker0Component } from '../components/speakers/speaker0/speaker0.component';
import { Speaker1Component } from '../components/speakers/speaker1/speaker1.component';
import { Speaker2Component } from '../components/speakers/speaker2/speaker2.component';

const routes : Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'allSpeakers',
    component: AllSpeakersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'speaker0',
    component: Speaker0Component,
    canActivate: [AuthGuard]
  },
  {
    path: 'speaker1',
    component: Speaker1Component,
    canActivate: [AuthGuard]
  },
  {
    path: 'speaker2',
    component: Speaker2Component,
    canActivate: [AuthGuard]
  },
  {
    path: 'feedback',
    component: FeedbackComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class HomeRoutingModule { }
