import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import * as BpmnColorRenderer from 'bpmn-js-task-priorities/lib/priorities/ColorRenderer';
import * as BpmnNavigatedViewer from 'bpmn-js/lib/NavigatedViewer';

@Component({
    selector: 'app-bpmn-viewer',
    templateUrl: './bpmn-viewer.component.html',
    styleUrls: [ './bpmn-viewer.component.scss' ],
    encapsulation: ViewEncapsulation.None,
    providers: [ HttpClient ]
})
export class BpmnViewerComponent implements OnInit {

    @ViewChild('bpmnModalContainer') private _bpmnModalContainer: ElementRef;

    private _bpmnNavigatedViewer: any;
    private _bpmnModalNavigatedViewer: any;
    private _bpmnDownloadResponse = '';
    private _isBpmnModalHidden = true;

    set bpmnDownloadResponse(bpmnDownloadResponse: string) {
        this._bpmnDownloadResponse = bpmnDownloadResponse;
    }
    get isBpmnModalHidden() {
        return this._isBpmnModalHidden;
    }

    constructor(private httpClient: HttpClient, private _renderer2: Renderer2) { }

    ngOnInit() {
        this._bpmnNavigatedViewer = new BpmnNavigatedViewer.default({
            container: '#bpmn-viewer-content-diagram',
            additionalModules: [ {
                __init__: [ 'colorRenderer' ],
                colorRenderer: [ 'type', BpmnColorRenderer ]
            } ]
        });
        this._bpmnModalNavigatedViewer = new BpmnNavigatedViewer.default({
            container: '#bpmn-viewer-modal-content-diagram',
            additionalModules: [ {
                __init__: [ 'colorRenderer' ],
                colorRenderer: [ 'type', BpmnColorRenderer ]
            } ]
        });
        this.loadSampleBpmnDiagram();
        this.appendBpmnModalContainerToBody();
    }

    public loadSampleBpmnDiagram() {
        const url = 'assets/pizza.bpmn';
        this.httpClient.get(url, { responseType: 'text' })
            .subscribe((bpmnDownloadResponse) => {
                const that = this;
                this._bpmnDownloadResponse = bpmnDownloadResponse;
                this._bpmnNavigatedViewer.importXML(this._bpmnDownloadResponse, function () {
                    that.customizeBpmnDiagram(that._bpmnNavigatedViewer);
                    that.resetBpmnZoom(that._bpmnNavigatedViewer);
                });
            }, (bpmnDownloadError) => {
                // handle error
            });
    }

    public showBpmnModalView() {
        this._isBpmnModalHidden = false;
        const that = this;
        this._bpmnModalNavigatedViewer.importXML(this._bpmnDownloadResponse, function () {
            that.customizeBpmnDiagram(that._bpmnModalNavigatedViewer);
            that.resetBpmnZoom(that._bpmnModalNavigatedViewer);
        });
    }

    private customizeBpmnDiagram(bpmnViewerElement: any) {
        try {
            bpmnViewerElement._definitions.diagrams[ 0 ].plane.planeElement.forEach(moddleElement => {
                this.addBpmnMarker(bpmnViewerElement.get('canvas'), moddleElement.bpmnElement.$type, moddleElement.bpmnElement.id);
            });
        } catch (bpmnCustomizationError) { }
    }

    private addBpmnMarker(bpmnCanvas: any, bpmnType: string, bpmnId: string) {
        switch (bpmnType) {
            case 'bpmn:StartEvent':
                bpmnCanvas.addMarker(bpmnId, 'highlight-green');
                break;
            case 'bpmn:EndEvent':
                bpmnCanvas.addMarker(bpmnId, 'highlight-red');
                break;
            case 'bpmn:ExclusiveGateway':
                bpmnCanvas.addMarker(bpmnId, 'highlight-yellow');
                break;
            default:
                break;
        }
    }

    private appendBpmnModalContainerToBody() {
        this._renderer2.appendChild(document.body, this._bpmnModalContainer.nativeElement);
    }

    public resetBpmnZoom(bpmnViewerElement?: any) {
        const bpmnViewer = bpmnViewerElement || this._bpmnNavigatedViewer;
        bpmnViewer.get('canvas').zoom('fit-viewport');
    }

    public hideBpmnModalView() {
        this._isBpmnModalHidden = true;
    }

}
