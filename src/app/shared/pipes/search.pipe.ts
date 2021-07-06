import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  pure: false,
})
export class SearchPipe implements PipeTransform {
  transform(value: any, arg: any = ''): any {
    if (arg === '') {
      return value;
    }
    const cadena = arg;
    const resultPosts = [];
    if (value) {
      value.filter((x) => {
        for (const key in x) {
          if (typeof x[key] === 'string') {
            const word: string = x[key];
            if (word.toLowerCase().indexOf(cadena.toLowerCase()) > -1) {
              resultPosts.push(x);
              break;
            }
          }
          if (typeof x[key] === 'number') {
            const word: string = x[key].toString();
            if (word.toLowerCase().indexOf(cadena.toLowerCase()) > -1) {
              resultPosts.push(x);
              break;
            }
          }
        }
      });
      /* for (const post of value) {
        if (post != undefined) {
          if (!isNaN(cadena)) {
            const search = post.Identificacion.toString();
            if (post.Identificacion.toString().indexOf(cadena) > -1) {
              resultPosts.push(post);
            }
          } else {
            if (post.usuario.toLowerCase().indexOf(cadena.toLowerCase()) > -1) {
              resultPosts.push(post);
            }
          }
        }
      } */
    }
    return resultPosts;
  }
}
