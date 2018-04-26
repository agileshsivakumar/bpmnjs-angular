import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { BpmnModule } from './bpmn/bpmn.module';
describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BpmnModule
      ],
      declarations: [
        AppComponent
      ]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
