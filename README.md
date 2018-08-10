# Ngx Weditor

> A Simple WYSIWYG Editor for Angular6+ Applications.

[![NPM Version][npm-image]][npm-url]


## Install

```bash
npm i -S ngx-weditor
```

## Usage

```javascript
import { NgxWeditorModule } from 'ngx-weditor';

@NgModule({
  imports: [
    NgxWeditorModule
  ]
});
```

## Inside HTML Form

```html
<form  novalidate (ngSubmit)="submit()" [formGroup]="form">
	<app-ngx-weditor formControlName="content"></app-ngx-weditor>
</form>
```
## Demo
Go ahead and test before installing

[Demo Link](https://hrestrepop.github.io/ngx-weditor/)

## License

[MIT](http://vjpr.mit-license.org)

[npm-image]: https://img.shields.io/npm/v/ngx-weditor.svg
[npm-url]: https://www.npmjs.com/package/ngx-weditor
