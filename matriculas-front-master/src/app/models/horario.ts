import { NuevaAula } from "./aula";



export class Horario {
    id_horario?:number = 0;
    dia: string = '';
    horaInicio: string = '';
    horaSalida: string = '';
    modalidad: string = '';
    horasDiarias?: number =0;
    aula: NuevaAula  = new NuevaAula();
}

export class CreateHorario {
  id_horario?:number;
  dia!: string;
  horaInicio!: string;
  horaSalida!: string;
  modalidad!: string;
  aulaId!: number;
  horario!: string;
}


export class ViewHorario {
  id_horario?: number;
  dia: string = '';
  horaInicio: string = '';
  horaSalida: string = '';
  modalidad: string = '';
  aula?: Aula;

}
export class Aula {
  id_aula?: number;
  nombreAula: string = '';
  capacidad: number = 0;
}
