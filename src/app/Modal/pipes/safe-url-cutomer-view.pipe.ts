import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'safeUrlCutomerView'
})
export class SafeUrlCutomerViewPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) { }
  transform(url: any):SafeHtml {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
