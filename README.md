# Домашнее задание: Автотесты

## Как запустить

```sh
# установите зависимости
npm ci

# соберите клиентский код приложения
npm run build

# запустите сервер
npm start
```

После этого можете открыть приложение в браузере по адресу http://localhost:3000/hw/store


## Как проверять Jest (юнит тесты)
```sh
# запустите проект
npm start

# В другом терменале запустите jest
#для windows (задать необходимый BUG_ID от 0 до 10)
$env:BUG_ID = '1'; npm run test

#для linux иди macos (задать необходимый BUG_ID от 0 до 10)
BUG_ID=1 npm run test
```


## Как проверять Playwright (интеграционные тесты)
```sh
# В package.json для команды start задать необходимый BUG_ID от 0 до 10 (где 0 - это запуск без багов)
# "start": "cross-env BUG_ID=0 nodemon ./src/server/index.ts"

# запустите проект
npm start

# В другом терменале запустите тестирование в графическом режиме
npx playwright test --ui
```
### запустите тестирование в графическом режиме
npx playwright test --ui
Обратите внимание: если для вашей системы не будет эталонных скриншотов статических страниц, то тесты static.spec.ts в первый раз упадут. Запустите их повторно (при первом прогоне будут созданы новые скриншоты, которые будут использованы уже во втором прогоне и далее)

Для начала запустите проект без BUG_ID для проверки прохождения всех тестов на окружении без багов

Для проверки корректной работы тестов перезапускайте проект с различным BUG_ID или без него, а после запускайте прогон всех тестов в графическом интерфейсе
