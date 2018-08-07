import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResizerComponent } from './resizer.component';

describe('ResizerComponent', () => {
  let component: ResizerComponent;
  let fixture: ComponentFixture<ResizerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResizerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
