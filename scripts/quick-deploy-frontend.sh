#!/bin/bash
# Quick deployment script for frontend API fix
# Run this to update the frontend with the new API configuration

echo "Connecting to server and updating frontend..."

ssh ubuntu@54.224.51.39 << 'ENDSSH'
cd medifind

echo "Pulling latest frontend image..."
docker-compose pull frontend

echo "Restarting frontend container..."
docker-compose up -d frontend

echo "Checking container status..."
docker ps | grep medifind-frontend

echo "Frontend updated successfully!"
echo "Access the application at: http://54.224.51.39"
ENDSSH
