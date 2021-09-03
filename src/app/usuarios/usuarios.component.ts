import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/models/usuario.model';
import { UsuariosService } from 'src/services/usuarios.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit {
  displayedColumns: string[] = ['nome', 'dataNascimento', 'escolaridade', 'email', 'acao'];
  constructor(public _usuarioService: UsuariosService,
    private toastr : ToastrService) { }

  ngOnInit(): void {
  }

  populaFormulario(usuarioSelecionado : Usuario){
    this._usuarioService.formData = Object.assign({}, usuarioSelecionado);
  }

  deletarUsuario(codigoEmail : string){
    if(confirm('Deseja deletar esse usuário?'))
    {
      this._usuarioService.ExcluirUsuario(codigoEmail).subscribe(res => {
        if(res.success)
        {
          this.toastr.error(res.data.mensagem, "Sucesso");
          this._usuarioService.ConsultaTodosUsuarios();
        }
        else
        {
          this.toastr.error(res.errors, "Ops!");
        }
      }, err => {
        console.log(err);
        this.toastr.error(err.error.errors[0], "Falha ao cadastrar usuário.");
      });
    }
  }

}
