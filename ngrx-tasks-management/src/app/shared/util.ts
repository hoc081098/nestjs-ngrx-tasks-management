import { HttpErrorResponse } from '@angular/common/http';

function joinMessage(errors: { constraints: { [key: string]: string } }[]): string {
  return errors
    .map(error => Object.values(error.constraints))
    .reduce((acc, e) => [...acc, ...e], [])
    .join('\n');
}

export function getErrorMessage(error: any): string {
  console.log('[Utils] getErrorMessage error=', error);

  if (error instanceof HttpErrorResponse) {
    const message = error.error.message;
    if (typeof message === 'string') {
      return message;
    }
    return joinMessage(message) || 'An error occurred';
  }
  return 'An error occurred';
}
