#!/bin/bash
# Script de build para Railway

# Exit on error
set -e

echo "Iniciando build do Frontend (Vite)..."
cd frontend
npm install
npm run build
cd ..

echo "Iniciando build do Backend (Django)..."
cd backend
pip install -r requirements.txt
python manage.py collectstatic --noinput
python manage.py migrate
