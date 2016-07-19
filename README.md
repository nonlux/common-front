## Get started

```
git clone git@gitlab.nonlux.ru:dev/tinForms.git
cd tinForms
npm install
gulp
```

## Requirements:
Требования к окружению:
 - node v6

Материалы:
 - [es6](http://es6-features.org/)
 - [react](https://facebook.github.io/react/)


## Tips:

1. Порт  для git  по ssh 222

Чтобы работал гит без указания порта:
```
git clone git@gitlab.nonlux.ru:dev/tinForms.git
```

Надо в файле *~/.ssh/config* прописать:
```
Host gitlab.nonlux.ru
  HostName gitlab.nonlux.ru
  Port 222
```
