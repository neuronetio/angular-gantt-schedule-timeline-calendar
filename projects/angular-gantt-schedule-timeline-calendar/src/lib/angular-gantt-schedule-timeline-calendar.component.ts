import {
  Component,
  AfterViewInit,
  ElementRef,
  ViewChild,
  Input,
  Output,
  OnDestroy,
  ViewEncapsulation,
  EventEmitter
} from "@angular/core";
import GSTC from "gantt-schedule-timeline-calendar/dist/index.esm.js";

@Component({
  selector: "gstc",
  template: `
    <div class="gstc" #gstcElement></div>
  `,
  styleUrls: [
    "../../../../node_modules/gantt-schedule-timeline-calendar/dist/style.css"
  ],
  encapsulation: ViewEncapsulation.None
})
export class GSTCComponent implements AfterViewInit, OnDestroy {
  @Input() config: any;
  @Output() onState: EventEmitter<any> = new EventEmitter();
  @ViewChild("gstcElement", { static: true }) gstcElement: ElementRef;

  GSTC: any;
  state: any;

  constructor() {}

  ngAfterViewInit() {
    const element = this.gstcElement.nativeElement;
    this.state = GSTC.api.stateFromConfig(this.config);
    this.onState.emit(this.state);
    this.GSTC = GSTC({
      element,
      state: this.state
    });
  }

  ngOnDestroy() {
    this.GSTC.app.destroy();
  }
}
