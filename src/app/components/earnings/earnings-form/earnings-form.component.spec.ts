import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EarningsFormComponent } from './earnings-form.component';

describe('EarningsFormComponent', () => {
  let component: EarningsFormComponent;
  let fixture: ComponentFixture<EarningsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EarningsFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EarningsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
