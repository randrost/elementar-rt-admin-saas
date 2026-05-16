import {inject, Injectable, signal, WritableSignal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import {IUser} from '@interface/IUser';
import {IPage} from '@interface/IPage';
import {AuthService} from '@service/auth.service';
import {toObservable} from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _http: HttpClient = inject(HttpClient);
  private _authService: AuthService = inject(AuthService);

  currentUser: WritableSignal<IUser | null> = signal(null);

  constructor() {
    toObservable(this._authService.isAuthenticated).subscribe((auth: boolean): void => {
      if (auth) {
        this.getMe().subscribe((user: IUser): void => {
          this.currentUser.set(user);
        });
      } else {
        this.currentUser.set(null);
      }
    });
  }

  getUserById(userId: string): Observable<IUser> {
    return this._http.get<IUser>(`/user/${userId}`);
  }

  getMe(): Observable<IUser> {
    return this._http.get<IUser>('/user/me');
  }

  deleteUserById(userId: string): Observable<void> {
    return this._http.delete<void>(`/user/${userId}`);
  }

  countUsers(): Observable<number> {
    return this._http.get<number>('/user/count');
  }

  createUser(user: {
    username: string;
    email: string;
    roles: string[];
    password: string;
  }): Observable<IUser> {
    return this._http.post<IUser>(`/user`, user);
  }

  updateUser(user: {
    id: string;
    username: string;
    email: string;
    roles: string[];
    avatarUrl?: string;
    createdBy?: string;
    createdDate?: Date;
    lastModifiedBy?: string;
    lastModifiedDate?: Date
  }): Observable<IUser> {
    return this._http.put<IUser>(`/user/${user.id}`, {
      username: user.username,
      email: user.email,
      roles: user.roles,
    });
  }

  getAllUsers(options: {
    pageable: { page: number; size: number; sort?: string[] };
    name?: string;
  }): Observable<IPage<IUser>> {
    const params: any = {
      page: options.pageable.page || 0,
      size: options.pageable.size || 10,
      sort: options.pageable.sort ? options.pageable.sort.join(',') : '',
      name: options.name,
    };

    return this._http.get<IPage<IUser>>('/user/all', {params});
  }
}
