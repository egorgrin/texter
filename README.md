Вашему вниманию представляется программа для работы с текстами наших лендов. С помощью нее вы сможете:

1. Переводить ленды в автоматическом режиме, без всяких гуглов-чатов и прочего.
2. Извлекать текстовые данные ленда в JSON формат.
3. Загружать в ленд текстовые данные из JSON с нужными текстами.
4. Комбинировать все это и делать грязь.

Вот ваш интерфейс:

![](imgForReadme/screenshot_1.png)

1. Папка src
2. Папка dist, в которую упадет итоговый html
3. Основная программа. В ней вы можете комментировать селекторы, если хотите поменять не весть текст а только часть, например:
![](imgForReadme/screenshot_2.png)
4. JSON с контентом, которым вы работаете в данный момент.
5. Папка с другими языковыми JSON'ами.
6. Ваши рабочие команды.

Как работать:

Помещаете в src (n.1) ваш html контент и в зависимости от того, что вам нужно вы можете сделать:

eject - извлечет ваш контент из index.html в папке src (n.1) в файл ejected.json из папки lang (n.5)

replace - подставит в ваш index.html в папке src необходимый языковой контент с заменой, и закинет результат в папку dist (вместе с папкой assets, если вы ее положите в src). Для этого вам нужно будет изменить значение переменной targetLanguage = 'КОД_ЯЗЫКА', по которой программа ориентируется какой json брать из lang. Например, вы можете поставить targetLanguage = 'ejected' и программа подставит контент который вы перед этим извлекли с другого ленда.

translate - переведет ваш ленд с помощью deepl и так же закинет результат в dist. Для этого вам нужно будет изменить значение переменной translateFrom = 'КОД_ЯЗЫКА' (с чего переводить) и targetLanguage = 'КОД_ЯЗЫКА' (на что переводить).

Языковые json'ы со временем дорабатывались, и из-за их немалого количества мне было лень постоянно приводить все к эталонному образцу. Так что если вы будете работать с, скажем, es.json его структура возможно будет отличаться, и программа не выполнится. Просто приведите его к образцу en.json - она практически всегда была эталонной. Программу обкатывал больше месяца, так что никаких явных ошибок в ней нет, но могут быть недочеты. Просто будьте внимательны, читайте ошибки и следите за вашими селекторами и структурой json файла с которым работаете. Если что - пишите мне.

Все селекторы в программе соответствуют названиям массивов в json файлах. В этом вся суть. Пользуйтесь.


