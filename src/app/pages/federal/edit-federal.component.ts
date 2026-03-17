import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-federal',
  templateUrl: './edit-federal.component.html',
  styleUrls: ['./edit-federal.component.css']
})
export class EditFederalComponent {
  item: string | null = null;

  constructor(private route: ActivatedRoute) {
    this.route.paramMap.subscribe(params => {
      this.item = params.get('item');
    });
  }
}
