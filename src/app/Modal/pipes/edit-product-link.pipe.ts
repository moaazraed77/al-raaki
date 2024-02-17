import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'editProductLink'
})
export class EditProductLinkPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    let link=value.split("")
    for( let i=0 ; i < link.length ; i++){
      if(link[i]=="&")
        link[i]="%26";
      if(link[i]=="%")
        link[i]="%25";
    }
    return link.join('');
  }

}
