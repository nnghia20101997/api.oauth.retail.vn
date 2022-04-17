import { HttpStatus } from '@nestjs/common';

export class BaseResponseData {
  private status: HttpStatus;
  private message: string;
  private data: Object;

  constructor(status: number = null, message: string = null, data?: Object) {
    this.status = status ? +status : +HttpStatus.OK;
    this.message = message ? message : 'SUCCESS';
    this.data = data ? data : null;
  }

  public getStatus(): HttpStatus {
    return this.status;
  }

  public setStatus(status: number): void {
    this.status = status;
  }

  public getMessage(): string {
    return this.message;
  }

  public setMessage(status: number, message: string): void {
    if (message) {
      this.message = message;
    } else {
      switch (status) {
        case HttpStatus.OK:
          this.message = 'SUCCESS';
          break;
        case HttpStatus.BAD_REQUEST:
          this.message = 'Data Invalid !!!';
          break;
        default:
          this.message = 'SUCCESS';
          break;
      }
    }
  }

  public getData(): Object {
    return this.data;
  }

  public setData(data: Object): void {
    this.data = data;
  }
}
