import { Component } from '@angular/core';
import { GRID } from './constants/app.constants';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-app',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  myGrid = GRID;
  userCount = 0;

  onCellClick(row: any, col: any) {
    let diagnal = false;
    if (col.content) {
      //to differentiate player
      alert('Go away !!!');
    } else {
      this.userCount++;
      if (this.userCount % 2 > 0) {
        col.content = 'X';
      } else {
        col.content = 'O';
      }
    }

    if (row.id + col.id === this.myGrid.demention - 1) {//diagnal 1
      let endDiagChk = false;
      this.myGrid.rows.forEach((r: any) => {
        r.columns.forEach((c: any) => {
          if (r.id + c.id === row.id + col.id) {
            if (!endDiagChk && c.content === col.content) {
              diagnal = true;
            } else {
            diagnal = false;
              endDiagChk = true;
            }
          }
        });
      });
      if (diagnal) {
        alert('Congrats, you win !!!');
        diagnal = false;
        this.reset();
        return;
      }
    }

    if (row.id === col.id) {//diagnal 2
      let endDiagChk = false;
      this.myGrid.rows.forEach((r: any) => {
        r.columns.forEach((c: any) => {
          if (r.id === c.id) {
            if (!endDiagChk && c.content === col.content) {
              diagnal = true;
            } else {
              diagnal = false;
              endDiagChk = true;
            }
          }
        });
      });
      if (diagnal) {
        alert('Congrats, you win !!!');
        diagnal = false;
        this.reset();
        return;
      }
    }

    if (//horizontal & vertical
      row.columns.every((c: any) => c.content === col.content) ||
      this.myGrid.rows.every(
        (r: any) => r.columns[col.id].content === col.content
      )
    ) {
      alert('Congrats, you win !!!');
      this.reset();
      return;
    }
  }

  reset() {
    this.myGrid.rows.forEach((r: any) => {
      r.columns.forEach((c: any) => (c.content = ''));
    });
  }
}
