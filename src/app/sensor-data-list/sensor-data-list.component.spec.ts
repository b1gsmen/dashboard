import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorDataListComponent } from './sensor-data-list.component';

describe('SensorDataListComponent', () => {
  let component: SensorDataListComponent;
  let fixture: ComponentFixture<SensorDataListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SensorDataListComponent]
    });
    fixture = TestBed.createComponent(SensorDataListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
