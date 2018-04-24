import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as bpmn from 'bpmn-js';

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
        this.bpmnViewer = new bpmn.default({ container: '#bpmn-container' });
        this.loadSampleBpmnDiagram();
    }

    private loadSampleBpmnDiagram() {
        // sample bpmn url
        const url = 'https://cdn.rawgit.com/bpmn-io/bpmn-js-examples/dfceecba/colors/resources/pizza-collaboration.bpmn';
        this.httpClient.get(
            url,
            { responseType: 'text' }
        ).subscribe(
            (bpmnDownloadResponse) => {
                const that = this;
                this.bpmnViewer.importXML(bpmnDownloadResponse, function () {
                    const bpmnContainer = that.bpmnViewer.get('canvas');
                    bpmnContainer.addMarker('OrderReceivedEvent', 'event'); // using the id of the event tag and assigning class to it
                    bpmnContainer.addMarker('CalmCustomerTask', 'task');
                    bpmnContainer.addMarker('_6-463', 'event');
                });
            },
            (bpmnDownloadError) => {
                if (bpmnDownloadError) {
                    console.log('error rendering', bpmnDownloadError);
                }
            }
        );
    }

}
