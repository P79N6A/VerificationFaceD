import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecordRTCComponent } from './record-rtc/record-rtc.component';

const routes: Routes = [
  {path:'home',component:RecordRTCComponent},
  { path: 'record-rtc', component: RecordRTCComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
