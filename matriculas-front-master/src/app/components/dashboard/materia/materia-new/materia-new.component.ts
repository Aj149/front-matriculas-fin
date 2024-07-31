import { Component } from '@angular/core';
import { MateriaService } from '../../../../services/materia.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NuevaMateria } from '../../../../models/materia';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-materia-new',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './materia-new.component.html',
  styleUrls: ['./materia-new.component.css']
})
export class MateriaNewComponent {

  nombre: string = '';
  abreviatura: string = '';

  constructor(
    private materiaService: MateriaService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  Create(): void {
    const materia = new NuevaMateria();
    materia.nombre = this.nombre;
    materia.abreviatura = this.abreviatura;
    
    if (materia.nombre === '' || materia.abreviatura === '') {
      this.toastr.error('Campos vacíos', 'Fail', {
        timeOut: 3000,
        positionClass: 'toast-top-center'
      });
      return;
    }

    const abreviaturaPattern = /^[A-Z]{3}$/;
    if (!abreviaturaPattern.test(materia.abreviatura)) {
      this.toastr.error('La abreviatura debe ser de 3 letras y sin puntos ni comas', 'Fail', {
        timeOut: 3000,
        positionClass: 'toast-top-center'
      });
      return;
    }

    this.materiaService.save(materia).subscribe(
      (data: any) => {
        this.toastr.success(data.message, 'Ok', {
          timeOut: 3000, positionClass: 'toast-top-center',
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

  volver(): void {
    this.router.navigate(['/dashboard/materia']);
  }

  onInputAbreviatura(event: any): void {
    let value = event.target.value.toUpperCase();
    const invalidChars = /[^A-Z]/g;
    if (invalidChars.test(value)) {
      this.toastr.warning('Solo se permiten 3 caracteres sin puntos, ni comas ni números', 'Advertencia', {
        timeOut: 3000,
        positionClass: 'toast-top-center'
      });
    }
    value = value.replace(invalidChars, '');
    if (value.length > 3) {
      this.toastr.warning('Solo se permiten 3 caracteres sin puntos, ni comas ni números', 'Advertencia', {
        timeOut: 3000,
        positionClass: 'toast-top-center'
      });
      value = value.slice(0, 3);
    }
    this.abreviatura = value;
    event.target.value = value;
  }
}