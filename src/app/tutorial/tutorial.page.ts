import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSlides } from '@ionic/angular';
import { CheckTutorialService } from '../services/check-tutorial.service';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.page.html',
  styleUrls: ['./tutorial.page.scss'],
})
export class TutorialPage {
  showSkip = true;

  @ViewChild('slides', { static: true }) slides: IonSlides;

  constructor(
    private router: Router,
    private checkTutorial: CheckTutorialService,
  ) {}

  startApp() {
    this.router
      .navigateByUrl('/tabs')
      .then(() => this.checkTutorial.setSeen() );
  }

  onSlideChangeStart(event) {
    event.target.isEnd().then(isEnd => {
      this.showSkip = !isEnd;
    });
  }

  ionViewWillEnter() {
    if( this.checkTutorial.wasSeen() )
      this.router.navigateByUrl('/tabs');
  }
}