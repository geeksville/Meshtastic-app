import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { JoinChannelPage } from './join-channel.page';

describe('JoinChannelPage', () => {
  let component: JoinChannelPage;
  let fixture: ComponentFixture<JoinChannelPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoinChannelPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(JoinChannelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
