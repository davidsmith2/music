import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'davidsmith-album-master',
  templateUrl: './album-master.component.html',
  styleUrls: ['./album-master.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlbumMasterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
