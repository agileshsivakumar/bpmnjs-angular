import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BpmnViewerComponent } from './bpmn-viewer/bpmn-viewer.component';

@NgModule({
    imports: [
        HttpClientModule
    ],
    declarations: [
        BpmnViewerComponent
    ],
    exports: [
        BpmnViewerComponent
    ]
})
export class BpmnModule { }
