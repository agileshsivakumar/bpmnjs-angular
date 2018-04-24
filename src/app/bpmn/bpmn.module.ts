import { NgModule } from '@angular/core';
import { BpmnViewerComponent } from './bpmn-viewer/bpmn-viewer.component';
import { HttpClientModule } from '@angular/common/http';

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
