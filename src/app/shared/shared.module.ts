import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from './ui-modules/theme.modules';
import { MoviesCardComponent } from './components/product-card/product-card.component';
import { ScreenHeaderComponent } from './components/screen-header/screen-header.component';
import { HeroSectionComponent } from './components/hero-section/hero-section.component';
import { FooterComponent } from './components/footer/footer.component';




@NgModule({
  declarations: [
    MoviesCardComponent,
    ScreenHeaderComponent,
    HeroSectionComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    ThemeModule,
  ],
  exports: [
    ThemeModule,
    MoviesCardComponent,
    ScreenHeaderComponent,
    HeroSectionComponent,
    FooterComponent
  ]
})
export class SharedModule { }
