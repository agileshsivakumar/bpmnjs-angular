import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as BpmnNavigatedViewer from 'bpmn-js/lib/NavigatedViewer';
import * as BpmnColorRenderer from 'bpmn-js-task-priorities/lib/priorities/ColorRenderer';

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
        this.bpmnViewer = new BpmnNavigatedViewer.default({
            container: '#bpmn-container',
            additionalModules: [ {
                __init__: [ 'colorRenderer' ],
                colorRenderer: [ 'type', BpmnColorRenderer ]
            } ]
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
                const that = this;
                this.bpmnViewer.importXML(bpmnDownloadResponse, function () {
                    that.bpmnViewer.get('canvas').zoom('fit-viewport');
                    const eventBus = that.bpmnViewer.get('eventBus');
                    eventBus.on('element.click', function (e) {
                        console.log(e.element);
                        console.log(e.gfx);
                        console.log(event, 'on', e.element.id);
                    });
                });
            },
            (bpmnDownloadError) => {
                // handle error
            }
        );
    }

    resetZoomLevelOfBpmnDiagram() {
        const canvasElement = this.bpmnViewer.get('canvas');
        canvasElement.zoom('fit-viewport');
    }

}
