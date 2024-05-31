import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonServiceAPI } from 'src/app/services/api/common.api.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit, OnDestroy {

  constructor(        private readonly _commonService: CommonServiceAPI
) { }
getallslider: any[] = [];
  currentIndex = 0;
  intervalId: any;

  ngOnDestroy() {
    this.stopAutoPlay();
  }

  startAutoPlay() {
    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, 5000); // Change slide every 5 seconds
  }

  stopAutoPlay() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.getallslider.length;
  }
  ngOnInit(): void {
 this._commonService.getSlider().subscribe((data) => {
      this.getallslider = data.map((x: any) => {
        return {
          id: x._id,
          link: x.link,
          imageUrl: x.imageurl,
          createdAt: x.createdat,
          createdBy: x.createdby
        };
      });
      console.log(this.getallslider);
    });
        this.startAutoPlay();
  }

}
