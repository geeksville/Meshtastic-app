import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewChannelPage } from './new-channel.page';

describe('NewChannelPage', () => {
  let component: NewChannelPage;
  let fixture: ComponentFixture<NewChannelPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewChannelPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewChannelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
