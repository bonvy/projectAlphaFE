import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MylibComponent } from './mylib.component';

describe('MylibComponent', () => {
  let component: MylibComponent;
  let fixture: ComponentFixture<MylibComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MylibComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MylibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
