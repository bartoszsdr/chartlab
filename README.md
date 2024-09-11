# ChartLab

Aplikacja internetowa automatyzująca dobór i prezentację graficzną wprowadzonych danych.

## Instalacja

1. Zainstaluj [Node.js](https://nodejs.org/en/) oraz [MySQL Server](https://dev.mysql.com/downloads/installer/).
2. Zainstaluj rekomendowane narzędzia, jak [VSCode](https://code.visualstudio.com/download) oraz [Git](https://git-scm.com/downloads) (opcjonalnie).
3. Skopiuj repozytorium używając `git clone`.
4. Utwórz bazę danych w MySQL Workbench korzystając ze schematu z `/server/schema.sql`.
5. Utwórz plik `.env` w folderze `/server` zawierający konfigurację połączenia z bazą danych:
#### .env
```
MYSQL_HOST='127.0.0.1'
MYSQL_USER='root'
MYSQL_PASSWORD=''
MYSQL_DATABASE='chartlab_app'
```
6. Zainstaluj wymagane dependencje i uruchom serwer oraz klienta:
#### Client - Terminal A
```
cd client
npm install
npm start
```

#### Server - Terminal B
```
cd server
npm install
npm start
```

## Korzystanie z aplikacji
1. Wprowadź dane w formularzu i wygeneruj* wykres.
2. Wygenerowany wykres możesz zapisać w bazie danych korzystając z przycisku w sekcji podglądu.
3. W zakładce 'Moje wykresy' znajduje się lista zapisanych wykresów. Każdy z nich można wyświetlić, bądź usunąć.

*Jeżeli w formularzu zostanie wybrany automatyczny tryb doboru typu wykresu, aplikacja na podstawie danych wybierze najbardziej optymalny dla wprowadzonych danych.


