import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { DashboardComponent } from './dashboard.component';
import { AulaComponent } from './aula/aula.component';
import { HorarioComponent } from './horario/horario.component';
import { MateriaComponent } from './materia/materia.component';
import { MatriculaComponent } from './matricula/matricula.component';
import { AulaEditComponent } from './aula/aula-edit/aula-edit.component';
import { AulaNewComponent } from './aula/aula-new/aula-new.component';
import { EstudianteComponent } from './estudiante/estudiante.component';
import { EstudianteEditComponent } from './estudiante/estudiante-edit/estudiante-edit.component';
import { EstudianteNewComponent } from './estudiante/estudiante-new/estudiante-new.component';
import { EstudianteViewComponent } from './estudiante/estudiante-view/estudiante-view.component';
import { HorarioEditComponent } from './horario/horario-edit/horario-edit.component';
import { HorarioNewComponent } from './horario/horario-new/horario-new.component';
import { MateriaNewComponent } from './materia/materia-new/materia-new.component';
import { MateriaEditComponent } from './materia/materia-edit/materia-edit.component';
import { MatriculaNewComponent } from './matricula/matricula-new/matricula-new.component';
import { MatriculaEditComponent } from './matricula/matricula-edit/matricula-edit.component';
import { MatriculaViewComponent } from './matricula/matricula-view/matricula-view.component';
import { InformeComponent } from './informe/informe.component';
import { InformeNewComponent } from './informe/informe-new/informe-new.component';
import { InformeEditComponent } from './informe/informe-edit/informe-edit.component';
import { InformeViewComponent } from './informe/informe-view/informe-view.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { UsuariosEditComponent } from './usuarios/usuarios-edit/usuarios-edit.component';


export const routesDashboard: Routes= [
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {path: '', component: MainComponent},
      {path: 'aula', component: AulaComponent},
      {path: 'aula_edit/:id_aula', component: AulaEditComponent},
      {path: 'aula_new', component: AulaNewComponent},
      {path: 'estudiante', component: EstudianteComponent},
      {path: 'estudiante_edit/:id_estudiante', component: EstudianteEditComponent},
      {path: 'estudiante_new', component: EstudianteNewComponent},
      {path: 'estudiante_view/:id_estudiante', component: EstudianteViewComponent},
      {path: 'horario', component: HorarioComponent},
      {path: 'horario_edit/:id_horario', component: HorarioEditComponent},
      {path: 'horario_new', component: HorarioNewComponent},
      {path: 'materia', component: MateriaComponent},
      {path: 'materia_new', component: MateriaNewComponent},
      {path: 'materia_edit/:id_materia', component: MateriaEditComponent},
      {path: 'matricula', component: MatriculaComponent},
      {path: 'matricula_new', component: MatriculaNewComponent},
      {path: 'matricula_edit/:id_matricula', component: MatriculaEditComponent},
      {path: 'matricula_view/:id_matricula', component: MatriculaViewComponent},
      {path: 'usuarios', component: UsuariosComponent},
      {path: 'usuarios_edit/:id_usuario', component: UsuariosEditComponent},

      {path: 'informe', component: InformeComponent},
      {path: 'informe_new', component: InformeNewComponent},
      {path: 'informe_edit/:id_informe', component: InformeEditComponent},
      {path: 'informe_view/:id_informe', component: InformeViewComponent},
    ]
  }
];
