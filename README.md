# Builder Light

## Технические характеристики:

- nodejs 8.9.1
- pug, stylus
- gulp 3.9.1

Глобальные зависимости:
```
$ npm i -g gulp
$ npm i -g bower
```


## Перед началом проекта
```
$ npm install
$ bower install
```

## Запуск
```
$ npm start // or gulp [params]

```

## Структура рабочей дирректории

```
├─── dist/
├──────_ index/                                # папка с файлами для разводящей страницы со списком страниц
├────── data/                                  # папка с json файлами для шаблонов
└────── fonts/                                 # папка со шрифтами проекта и их стилями
       ├─── rouble/
       └─── ...
└─── images/                                   # папка с картинками проекта
     ├─── examples/
     ├─── icons/ 
     ├─── logo.png
     └─── ...
└─── scripts/                                  # папка со скриптами
     ├─── libs/                                # папка для установки сторонних библиотек через bower
     ├─── main.js
     └─── ...    
└─── sprites                                   # папка для исходных картинок для спрайтов
     ├─── png/
     └─── svg/
└─── styles/                                   # папка со стилями проекта
     └─── helpers/                             # папка с дефолтными стилями проекта
          ├─── 00_normalize.styl               # сброс стилей
          ├─── 01_variables.styl               # переменные
          ├─── 02_mixins.styl                  # миксины проекта
          ├─── 03_fonts.styl                   # настройка шрифтов
          ├─── 04_text.styl                    # тестовые стили
          ├─── 05_form.styl                    # стили для элементов формы
          ├─── 06_base-project.styl            # базовые стили проекта
          ├─── sprite.template.mustache        # шаблон для генерации спрайтов из png
          └─── ...
     ├─── additional.styl                      # пустой файл, стили для вставки програмистами
     ├─── template_styles.styl                 # сборка всех стилей проекта
     └─── vendor.styl                          # сборка базовых стилей проекта
└─── views/
     └─── __config/                            # папка с настройками проекта
         ├─── mixins.pug                       # миксины проекта
         └─── variables.pug                    # переменные
     └─── modules                              # папка с модулями проекта, подключается через include
          └─── name_module
               ├─── name_module.pug 
               ├─── name_module.styl
               └─── name_module.js          
          └─── ...            
     ├─── main.pug 
     └─── ...
     
```
## Особенности сборщика
### Работа с json файлами в шаблонах pug

В папку `data` в рабочей дирректории помещает json файлы для работы в шабонах.
Вызов данных в шаблоне идет с помощью функции `getData(nameJsonFile)`
Пример:

`menu.json`

```json
[
  {
    "name": "О нас",
    "link" : "#"
  },
  {
    "name": "Новости",
    "link" : "#"
  },
  {
    "name": "Акции",
    "link" : "#"
  },
  {
    "name": "Услуги",
    "link" : "#"
  },
  {
    "name": "Контакты",
    "link" : "#"
  }
]
```

`menu.pug`

```jade
nav.menu
   each item in getData('menu')
       a(href=item.link).menu__item!=item.name
```

### Установка сторонних библиотек
Сторонние библиотеки ставятся через `bower` в папку `scripts/libs` рабочей дирректории
```
$ bower install jquery --save
```
или через `bower.json`

Если внутри исходного пакета в `bower.json` написаны неверные пути в настройках `main` или нужно вытягивать из пакета только необходимые файлы, можно прописать в файле проекта `bower.json` в пункте `overrides`:

```json
...
"overrides": {
    "jquery-ui": {
      "main": [
        "jquery-ui.js",
        "themes/base/jquery-ui.css",
        "themes/base/images/**/*"
      ]
    },
    "html5shiv": {
      "main": [
        "dist/html5shiv.min.js"
      ]
    },
    ...
  }
...
``` 
### Работа с png спрайтами
Необходимые иконки должны быть сохранены в папку `sprite/png` рабочей дирректории. Иконки автоматом компилируеются в один файл `sprite.png` в рабочую дирректорию папки `images`.

Параметры иконки (размеры, координаты и т.п.) формируются в файл `styles/helpers/07_sprite.styl` рабочей дирректории. 

В стилях вызвать иконку с параметрами можно через миксин `sprite($s-nameIcon)`. Пример: 

`07_sprite.styl`

```stylus
$s-phone = 0px 0px 0px 0px 24px 24px 24px 24px 'sprite.png';
```

`phone.styl`

```stylus
.phone
    font-weight bold
    &:before
        content ''
        display inline-block
        vertical-align middle
        sprite($s-phone)
        margin-right 5px
```
Полученный `css`: 

```css
.phone {
  font-weight: bold;
}

.phone:before {
  content: '';
  display: inline-block;
  vertical-align: middle;
  background-image: url("./images/sprite.png");
  background-position: 0px 0px;
  width: 24px;
  height: 24px;
  margin-right: 5px;
}
```
### Работа с адаптивом
Работа с адаптивом осуществляется с помощью библиотеки [rupture](https://jescalan.github.io/rupture/).
По-умолчанию настройки в проекте:
```stylus 
rupture.enable-em-breakpoints = true
base-font-size = 14px
```
Пример: 
```stylus
.header
    &__button
        font-size 24px 
        +below(750px)
            font-size 16px

```

Полученный `css` :
```css
.header__button {
    font-size: 24px;
}
@media only screen and (max-width: 71.875em) {
    .header__button {
        font-size: 16px;
    }
}
```

### Документация javascript
Если в `js` файлах есть документация, написанная по стандартам `jsDoc` , то ее можно скомпилировать с помощью команды:
``` 
$ npm run docs
```
Документация будет помещена в скомпилирвоанную дирректорию проекта `dist`.










