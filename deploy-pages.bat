@echo off
chcp 65001 >nul
cd /d "%~dp0"

echo === Git status ===
git status -sb
echo.

echo === Staging changes ===
git add index.html css/resume.css js/resume.js js/resume.min.js post1.html post2.html post3.html
if errorlevel 1 goto fail

echo === Creating commit ===
git commit -m "Secure and refresh resume site for GitHub Pages."
if errorlevel 1 (
  echo No new commit created. Continuing to push if remote is behind...
)

echo === Pushing to origin ===
git push -u origin HEAD
if errorlevel 1 goto fail

echo.
echo Done. GitHub Pages usually updates in 1-3 minutes:
echo https://linyuche.github.io/
echo.
pause
exit /b 0

:fail
echo.
echo Deploy failed. Check the messages above.
pause
exit /b 1
