import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EstudianteService } from '../../../../services/estudiante.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ViewEstudiante } from '../../../../models/estudiante';

@Component({
  selector: 'app-estudiante-view',
  templateUrl: './estudiante-view.component.html',
  styleUrls: ['./estudiante-view.component.css']
})
export class EstudianteViewComponent implements OnInit {
  @ViewChild('content', { static: false }) content!: ElementRef;

  estudiante: ViewEstudiante = new ViewEstudiante();

  constructor(
    private estudianteService: EstudianteService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id_estudiante'];
    this.estudianteService.getEstudianteDetail(id).subscribe(
      (data: ViewEstudiante) => {
        this.estudiante = data;
      },
      (err) => {
        this.toastr.error(err.error.message, 'Error', {
          timeOut: 3000,
          positionClass: 'toast-top-center'
        });
        this.volver();
      }
    );
  }

  volver(): void {
    this.router.navigate(['/dashboard/estudiante']);
  }

  downloadPDF() {
    const data = this.content.nativeElement;

    // Oculta botones y otros elementos que no deseas en el PDF
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => (button as HTMLElement).style.display = 'none');

    html2canvas(data, { scale: 2 }).then(canvas => {
      const imgWidth = 190; // Ajusta el ancho de la imagen
      const pageHeight = 290;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      let heightLeft = imgHeight;

      const pdf = new jsPDF('p', 'mm', 'a4');
      let position = 10; // Añade margen superior

      pdf.addImage(canvas, 'PNG', 10, position, imgWidth, imgHeight); // Añade margen izquierdo
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(canvas, 'PNG', 10, position, imgWidth, imgHeight); // Añade margen izquierdo
        heightLeft -= pageHeight;
      }

      pdf.save('detalle-estudiante.pdf');

      // Restaura la visibilidad de los botones
      buttons.forEach(button => (button as HTMLElement).style.display = '');
    });
  }
}
