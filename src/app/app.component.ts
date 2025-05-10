import { Component } from '@angular/core';
import { Tarefa } from "./tarefa";
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})

export class ItemComponent implements OnInit {
  tarefas: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.READ_tarefas();
    this.http.get<any[]>('https://back-todoapp-ge5j.onrender.com/tarefas')
      .subscribe(data => {
        this.tarefas = data;
        
      });
  }
}

export class AppComponent {
  title = 'TODOapp';

  arrayDeTarefas: Tarefa[] = [];
  apiURL : string;

 constructor(private http: HttpClient) {
  this.apiURL = 'https://back-todoapp-ge5j.onrender.com';
 this.READ_tarefas();
 }

 CREATE_tarefa(descricaoNovaTarefa: string) {
 var novaTarefa = new Tarefa(descricaoNovaTarefa, false);
 this.http.post<Tarefa>(`${this.apiURL}/api/post`, novaTarefa).subscribe(
 resultado => { console.log(resultado); this.READ_tarefas(); });
 }

 READ_tarefas() {
this.http.get<Tarefa[]>(`${this.apiURL}/api/getAll`).subscribe(
 resultado => this.arrayDeTarefas=resultado);
 }

 DELETE_tarefa(tarefaAserRemovida : Tarefa) {
 var indice = this.arrayDeTarefas.indexOf(tarefaAserRemovida);
 var id = this.arrayDeTarefas[indice]._id;
 this.http.delete<Tarefa>(`${this.apiURL}/api/delete/${id}`).subscribe(
 resultado => { console.log(resultado); this.READ_tarefas(); });
}

UPDATE_tarefa(tarefaAserModificada: Tarefa) {
 var indice = this.arrayDeTarefas.indexOf(tarefaAserModificada);
 var id = this.arrayDeTarefas[indice]._id;
 this.http.patch<Tarefa>(`${this.apiURL}/api/update/${id}`,
 tarefaAserModificada).subscribe(
 resultado => { console.log(resultado); this.READ_tarefas(); });
}

}
