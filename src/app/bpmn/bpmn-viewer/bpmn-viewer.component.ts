import { Component, OnInit, ViewEncapsulation, HostListener, ViewChild } from '@angular/core';
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
    private bpmnNavigatedViewer: any;
    private bpmnModalNavigatedViewer: any;
    private bpmnDownloadResponse = '';

    constructor(private httpClient: HttpClient) { }

    ngOnInit() {
        this.bpmnNavigatedViewer = new BpmnNavigatedViewer.default({
            container: '#bpmn-container',
            additionalModules: [ {
                __init__: [ 'colorRenderer' ],
                colorRenderer: [ 'type', BpmnColorRenderer ]
            } ]
        });
        this.bpmnModalNavigatedViewer = new BpmnNavigatedViewer.default({
            container: '#bpmn-modal-content-container',
            additionalModules: [ {
                __init__: [ 'colorRenderer' ],
                colorRenderer: [ 'type', BpmnColorRenderer ]
            } ]
        });
        this.loadSampleBpmnDiagram();
        this.appendBpmnModalContainerToBody();
    }

    private loadSampleBpmnDiagram() {
        const url = 'assets/pizza.bpmn';
        this.httpClient.get(
            url,
            { responseType: 'text' }
        ).subscribe(
            (bpmnDownloadResponse) => {
                const that = this;
                this.bpmnDownloadResponse = bpmnDownloadResponse;
                this.bpmnNavigatedViewer.importXML(this.bpmnDownloadResponse, function () {
                    that.bpmnNavigatedViewer.get('canvas').zoom('fit-viewport');
                    const eventBus = that.bpmnNavigatedViewer.get('eventBus');
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

    private appendBpmnModalContainerToBody() {
        const bpmnModal = document.getElementById('bpmn-modal-container');
        document.body.appendChild(bpmnModal);
    }

    public resetZoomLevelOfBpmnDiagram() {
        const canvasElement = this.bpmnNavigatedViewer.get('canvas');
        canvasElement.zoom('fit-viewport');
    }

    public showBpmnModalView() {
        const bpmnModal = document.getElementById('bpmn-modal-container');
        bpmnModal.style.display = 'block';
        const that = this;
        this.bpmnModalNavigatedViewer.importXML(this.bpmnDownloadResponse, function () {
            that.bpmnModalNavigatedViewer.get('canvas').zoom('fit-viewport');
            const eventBus = that.bpmnModalNavigatedViewer.get('eventBus');
            eventBus.on('element.click', function (e) {
                console.log(e.element);
                console.log(e.gfx);
                console.log(event, 'on', e.element.id);
            });
        });
    }

    public hideBpmnModalView() {
        const bpmnModal = document.getElementById('bpmn-modal-container');
        bpmnModal.style.display = 'none';
    }

}
