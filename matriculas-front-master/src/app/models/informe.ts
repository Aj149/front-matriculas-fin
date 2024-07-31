import { NuevoUsuario } from "./nuevo-usuario";

export class InformeModel {
  id_informe?: number = 0;
  estudiante: string = '';
  fecha: Date = new Date();
  instructor: NuevoUsuario = new NuevoUsuario();
  hora: string = '';
  codigo: string = '';
  materia: string = '';
  turno: string = '';
  tema_general: string = '';
  tema_secundario: string = '';
  actitud_estudiante: string = '';
  tareas_enviadas: string = '';
  bases: string = '';
  tareas: string = '';
  evolucion: string = '';
  hora_fecha_llamada: Date = new Date();
  representante: string = '';
  observaciones: string = '';
  realizado_por: string = '';
}

export class NuevoInforme {
  id_informe?: number = 0;
  estudiante: string = '';
  fecha: Date = new Date();
  instructor: number = 0;
  hora: string = '';
  codigo: string = '';
  materia: string = '';
  turno: string = '';
  tema_general: string = '';
  tema_secundario: string = '';
  actitud_estudiante: string = '';
  tareas_enviadas: string = '';
  bases: string = '';
  tareas: string = '';
  evolucion: string = '';
  hora_fecha_llamada: Date = new Date();
  representante: string = '';
  observaciones: string = '';
  realizado_por: string = '';
}
