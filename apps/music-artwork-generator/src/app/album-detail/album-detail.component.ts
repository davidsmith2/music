import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  template: `
    <h1>Detail</h1>
  `,
  styleUrls: ['./album-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlbumDetailComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log('hello, world!')
  }

}
