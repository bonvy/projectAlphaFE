import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { AppComponent } from '../app.component';
import { MainPageComponent } from '../main-page.component';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private render: Renderer2;

  constructor(private rendererFac: RendererFactory2) {
    this.render = rendererFac.createRenderer(null,null)
  }

  showNotification() {
    const  div = this.render.createElement('div')
    const text = this.render.createText('Hello Word')
    this.render.addClass(div, 'notification');

    // Stile inline per esempio
    this.render.setStyle(div, 'position', 'fixed');
    this.render.setStyle(div, 'bottom', '20px');
    this.render.setStyle(div, 'right', '20px');
    this.render.setStyle(div, 'background', 'lightgrey');
    this.render.setStyle(div, 'padding', '10px');
    this.render.setStyle(div, 'border', '1px solid black');
    this.render.setStyle(div, 'border-radius', '5px');


    this.render.appendChild(div,text )
    this.render.appendChild(document.body, div)
    setTimeout(() => {
      this.render.removeChild(document.body, div)
    },5000)

  }

}
