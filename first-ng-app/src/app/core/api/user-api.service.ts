import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from "../../shared/model/user";
import {General} from "../../shared/model/general";

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  constructor(private readonly httpClient: HttpClient) {
  }

  // @ts-ignore
  requestGlobal(params:General): Observable<any>{
    if(params.type== 'get'){
      return this.httpClient.get<any>(params.uri);
    }else if(params.type == 'post'){
      return this.httpClient.post<any>(params.uri, params.data);
    }
  }
  /**
   * Communicate with backend to create new user record
   * @param id id of user
   */
  getUserById(id: number): Observable<User> {
    return this.httpClient.get<User>(`/users/${id}`);
  }

  /**
   * Communicate with backend to create new user record
   * @param user user for creating
   */
  create(user: User): Observable<any> {
    return this.httpClient.post<User>('/users', user);
  }

  update(id: number,user: User): Observable<any> {
    return this.httpClient.post<User>(`/users/edit/${id}`, user);
  }
  /**
   * Login backend with given user form value
   * @param loginFormValue value of login form
   */
  login(loginFormValue: any): Observable<any> {
    return this.httpClient.post<any>(`/login?username=${loginFormValue.username}&password=${loginFormValue.password}`, {});
  }

  count(): Observable<any> {
    return this.httpClient.get('/users/count');
  }

  getAll(): Observable<User[]> {
    return this.httpClient.get<User[]>('/users');
  }

  /**
   * Delete user by id
   * @param id
   */
  delete(id: number): Observable<null> {
    return this.httpClient.delete<null>(`/users/${id}`);
  }

  logout() {
    return this.httpClient.get<any>(`/logout`);
  }
}
