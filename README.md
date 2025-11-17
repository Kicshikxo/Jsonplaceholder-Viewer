<p align="center">
  <a href="https://github.com/Kicshikxo/Jsonplaceholder-Viewer">
    <img src="https://github.com/Kicshikxo/Jsonplaceholder-Viewer/blob/main/public/favicon.svg" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Jsonplaceholder Viewer</h3>

  <p align="center">
    Простой просмотр данных из jsonplaceholder на Vue 3
  </p>
</p>

### <p align="center">[![Stargazers](https://img.shields.io/github/stars/Kicshikxo/Jsonplaceholder-Viewer?style=social)](https://github.com/Kicshikxo/Jsonplaceholder-Viewer) ![License](https://img.shields.io/github/license/Kicshikxo/Jsonplaceholder-Viewer)</p>

## О проекте

Jsonplaceholder Viewer — это веб-приложение на Vue 3, которое позволяет:

- Просматривать список постов с JSONPlaceholder API.
- Сортировать посты по столбцам (`id`, `Заголовок`, `Автор`, `Контент`).
- Фильтровать посты по названию.
- Открывать карточку пользователя с полной информацией по клику на email.
- Динамически подгружать данные при прокрутке таблицы.
- Просматривать подсказки (tooltip) для длинного текста.
- Сохранять просмотренных пользователей в localStorage.
- Поддерживать светлую и тёмную темы интерфейса.

Приложение использует Pinia для управления состоянием и кеширования данных, Tailwind CSS для стилизации и компоненты из shadcn-vue для UI элементов.


## Попробовать прямо сейчас

Используйте Jsonplaceholder Viewer прямо в браузере:

- [jsonplaceholder.kicshikxo.ru](https://jsonplaceholder.kicshikxo.ru)

## Установка и запуск

### Клонирование репозитория

```bash
git clone https://github.com/Kicshikxo/Jsonplaceholder-Viewer.git
cd Jsonplaceholder-Viewer
```

### Установка зависимостей

```bash
npm install
```

### Запуск в режиме разработки

```bash
npm run dev
```

### Сборка релизной версии

```bash
npm run build
npm run preview
```

## Лицензия

Распространяется по лицензии WTFPL. Смотрите [LICENSE](https://github.com/Kicshikxo/Jsonplaceholder-Viewer/blob/main/LICENSE) для большей информации.
