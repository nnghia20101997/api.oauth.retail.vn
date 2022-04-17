import { HttpStatus } from '@nestjs/common';

export class ExceptionResponseDetail {
  private status: HttpStatus;
  private message: string;
  private data: object;

  constructor(
    status: HttpStatus = null,
    message: string = null,
    data?: object,
  ) {
    this.status = status ? status : HttpStatus.BAD_REQUEST;
    this.message = message
      ? this.getMessage(status, message)
      : 'Dữ liệu không hợp lệ!';
    this.data = data ? data : null;
  }

  public getStatus(): HttpStatus {
    return this.status;
  }

  public setStatus(status: HttpStatus): void {
    this.status = status;
  }

  public getMessage(status: HttpStatus, message: string): string {
    if (message) {
      this.message = message;
    } else {
      switch (status) {
        case HttpStatus.BAD_REQUEST:
          this.message = 'Dữ liệu không hợp lệ!';
          break;

        case HttpStatus.UNAUTHORIZED:
          this.message = 'Không có quyền truy cập';
          break;

        case HttpStatus.INTERNAL_SERVER_ERROR:
          this.message = 'Lỗi Server!';
          break;

        default:
          this.message = 'Dữ liệu không hợp lệ!';
          break;
      }
    }

    return this.message;
  }

  public setMessage(message: string): void {
    this.message = message;
  }

  public getData(): object {
    return this.data;
  }

  public setData(data: object): void {
    this.data = data;
  }
}
