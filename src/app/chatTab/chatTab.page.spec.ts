import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { ChatTabPage } from './chatTab.page';

describe('ChatTabPage', () => {
  let component: ChatTabPage;
  let fixture: ComponentFixture<ChatTabPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChatTabPage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ChatTabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
