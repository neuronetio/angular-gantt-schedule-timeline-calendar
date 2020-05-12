<p align="center">
  <img src="https://neuronet.io/screenshots/gstc9-flat-bgw-300.png" alt="logo">
</p>
<hr />
<h1 align="center">angular-gantt-schedule-timeline-calendar</h1>

Angular version of [gantt-schedule-timeline-calendar](https://github.com/neuronetio/gantt-schedule-timeline-calendar)

Documentation can be found on original component page at [gantt-schedule-timeline-calendar](https://github.com/neuronetio/gantt-schedule-timeline-calendar)

<p align="center">
  <img src="https://neuronet.io/screenshots/appscrn.png?uniq=1" alt="gstc-logo">
</p>

## installation

`npm i angular-gantt-schedule-timeline-calendar`

## usage

example app can be found here [ng-gantt-schedule-timeline-calendar](https://github.com/neuronetio/ng-gantt-schedule-timeline-calendar)

app.module

```javascript
/*...*/
import { AngularGanttScheduleTimelineCalendarModule } from "angular-gantt-schedule-timeline-calendar";

@NgModule({
  imports: [/*...*/ AngularGanttScheduleTimelineCalendarModule, /*...*/],
  /*...*/
})
/*...*/
```

component

```javascript
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "your-selector",
  template: '<gstc [config]="config" (onState)="onState($event)"></gstc>'
})
export class YourComponent implements OnInit {
  title = "ng-gstc-test";

  config: any;
  gstcState: any;

  ngOnInit() {
    const iterations = 400;

    // GENERATE SOME ROWS

    const rows = {};
    for (let i = 0; i < iterations; i++) {
      const withParent = i > 0 && i % 2 === 0;
      const id = i.toString();
      rows[id] = {
        id,
        label: "Room " + i,
        parentId: withParent ? (i - 1).toString() : undefined,
        expanded: false
      };
    }

    const dayLen = 24 * 60 * 60 * 1000;

    // GENERATE SOME ROW -> ITEMS

    const items = {};
    for (let i = 0; i < iterations; i++) {
      const id = i.toString();
      const start = new Date().getTime();
      items[id] = {
        id,
        label: "User id " + i,
        time: {
          start: start + i * dayLen,
          end: start + (i + 2) * dayLen
        },
        rowId: id
      };
    }

    // LEFT SIDE LIST COLUMNS

    const columns = {
      percent: 100,
      resizer: {
        inRealTime: true
      },
      data: {
        label: {
          id: "label",
          data: "label",
          expander: true,
          isHtml: true,
          width: 230,
          minWidth: 100,
          header: {
            content: "Room"
          }
        }
      }
    };

    this.config = {
      height: 800,
      list: {
        rows,
        columns
      },
      chart: {
        items
      }
    };
  }

  // GET THE GANTT INTERNAL STATE

  onState(state) {
    this.gstcState = state;

    // YOU CAN SUBSCRIBE TO CHANGES

    this.gstcState.subscribe("config.list.rows", rows => {
      console.log("rows changed", rows);
    });

    this.gstcState.subscribe(
      "config.chart.items.:id",
      (bulk, eventInfo) => {
        if (eventInfo.type === "update" && eventInfo.params.id) {
          const itemId = eventInfo.params.id;
          console.log(
            `item ${itemId} changed`,
            this.gstcState.get("config.chart.items." + itemId)
          );
        }
      },
      { bulk: true }
    );
  }
}
```

## license

AGPL-3.0 (for non AGPL-3.0 projects you must buy commercial license - contact me at neuronet.io@gmail.com)
