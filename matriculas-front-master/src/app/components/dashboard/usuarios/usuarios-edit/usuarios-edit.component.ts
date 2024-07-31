import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UpdateUsuario } from '../../../../models/nuevo-usuario';
import { AuthService } from '../../../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-usuarios-edit',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './usuarios-edit.component.html',
  styleUrl: './usuarios-edit.component.css',
})
export class UsuariosEditComponent implements OnInit {
  usuarioForm: FormGroup;
  id_usuario: number;

  constructor(
    private usuarioService: AuthService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.usuarioForm = this.fb.group({
      nombres_usuario: ['', Validators.required],
      cedula: ['', Validators.required],
    });
    this.id_usuario = this.activatedRoute.snapshot.params['id_usuario'];
  }

  ngOnInit(): void {
    this.lista();
  }

  lista() {
    if (this.id_usuario !== null) {
      this.usuarioService.detail(this.id_usuario).subscribe((data) => {
        this.usuarioForm.setValue({
          nombres_usuario: data.nombres_usuario,
          cedula: data.cedula,
        });
      });
    }
  }

  submitForm(): void {
    if (this.usuarioForm.get('cedula')?.value.length < 10) {
      this.toastr.warning('La cédula debe tener exactamente 10 caracteres', 'Alerta', {
        timeOut: 2000, positionClass: 'toast-top-center',
      });
      return;
    }
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Deseas actualizar este usuario?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, actualizar",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        const usuario: UpdateUsuario = {
          nombres_usuario: this.usuarioForm.get('nombres_usuario')?.value,
          cedula: this.usuarioForm.get('cedula')?.value,
        };
        this.usuarioService.update(this.id_usuario, usuario).subscribe(
          (data) => {
            this.toastr.success(data.mensage, 'Usuario editado correctamente', {
              positionClass: 'toast-top-center'
            });
            this.volver();
          },
          (error) => {
            this.toastr.error(error.error.message, 'Fail', {
              positionClass: 'toast-top-center'
            });
            this.usuarioForm.reset();
          }
        );
      }
    });
  }

  volver(): void {
    this.router.navigate(['/dashboard/usuarios']);
  }
}
