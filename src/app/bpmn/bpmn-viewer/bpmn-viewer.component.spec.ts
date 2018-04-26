import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BpmnViewerComponent } from './bpmn-viewer.component';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { By } from '@angular/platform-browser';

describe('BpmnViewerComponent', () => {
    let component: BpmnViewerComponent;
    let fixture: ComponentFixture<BpmnViewerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ HttpClientModule ],
            declarations: [ BpmnViewerComponent ],
            providers: [ HttpClient ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BpmnViewerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create the BpmnViewerComponent', () => {
        expect(component).toBeTruthy();
        const alertDivsSuccess = fixture.debugElement.queryAll(By.css('ngb-alert > div.alert.alert-success > div'));
    });
});
