import { Component} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HealthTrackerComponent } from "./components/health-tracker/health-tracker.component";

@Component({
  selector: 'app-root',
  imports: [FormsModule, ReactiveFormsModule, HealthTrackerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'fyle-assignment'
}