import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EnterExitPanelComponent } from './enterExitPanel.component';

describe('EnterExitPanelComponent', () => {
  let component: EnterExitPanelComponent;
  let fixture: ComponentFixture<EnterExitPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnterExitPanelComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EnterExitPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
