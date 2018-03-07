import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent implements OnInit {

  @Input('list') list: any[];

  constructor() { }

  ngOnInit() {
  }

}
