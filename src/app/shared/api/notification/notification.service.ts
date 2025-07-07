import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private readonly toastService: ToastrService) { }

  success(title: string, message: string):void {
    this.sendSuccess(title, message);
  }

  private sendSuccess(title: string, message: string) {
    this.toastService.success(message, title);
  }
}
