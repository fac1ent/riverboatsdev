## Запуск приложения в локальной среде
```
    yarn
    yarn start
```
## Деплой приложения на Firebase Hosting
Адрес демо [https://river-boats-dev.web.app/](https://river-boats-dev.web.app/)

Перед деплоем  нужно сбилдить приложение в консоли
```
    yarn build
```

После билда нужно проверить работоспособность приложение командой
```
    serve -s build
```
Если программа `serve` не установлена
```
    yarn global add serve
```

После билда нужно залить приложение на хостинг командой
```
    firebase deploy
```
