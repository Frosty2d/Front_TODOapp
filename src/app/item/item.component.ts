import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Tarefa } from "../tarefa";

@Component({
  selector: 'app-item',
  standalone: false,
  templateUrl: './item.component.html',
  styleUrl: './item.component.css'
})
export class ItemComponent {
  emEdicao = false;
 @Input() tarefa: Tarefa = new Tarefa("", false);
 @Output() removeTarefa = new EventEmitter();
 @Output() modificaTarefa = new EventEmitter();
}
 alternarStatus() {
    this.tarefa.statusRealizada = !this.tarefa.statusRealizada;
    this.modificaTarefa.emit(this.tarefa);
  }
}
