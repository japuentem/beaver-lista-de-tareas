import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'tasks-list',
    pathMatch: 'full',
  },
  {
    path: 'tasks-list',
    loadChildren: () =>
      import('./tasks-list/tasks-list.module').then(
        (m) => m.TasksListPageModule
      ),
  },
  {
    path: 'new-task',
    loadChildren: () =>
      import('./pages/new-task/new-task.module').then(
        (m) => m.NewTaskPageModule
      ),
  },
  {
    path: 'color-picker',
    loadChildren: () => import('./color-picker/color-picker.module').then( m => m.ColorPickerPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
