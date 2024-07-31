export interface Estudiante {
  id_estudiante: number;
  nombre_estudiante: string;
  cedula_estudiante: string;
  email_estudiante: string;
  edad_estudiante: number;
  numero_estudiante: string;
}

export interface Usuario {
  id_usuario: number;
  nombres_usuario: string;
  cedula: string;
  roles: { id: number; rolNombre: string; createdAt: Date; updatedAt: Date; deletedAt: Date | null; }[];
  materia: any[];
}

export interface Materia {
  id_materia: number;
  nombre: string;
  abreviatura: string;
  isActive: boolean;
}

export interface Horario {
  id_horario: number;
  dia: string;
  horaInicio: string;
  horaSalida: string;
  modalidad: string;
  horasDiarias: number;
  isActive: boolean;
}

export interface Programacion {
  id_programacion: number;
  isActive: boolean;
  horario: Horario[];
}

export interface MatriculaId {
  id_matricula: number;
  fecha: Date;
  fechaInicio: Date;
  fechaFinal: Date;
  turno: string;
  cantidad: number;
  precio: number;
  valorHoras: number;
  valorMateriales: number;
  conIva: boolean;
  valorTotal: number;
  observaciones: string;
  isActive: boolean;
  alumno: Estudiante;
  profesor: Usuario;
  materias: Materia[];
  programacion: Programacion;
}
