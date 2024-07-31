import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatriculaService } from '../../../../services/matricula.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HorarioService } from '../../../../services/horario.service';
import { InformeModel } from '../../../../models/informe';
import { Horario, MatriculaId } from '../../../../models/view_matricula';
import { CommonModule } from '@angular/common';

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-matricula-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './matricula-view.component.html',
  styleUrl: './matricula-view.component.css',
})
export class MatriculaViewComponent {
  colorClasses: string[] = [
    'bg-secondary text-black',
    'bg-primary text-black',
    'bg-danger text-black',
    "bg-success text-black"
  ];

  horario: Horario = {
    id_horario: 0,
    dia: '',
    horaInicio: '',
    horaSalida: '',
    modalidad: '',
    horasDiarias: 0,
    isActive: false
  }
  matricula: MatriculaId | null = null;

  listaVacia: string | undefined;

  @ViewChild('content') content!: ElementRef;
  info: InformeModel | null = null;

  constructor(
    private matriculaService: MatriculaService,
    private horarioService: HorarioService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id_matricula'];
    this.matriculaService.detail(id).subscribe(
      (data: MatriculaId) => {
        this.matricula = data;
      },
      (err) => {
        this.toastr.error(err.error.message, 'Fail', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
        this.volver();
      }
    );
  }

  volver(): void {
    this.router.navigate(['/dashboard/matricula']);
  }

  getTotalHoras(): number {
    if (
      !this.matricula ||
      !this.matricula.programacion ||
      !this.matricula.programacion.horario
    ) {
      return 0;
    }
    return this.matricula.programacion.horario.reduce(
      (total, horario) => total + horario.horasDiarias,
      0
    );
  }

  isLast(materia: any): boolean {
    if (!this.matricula || !this.matricula.materias) {
      return false;
    }
    return (
      this.matricula.materias.indexOf(materia) ===
      this.matricula.materias.length - 1
    );
  }

  getMaterias(): string {
    if (!this.matricula || !this.matricula.materias) {
      return '';
    }
    return this.matricula.materias.map((m) => m.nombre).join(', ');
  }

  getDia(dia: number): string {
    const dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
    return dias[dia - 1] || '';
  }

  getFecha(offset: number): Date | null {
    if (!this.matricula || !this.matricula.fechaInicio) {
      return null;
    }
    const fechaInicio = new Date(this.matricula.fechaInicio);
    return new Date(fechaInicio.getTime() + offset * 24 * 60 * 60 * 1000);
  }

  getIva(): number {
    if (!this.matricula) {
      return 0;
    }
    return this.matricula.conIva
      ? this.matricula.valorTotal - this.matricula.precio
      : 0;
  }

  getIvaTexto(): string {
    const iva = this.getIva();
    return iva === 0 ? 'Sin factura electrónica' : iva.toFixed(2);
  }

  public downloadPDF2(): void {
    const DATA = this.content.nativeElement;
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres descargar el informe en formato PDF?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, descargar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        html2canvas(DATA)
          .then((canvas) => {
            const fileWidth = 190;
            const fileHeight = (canvas.height * fileWidth) / canvas.width;

            const FILEURI = canvas.toDataURL('image/png');
            const PDF = new jsPDF('p', 'mm', 'a4');
            const position = 10;
            const leftMargin = 10;

            PDF.addImage(
              FILEURI,
              'PNG',
              leftMargin,
              position,
              fileWidth,
              fileHeight
            );

            // Optional: Add custom content to the PDF (e.g., footer or additional text)
            const pageHeight = PDF.internal.pageSize.height;
            const footerY = pageHeight - 30; // Adjust as needed

            // Add any custom footer or text if needed here

            PDF.save(
              `matricula_${this.matricula?.alumno.nombre_estudiante}.pdf`
            );
          })
          .catch((error) => {
            console.error('Error al generar el PDF:', error);
          });
      }
    });
  }
}
