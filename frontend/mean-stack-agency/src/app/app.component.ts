import { Component } from '@angular/core';
import { materialize } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  host: {
    '[attr.ngSkipHydration]': 'true',
  }
})
export class AppComponent {
  title = 'mean-stack-agency';
}
