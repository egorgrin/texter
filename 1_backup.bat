@echo off
set /p foldername=lander name:

if not exist "backup" mkdir "backup"
cd backup
mkdir "%foldername%"
xcopy /s /e /y "..\src\*" "%foldername%"
cd "../src"
del /q /s *.*
for /d %%i in (*) do rd /q /s "%%i"