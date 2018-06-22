import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BpmnModule } from './bpmn/bpmn.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BpmnModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
