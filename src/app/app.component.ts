import {
  AfterViewInit,
  Component,
  HostListener,
} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  private image: any;

  ngAfterViewInit() {
    this.initializeScene();
  }

  private initializeScene() {
    // تأكد من أن المشهد جاهز قبل البحث عن العناصر
    setTimeout(() => {
      this.image = document.getElementById('image');
    }, 1000);
  }

  @HostListener('click', ['$event'])
  handleClick(event: MouseEvent) {
    if (!this.image) return;

    // تحويل إحداثيات الشاشة إلى إحداثيات ثلاثية الأبعاد
    const touchX = (event.clientX / window.innerWidth) * 2 - 1;
    const touchY = -(event.clientY / window.innerHeight) * 2 + 1;

    // تحديث موقع الصورة
    this.image.setAttribute('position', `${touchX} ${touchY} -2`);
    this.image.setAttribute('visible', 'true');
  }
}