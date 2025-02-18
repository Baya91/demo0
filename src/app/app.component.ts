import {
  AfterViewInit,
  Component,
  HostListener,
} from '@angular/core';

import * as THREE from 'three';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit {
  private camera: any;
  private image: any;

  ngAfterViewInit() {
    this.initializeScene();
  }

  private initializeScene() {
    // تأكد من أن المشهد جاهز قبل البحث عن العناصر
    setTimeout(() => {
      this.image = document.getElementById('image');
      this.camera = document.querySelector('a-entity[camera]');
    }, 1000);
  }

  @HostListener('click', ['$event'])
  handleClick(event: MouseEvent) {
    if (!this.image || !this.camera) return;

    // تحويل إحداثيات الشاشة إلى إحداثيات ثلاثية الأبعاد
    const touchX = (event.clientX / window.innerWidth) * 2 - 1;
    const touchY = -(event.clientY / window.innerHeight) * 2 + 1;

    // الحصول على موضع الكاميرا والاتجاه
    const camPos = this.camera.object3D.position;
    const direction = new THREE.Vector3();
    this.camera.object3D.getWorldDirection(direction);
    
    // تعيين المسافة التي ستوضع عندها الصورة
    const distance = 2;
    const newX = camPos.x + direction.x * distance;
    const newY = camPos.y + direction.y * distance;
    const newZ = camPos.z + direction.z * distance;

    // تحديث موقع الصورة
    this.image.setAttribute('position', `${newX} ${newY} ${newZ}`);
    this.image.setAttribute('visible', 'true');
  }
}
