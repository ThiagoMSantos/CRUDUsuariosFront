import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable  } from 'rxjs';
import { Injectable} from "@angular/core";
import { environment } from "src/environments/environment";
import { map } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';

@Injectable({
    providedIn: 'root'
})

export class UsuariosService{

  constructor (
    public http: HttpClient
  )
  { }

  formData: Usuario = new Usuario();

  public _URL = environment.url;
  public _httpHeaders = {
    headers: new HttpHeaders({
      'Accept': '*/*',
      'Content-Type': 'application/json'
    })
  };
  public listaUsuarios: Usuario[];

  ConsultaTodosUsuarios(){

    let endpoint = 'buscar';

    this.http.get(this._URL + endpoint, this._httpHeaders).toPromise<any>().then(res => this.listaUsuarios = res.data as Usuario[] );

  }

  ConsultaUsuario(codigoEmail: string): Observable<any> {

    let endpoint = `remover/${codigoEmail}`;

    return this.http.get<Usuario>(this._URL + endpoint, this._httpHeaders).pipe(map(data => { return data }));

  }

  CadastrarUsuario(usuario): Observable<any> {

    let endpoint = 'inserir';

    return this.http.post(this._URL + endpoint, usuario, this._httpHeaders).pipe(map(data => { return data }));

  }

  AlterarUsuario(usuario): Observable<any> {

    let endpoint = 'alterar/' + usuario.email;

    return this.http.put(this._URL + endpoint, usuario, this._httpHeaders).pipe(map(data => { return data }));

  }

  ExcluirUsuario(codigoEmail: string): Observable<any> {

    let endpoint = `remover/${codigoEmail}`;

    return this.http.delete(this._URL + endpoint, this._httpHeaders).pipe(map(data => { return data }));

  }

}

