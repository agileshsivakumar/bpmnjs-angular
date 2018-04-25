import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as BpmnViewer from 'bpmn-js';
import * as ColorRendererModule from '../ColorRendererModule';

@Component({
    selector: 'app-bpmn-viewer',
    templateUrl: './bpmn-viewer.component.html',
    styleUrls: [ './bpmn-viewer.component.scss' ],
    encapsulation: ViewEncapsulation.None,
    providers: [ HttpClient ]
})
export class BpmnViewerComponent implements OnInit {
    private bpmnViewer: any;

    constructor(private httpClient: HttpClient) { }

    ngOnInit() {
        this.bpmnViewer = new BpmnViewer.default({
            container: '#bpmn-container',
            additionalModules: [
                ColorRendererModule
            ]
        });
        this.loadSampleBpmnDiagram();
    }

    private loadSampleBpmnDiagram() {
        const url = 'assets/pizza.bpmn';
        this.httpClient.get(
            url,
            { responseType: 'text' }
        ).subscribe(
            (bpmnDownloadResponse) => {
                this.bpmnViewer.importXML(bpmnDownloadResponse);
            },
            (bpmnDownloadError) => {
                // handle error
            }
        );
    }

}
