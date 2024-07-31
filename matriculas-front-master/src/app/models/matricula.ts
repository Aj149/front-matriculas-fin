
export class Programacion {
  horario_id: number[] = [];
}
export class Matricula {
  fecha: string= '';
  fechaInicio: string= '';
  fechaFinal: string= '';
  id_estudiante: number = 0;
  id_usuario: number = 0;
  id_materias: number[] = [];
  programacion: Programacion = new Programacion();
  turno: string= '';
  precio: number = 0;
  valorMateriales: number = 0;
  conIva: boolean= true;
  observaciones: string= '';
}


