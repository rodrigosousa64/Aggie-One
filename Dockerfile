# -----------------------------------
# Stage 1: Build the React Frontend
# -----------------------------------
FROM node:20-slim AS frontend-builder

WORKDIR /app/frontend

# Copy frontend package files
COPY frontend/package*.json ./

# Install frontend dependencies
RUN npm ci

# Copy the rest of the frontend source code
COPY frontend/ ./

# Build the frontend (Vite)
RUN npm run build


# -----------------------------------
# Stage 2: Build the Django Backend
# -----------------------------------
FROM python:3.11-slim

WORKDIR /app

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV PORT=8000

# Install system dependencies
# (SQLite is included in python:3.11-slim, but we can add any necessary build tools)
RUN apt-get update && apt-get install -y gcc && rm -rf /var/lib/apt/lists/*

# Copy backend requirements
COPY backend/requirements.txt ./

# Install backend dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend source code
COPY backend/ ./backend/

# Copy the built frontend from Stage 1 into the expected directory
COPY --from=frontend-builder /app/frontend/dist /app/frontend/dist

# Set working directory to backend
WORKDIR /app/backend

# Collect static files for production
RUN python manage.py collectstatic --noinput

# Expose the port
EXPOSE $PORT

# Command to run the application
CMD ["sh", "-c", "python manage.py migrate && gunicorn config.wsgi --bind 0.0.0.0:$PORT"]
