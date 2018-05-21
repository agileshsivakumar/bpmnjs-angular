import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BpmnViewerComponent } from './bpmn-viewer.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';

describe('BpmnViewerComponent', () => {
  let bpmnViewerComponent: BpmnViewerComponent;
  let bpmnViewerComponentFixture: ComponentFixture<BpmnViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ],
      declarations: [ BpmnViewerComponent ],
      providers: [ HttpClient ]
    }).compileComponents();
  }));

  beforeEach(() => {
    bpmnViewerComponentFixture = TestBed.createComponent(BpmnViewerComponent);
    bpmnViewerComponent = bpmnViewerComponentFixture.componentInstance;
    bpmnViewerComponentFixture.detectChanges();
  });

  it('should create the BpmnViewerComponent', () => {
    expect(bpmnViewerComponent).toBeTruthy();
  });

  it('should render bpmn view', () => {
    bpmnViewerComponent.bpmnDownloadResponse = MockBpmnViewer.bpmnTestXml;
    expect(bpmnViewerComponentFixture.nativeElement.getElementsByClassName('bjs-container')).toBeTruthy();
  });
});

class MockBpmnViewer {
  static bpmnTestXml = `<?xml version="1.0" encoding="UTF-8"?>
    <definitions
    xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL"
    xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI"
    xmlns:camunda="http://camunda.org/schema/1.0/bpmn" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC"
    xmlns:di="http://www.omg.org/spec/DD/20100524/DI" id="definitions_eb6e5ca9-67ca-41f2-a850-4855b228f0a0"
    targetNamespace="http://www.omg.org/spec/BPMN/20100524/MODEL">
    <process id="process_5da30552-ed93-4079-8012-15c9f885ca2a" name="Universal Transaction Repository">
      <startEvent id="startEvent_a7ec430b-71eb-4844-9cca-52ad4c8f6f7f" name="Universal Transaction Repository - Start">
        <outgoing>sequenceFlow_0720ca87-485c-4d00-9751-78ace0c71e52</outgoing>
      </startEvent>
      <serviceTask id="serviceTask_145b7b25-4333-47c7-81b4-9e2a5edd0973" name="TransactionLog">
        <incoming>sequenceFlow_0720ca87-485c-4d00-9751-78ace0c71e52</incoming>
        <outgoing>sequenceFlow_49871bb9-3260-4a11-9e13-ff0d0986dfe9</outgoing>
      </serviceTask>
      <sequenceFlow
      id="sequenceFlow_0720ca87-485c-4d00-9751-78ace0c71e52" sourceRef="startEvent_a7ec430b-71eb-4844-9cca-52ad4c8f6f7f"
       targetRef="serviceTask_145b7b25-4333-47c7-81b4-9e2a5edd0973"/>
      <endEvent id="endEvent_82529102-0c74-4fe0-b434-e5432af4bf66" name="Universal Transaction Repository - End">
        <incoming>sequenceFlow_49871bb9-3260-4a11-9e13-ff0d0986dfe9</incoming>
      </endEvent>
      <sequenceFlow
       id="sequenceFlow_49871bb9-3260-4a11-9e13-ff0d0986dfe9"
        sourceRef="serviceTask_145b7b25-4333-47c7-81b4-9e2a5edd0973"
         targetRef="endEvent_82529102-0c74-4fe0-b434-e5432af4bf66"/>
    </process>
    <bpmndi:BPMNDiagram id="BPMNDiagram_b116da0a-13d9-40a6-90f8-5d36f3a2497a">
      <bpmndi:BPMNPlane bpmnElement="process_5da30552-ed93-4079-8012-15c9f885ca2a" id="BPMNPlane_85e53957-01e7-46ba-9213-aee7c57fee3c">
        <bpmndi:BPMNShape bpmnElement="startEvent_a7ec430b-71eb-4844-9cca-52ad4c8f6f7f" id="BPMNShape_6dbbe71c-dbd8-4ef1-9b08-db7ebe168a4b">
          <dc:Bounds height="36.0" width="36.0" x="100.0" y="100.0"/>
        </bpmndi:BPMNShape>
        <bpmndi:BPMNShape
         bpmnElement="serviceTask_145b7b25-4333-47c7-81b4-9e2a5edd0973" id="BPMNShape_605cdbcc-4e0d-4349-8361-3b598b542bd9">
          <dc:Bounds height="80.0" width="100.0" x="186.0" y="78.0"/>
        </bpmndi:BPMNShape>
        <bpmndi:BPMNEdge bpmnElement="sequenceFlow_0720ca87-485c-4d00-9751-78ace0c71e52" id="BPMNEdge_74bbf153-4213-40d8-a36c-ef7af526f4af">
          <di:waypoint x="136.0" y="118.0"/>
          <di:waypoint x="186.0" y="118.0"/>
        </bpmndi:BPMNEdge>
        <bpmndi:BPMNShape bpmnElement="endEvent_82529102-0c74-4fe0-b434-e5432af4bf66" id="BPMNShape_6387d450-c1fa-4d56-a108-fda83b5aca34">
          <dc:Bounds height="36.0" width="36.0" x="336.0" y="100.0"/>
        </bpmndi:BPMNShape>
        <bpmndi:BPMNEdge bpmnElement="sequenceFlow_49871bb9-3260-4a11-9e13-ff0d0986dfe9" id="BPMNEdge_c0d97451-4f86-4ecd-adfe-deb7aa3939a9">
          <di:waypoint x="286.0" y="118.0"/>
          <di:waypoint x="336.0" y="118.0"/>
        </bpmndi:BPMNEdge>
      </bpmndi:BPMNPlane>
    </bpmndi:BPMNDiagram>
  </definitions>`;
}
