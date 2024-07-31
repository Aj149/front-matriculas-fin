import { Component } from '@angular/core';
import { NuevaAula } from '../../../../models/aula';
import { AulaService } from '../../../../services/aula.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
// Sweetalert -> para las alertas
import Swal from 'sweetalert2';

@Component({
  selector: 'app-aula-edit',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './aula-edit.component.html',
  styleUrl: './aula-edit.component.css'
})
export class AulaEditComponent {

  aula: NuevaAula = {
    nombreAula: '',
    capacidad: 0,
  };
  constructor(
    private aulaService: AulaService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id_aula = this.activatedRoute.snapshot.params['id_aula'];
    this.aulaService.detail(id_aula).subscribe(
      (data: any) => {
        this.aula = data;
      },
      (err: any) => {
        this.toastr.error(err.error.message, 'Fail', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
        this.volver();
      }
    );
  }

  Update(): void {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Deseas actualizar esta aula?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, actualizar",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        const id_aula = this.activatedRoute.snapshot.params['id_aula'];
        this.aulaService.update(id_aula, this.aula).subscribe(
          (data: any) => {
            this.toastr.success(data.message, 'OK', {
              timeOut: 3000, positionClass: 'toast-top-center'
            });
            this.volver();
          },
          (err: any) => {
            this.toastr.error(err.error.message, 'Fail', {
              timeOut: 3000, positionClass: 'toast-top-center',
            });
          }
        );
      }
    });
  }

  volver(): void {
    this.router.navigate(['/dashboard/aula']);
  }
}
