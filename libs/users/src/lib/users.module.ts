import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

import { usersRoutes } from './lib.routes';
import { LoginComponent } from './pages/login/login.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(usersRoutes),
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule
  ],
  declarations: [LoginComponent],
  providers: [MessageService]
})
export class UsersModule {}
