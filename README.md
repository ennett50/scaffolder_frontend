# scaffolder_frontend


# [FCOP] Fronend COllector Projects ^_^

## Запуск
### Для работы необходимо установить:
* <a href="https://nodejs.org/en/" target="_blank">Node.js</a>

### Первоначальная инициализация
```
$ npm i -g gulp
```


### Перед началом проекта
```
$ npm i
```

### Запуск
```
$ gulp [параметры запуска]
```

##### Доступные параметры
* "--debug-this" - вывод дополнительной информации в консоль
* "--auto-snapshot [количество секунд]" - автоматическое создание дампа ресурсов nodejs, параметр секунд не обязателен (по умолчанию 20)







## Структура



### \_\_\_gulp

```
├─── common      # файлы с функциями подключающие автоматически
├─── debug       # файлы отладки
└─── tasks       # gulp task's
```

базовая структура common файла:

```javasript
module.exports = function($, _){
    return function () {
        ...
    }
}
```

базовая структура tasks файла:

```javasript
module.exports = function(gulp, $, _){
    return function () { // функция которая вызывается из gulp task'а
        ...
    }
}
```
` gulp ` - gulp объект, ` $ ` - common функции, ` _ ` - параметры сборщика



***



### __dev

*примечание:*
если содержимое папки копируется в web директорию, то будет содержать: `=> имя папки \` - относительно папки web, `=> \ имя папки \` - относительно корня проекта. `{ }` - список игнорируемых файлов

```
├─── ___temp                                        # содержит временные файлы сборщика
├─── _index {index.jade} => _index\                 # содержит необходимые файлы для index.html
└─── images => template\images\                     # папка с картинками, содержит только: логотип проекта, preloader'ы
     ├─── elements                                  # картинки элементов страницы (фон, уголки, маски, и т.п.)
     ├─── example                                   # временные картинки, которые используются *только в вёрстке*
     ├─── icons                                     # только иконки
     └─── ...                                       # остальные на усмотрение разработчика
├─── libs => template\libs\                         # библиотеки
└─── scripts
     ├─── vendors => template\scripts\vendors.js    # js скрипты объединяются и сжимаются, лучше использовать libs
     └─── coffee => template\scripts\               # список файлов передается в jade, для автоматического подключения.
                                                        # Подключаются в алфавитном порядке (по названию coffee файлов):
                                                        # сначала идут все из **`base`**, затем из **`project`**.
                                                        # Из названий уберается порядковый номер формата: `число_`
└─── styles
     ├─── base => template\styles\
     ├─── vendors => template\styles\vendors.css
     └─── stylus
          ├─── global                               # подключается перед stylus\base\ и перед stylus\project\
          ├─── base => \__dev\styles\vendors\00_base.css
          └─── project => template\styles\production.css
└─── jade                                           # страницы
     ├─── layouts                                   # шаблон, header and footer
     ├─── modules                                   # модули
     └─── variables                                 # json файлы, которые подключаются на jade страницах, имена переменных == именам файлов
```








## Jade
