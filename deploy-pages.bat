@echo off
chcp 65001 >nul
cd /d "%~dp0"

echo === Staging changes ===
git add index.html css/resume.css js/resume.js js/resume.min.js
if errorlevel 1 goto fail

echo === Creating commit ===
git commit -m "Restyle site as a practical IT professional resume."
if errorlevel 1 (
  echo No new commit created. Continuing to push...
)

echo === Pushing to origin ===
git push -u origin HEAD
if errorlevel 1 goto fail

echo.
echo Done. Wait for GitHub Pages, then hard refresh:
echo https://linyunjie.github.io/Linyuche.github.io/
echo.
pause
exit /b 0

:fail
echo.
echo Deploy failed. Check the messages above.
pause
exit /b 1
