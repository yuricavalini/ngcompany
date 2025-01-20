import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';

import { BannerComponent } from './components/banner/banner.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { SliderComponent } from './components/slider/slider.component';

@NgModule({
  imports: [CommonModule, ButtonModule],
  declarations: [BannerComponent, SliderComponent, GalleryComponent],
  exports: [BannerComponent, SliderComponent, GalleryComponent]
})
export class UiModule {}
