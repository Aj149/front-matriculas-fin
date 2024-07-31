export class Estudiante {
  id_estudiante?: number= 0;
  nombre_estudiante: string ='';
  cedula_estudiante: string = '';
  email_estudiante: string = '';
  edad_estudiante: number = 0;
  numero_estudiante: string = '';
  representante: Representante = new Representante();
  direccion: Direccion = new Direccion();
  institucion: Institucion = new Institucion();
}
export class Representante {
  nombre_representante: string = '';
  cedula_representante: string = '';
  email_representante: string = '';
  numero_representante: string = '';
}

export class Direccion {
  ciudad: string = '';
  sector: string = '';
  detalle: string = '';
}
export class Institucion {
  nombre: string = '';
  tipo: string = '';
  nivel: string = '';
  grado: string = '';
  jornada: string = '';
  anoLectivo: string = '';

}

export class UpdateEstudiante {
  id_estudiante?: number;
  nombre_estudiante: string = '';
}

export class ViewEstudiante {
  id_estudiante?: number;
  nombre_estudiante!: string;
  cedula_estudiante!: string;
  email_estudiante!: string;
  edad_estudiante!: number;
  numero_estudiante!: string;
  //Se creo las 3 variables y se llamo al view de cada una
  representante: Representante = new Representante();
  direccion: Direccion = new Direccion();
  institucion: Institucion = new Institucion();
}
//Se creo el view representante
export class ViewRepresentante {
  nombre_representante: string = '';
  cedula_representante: string = '';
  email_representante: string = '';
  numero_representante: string = '';
}
//Se creo el view direccion
export class ViewDireccion {
  ciudad: string = '';
  sector: string = '';
  detalle: string = '';
}

//Se creo el view institucion
export class ViewInstitucion {
  nombre: string = '';
  tipo: string = '';
  nivel: string = '';
  grado: string = '';
  jornada: string = '';
}