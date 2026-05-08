@echo off
setlocal enabledelayedexpansion

for /f %%a in ('echo prompt $E ^| cmd') do set "ESC=%%a"

set "C_GREEN=%ESC%[92m"
set "C_RED=%ESC%[91m"
set "C_YELLOW=%ESC%[93m"
set "C_CYAN=%ESC%[96m"
set "C_WHITE=%ESC%[97m"
set "C_RESET=%ESC%[0m"

cd /d "C:\Users\Hogar\.gemini\antigravity\scratch\CV_Samir_Vasquez"

:menu
cls
echo %C_CYAN%==========================================================%C_RESET%
echo %C_WHITE%  ____    _    __  __ ___ ____    ____  _____ ______     __%C_RESET%
echo %C_WHITE% / ___^|  / \  ^|  \/  ^|_ _^|  _ \  / ___^|^| ____^|  _ \ \   / /%C_RESET%
echo %C_WHITE% \___ \ / _ \ ^| ^|\/^| ^|^| ^|^| ^|_) ^| \___ \^|  _^| ^| ^|_) \ \ / / %C_RESET%
echo %C_WHITE%  ___) / ___ \^| ^|  ^| ^|^| ^|^|  _ ^|  ___) ^| ^|___^|  _ ^< \ V /  %C_RESET%
echo %C_WHITE% ^|____/_/   \_\_^|  ^|_^|___^|_^| \_\ ^|____/^|_____^|_^| \_\ \_/   %C_RESET%
echo %C_CYAN%==========================================================%C_RESET%
echo.
echo   %C_CYAN%PROYECTO:%C_RESET%   %C_WHITE%CV Samir Vasquez%C_RESET%
echo   %C_CYAN%PUERTO:%C_RESET%      %C_WHITE%8000%C_RESET%

tasklist /fi "imagename eq python.exe" 2>nul | find /i "python.exe" >nul
if %errorlevel% equ 0 (
    echo.
    echo   %C_WHITE%[1] Iniciar servidor%C_RESET%     %C_GREEN%[ SERVIDOR ACTIVO ]%C_RESET%
    echo   %C_WHITE%[2] Detener servidor%C_RESET%
) else (
    echo.
    echo   %C_WHITE%[1] Iniciar servidor%C_RESET%
    echo   %C_WHITE%[2] Detener servidor%C_RESET%     %C_RED%[ SIN SERVICIO ]%C_RESET%
)
echo   %C_WHITE%[3] Git push%C_RESET%
echo   %C_WHITE%[4] Salir%C_RESET%
echo.
set /p op="   Selecciona una opcion: "

if "%op%"=="1" goto start
if "%op%"=="2" goto kill
if "%op%"=="3" goto gitpush
if "%op%"=="4" exit
goto menu

:start
cls
echo %C_CYAN%==========================================================%C_RESET%
echo %C_WHITE%  ____    _    __  __ ___ ____    ____  _____ ______     __%C_RESET%
echo %C_WHITE% / ___^|  / \  ^|  \/  ^|_ _^|  _ \  / ___^|^| ____^|  _ \ \   / /%C_RESET%
echo %C_WHITE% \___ \ / _ \ ^| ^|\/^| ^|^| ^|^| ^|_) ^| \___ \^|  _^| ^| ^|_) \ \ / / %C_RESET%
echo %C_WHITE%  ___) / ___ \^| ^|  ^| ^|^| ^|^|  _ ^|  ___) ^| ^|___^|  _ ^< \ V /  %C_RESET%
echo %C_WHITE% ^|____/_/   \_\_^|  ^|_^|___^|_^| \_\ ^|____/^|_____^|_^| \_\ \_/   %C_RESET%
echo %C_CYAN%==========================================================%C_RESET%
echo.
echo   %C_CYAN%PROYECTO:%C_RESET%   %C_WHITE%CV Samir Vasquez%C_RESET%
echo   %C_CYAN%PUERTO:%C_RESET%      %C_WHITE%8000%C_RESET%

python --version >nul 2>&1
if %errorlevel% neq 0 (
    py --version >nul 2>&1
)
if %errorlevel% neq 0 (
    echo.
    echo %C_RED%[ERROR] Python no esta instalado.%C_RESET%
echo.
pause
goto menu

:gitpush
cls
echo %C_CYAN%==========================================================%C_RESET%
echo %C_WHITE%   GitHub Push                                              %C_RESET%
echo %C_CYAN%==========================================================%C_RESET%
echo.
set /p msg="   Mensaje del commit: "
if "%msg%"=="" (
    echo %C_RED%[ERROR] Debes escribir un mensaje.%C_RESET%
    pause
    goto menu
)
echo.
echo %C_YELLOW%[1/3] git add .%C_RESET%
git add .
if %errorlevel% neq 0 (
    echo %C_RED%[ERROR] Fallo en git add%C_RESET%
    pause
    goto menu
)
echo %C_GREEN%[OK]%C_RESET%
echo.
echo %C_YELLOW%[2/3] git commit -m "%msg%"%C_RESET%
git commit -m "%msg%"
if %errorlevel% neq 0 (
    echo %C_RED%[ERROR] Fallo en git commit%C_RESET%
    pause
    goto menu
)
echo %C_GREEN%[OK]%C_RESET%
echo.
echo %C_YELLOW%[3/3] git push origin main%C_RESET%
git push origin main
if %errorlevel% neq 0 (
    echo %C_RED%[ERROR] Fallo en git push%C_RESET%
    pause
    goto menu
)
echo.
echo %C_GREEN%[EXITO] Subido correctamente a GitHub.%C_RESET%
echo.
pause
goto menu
)

start /B python -m http.server 8000 --bind 0.0.0.0 >nul 2>&1
if %errorlevel% neq 0 (
    start /B py -m http.server 8000 --bind 0.0.0.0 >nul 2>&1
)

echo.
echo %C_GREEN%[EXITO] Servidor activo%C_RESET%
echo.
echo   %C_WHITE%http://localhost:8000%C_RESET%
echo   %C_WHITE%http://192.168.1.105:8000%C_RESET%
echo.
echo   %C_YELLOW%Selecciona [2] en el menu para detener.%C_RESET%
echo.
pause
goto menu

:kill
cls
echo %C_CYAN%==========================================================%C_RESET%
echo %C_WHITE%  ____    _    __  __ ___ ____    ____  _____ ______     __%C_RESET%
echo %C_WHITE% / ___^|  / \  ^|  \/  ^|_ _^|  _ \  / ___^|^| ____^|  _ \ \   / /%C_RESET%
echo %C_WHITE% \___ \ / _ \ ^| ^|\/^| ^|^| ^|^| ^|_) ^| \___ \^|  _^| ^| ^|_) \ \ / / %C_RESET%
echo %C_WHITE%  ___) / ___ \^| ^|  ^| ^|^| ^|^|  _ ^|  ___) ^| ^|___^|  _ ^< \ V /  %C_RESET%
echo %C_WHITE% ^|____/_/   \_\_^|  ^|_^|___^|_^| \_\ ^|____/^|_____^|_^| \_\ \_/   %C_RESET%
echo %C_CYAN%==========================================================%C_RESET%
echo.
echo   %C_CYAN%PROYECTO:%C_RESET%   %C_WHITE%CV Samir Vasquez%C_RESET%
echo   %C_CYAN%PUERTO:%C_RESET%      %C_WHITE%8000%C_RESET%
echo.
taskkill /f /im python.exe >nul 2>&1
if %errorlevel% equ 0 (
    echo %C_GREEN%[OK] Servidor detenido.%C_RESET%
) else (
    echo %C_YELLOW%[!] No hay servidor activo.%C_RESET%
)
echo.
pause
goto menu
