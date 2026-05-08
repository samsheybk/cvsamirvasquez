@echo off
title Servidor CV - Samir Vasquez
echo ========================================
echo  Servidor CV - Samir Vasquez
echo ========================================
echo.
REM Obtener IP local
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /C:"IPv4"') do set IP=%%a
set IP=%IP: =%
echo  Accede desde tu telefono en:
echo.
echo   ^>^>^>  http://%IP%:8000  ^<^<^<
echo.
echo  O desde este PC en:
echo   ^>^>^>  http://localhost:8000
echo.
echo ========================================
echo  Presiona Ctrl+C para detener el servidor
echo ========================================
echo.
python -m http.server 8000
pause
