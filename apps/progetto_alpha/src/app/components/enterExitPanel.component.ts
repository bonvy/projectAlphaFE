import { Component, computed, input, Signal } from '@angular/core';


@Component({
  selector: 'app-enter-exit-panel',
  templateUrl: './enterExitPanel.component.html',
  styleUrl: './enterExitPanel.component.css'
})
export class EnterExitPanelComponent {

  value = input<number>();
  isEnter = input<boolean>();
  color: Signal<string> = computed(() => {
    if (this.isEnter()) {
      return '#2B9348';
    } else {
      return '#E07A5F';
    }
  });

}
