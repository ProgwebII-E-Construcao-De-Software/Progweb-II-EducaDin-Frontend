import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GanhoListComponent } from './ganho-list.component';

describe('GanhoListComponent', () => {
  let component: GanhoListComponent;
  let fixture: ComponentFixture<GanhoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GanhoListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GanhoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
