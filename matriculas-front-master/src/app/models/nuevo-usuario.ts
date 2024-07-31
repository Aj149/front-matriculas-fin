export class NuevoUsuario {
  id_usuario?: number = 0;
  nombres_usuario: string = '';
  cedula: string = '';
  password: string = '';
  roles: { id: number; rolNombre: string }[] = [];
}

export class UpdateUsuario {
  id_usuario?: number = 0;
  nombres_usuario: string = '';
  cedula: string = '';
}

export class Profesor {
  id_usuario!: number;
  nombres_usuario!: string;
  cedula!: string;
}
