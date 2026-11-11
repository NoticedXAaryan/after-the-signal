@echo off
setlocal
cd /d "%~dp0"
title After the Signal
if exist "%~dp0runtime\node.exe" (
  "%~dp0runtime\node.exe" "%~dp0scripts\launch-game.mjs"
) else (
  node.exe "%~dp0scripts\launch-game.mjs"
)
if errorlevel 1 pause
