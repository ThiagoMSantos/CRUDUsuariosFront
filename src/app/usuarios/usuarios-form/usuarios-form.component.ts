import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/models/usuario.model';
import { UsuariosService } from 'src/services/usuarios.service';

@Component({
  selector: 'app-usuarios-form',
  templateUrl: './usuarios-form.component.html',
  styles: [
  ]
})
export class UsuariosFormComponent implements OnInit{
  hoje:Date;

  constructor(public _usuarioService:UsuariosService,
    private toastr:ToastrService,
    ) { this.hoje = new Date();}

  ngOnInit(){
    this._usuarioService.ConsultaTodosUsuarios();
  }

  onSubmit(form : NgForm){
    if(this._usuarioService.formData.id == null)
    {
      this.insertUsuario(form);
    }
    else
    {
      this.updateUsuario(form);
    }
  }

  insertUsuario(form : NgForm){
    this._usuarioService.CadastrarUsuario(form.value).subscribe(res =>{
      this.resetForm(form);
      if(res.success)
      {
        this.toastr.success(res.data.mensagem, "Sucesso");
        this._usuarioService.ConsultaTodosUsuarios();
      }
      else
      {
        this.toastr.error(res.errors, "Ops!");
      }
    }, err =>{
      console.log(err.error.errors[0]);
      this.toastr.error(err.error.errors[0], "Falha ao cadastrar usuário.");
    })
  }

  updateUsuario(form : NgForm){
    this._usuarioService.AlterarUsuario(form.value).subscribe(res =>{
      this.resetForm(form);
      if(res.success)
      {
        this.toastr.info(res.data.mensagem, "Feito!");
        this._usuarioService.ConsultaTodosUsuarios();
      }
      else
      {
        this.toastr.error( res.errors, "Ops!");
      }
    }, err =>{
      this.toastr.error(err.error.errors[0], "Falha ao alterar usuário.");
      console.log(err);
    })
  }

  resetForm(form : NgForm){
    form.form.reset();
    this._usuarioService.formData = new Usuario();
  }

}
