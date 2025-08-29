import { Component, Input } from '@angular/core';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-placeholder',
  standalone: true,
  imports: [ CardModule],
  templateUrl: './placeholder.component.html',
  styleUrl: './placeholder.component.scss'
})
export class PlaceholderComponent {
  @Input() placeholderContent: { title: string; message: string } | undefined = undefined
}
