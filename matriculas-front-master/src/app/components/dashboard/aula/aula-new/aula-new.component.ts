import { Component } from '@angular/core';
import { AulaService } from '../../../../services/aula.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NuevaAula } from '../../../../models/aula';
import { FormsModule } from '@angular/forms';
// Sweetalert -> para las alertas
import Swal from 'sweetalert2';

@Component({
  selector: 'app-aula-new',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './aula-new.component.html',
  styleUrl: './aula-new.component.css'
})
export class AulaNewComponent {

  nombreAula = '';
  capacidad = 0;

  constructor(
    private aulaService: AulaService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  CreateAula(): void {
    // Mostrar alerta de confirmación
    Swal.fire({
      title: "¿Está seguro?",
      text: "¿Desea proceder con la creación del aula? Tenga en cuenta que una vez creada, no será posible eliminarla",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, crear aula",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        const aula = new NuevaAula();
        aula.nombreAula = this.nombreAula;
        aula.capacidad = this.capacidad;
        this.aulaService.save(aula).subscribe(
          (data: any) => {
            Swal.fire(
              'Creada!',
              'El aula ha sido creada correctamente.',
              'success'
            );
            this.volver();
          },
          (err: any) => {
            Swal.fire(
              'Error!',
              'Hubo un problema al crear el aula.',
              'error'
            );
          }
        );
      }
    });
  }

  volver(): void {
    this.router.navigate(['/dashboard/aula']);
  }

}
