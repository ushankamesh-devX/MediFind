#!/bin/bash

# Script to get public IPs of ECS tasks

echo "========================================="
echo "MediFind ECS Task Public IPs"
echo "========================================="
echo ""

REGION="us-east-1"
CLUSTER="medifind-dev-cluster"

# Get frontend task
echo "Frontend Service:"
FRONTEND_TASKS=$(aws ecs list-tasks --cluster $CLUSTER --service-name medifind-dev-frontend-service --region $REGION --query 'taskArns[0]' --output text)

if [ "$FRONTEND_TASKS" != "None" ] && [ -n "$FRONTEND_TASKS" ]; then
    FRONTEND_IP=$(aws ecs describe-tasks --cluster $CLUSTER --tasks $FRONTEND_TASKS --region $REGION --query 'tasks[0].attachments[0].details[?name==`networkInterfaceId`].value' --output text | xargs -I {} aws ec2 describe-network-interfaces --network-interface-ids {} --region $REGION --query 'NetworkInterfaces[0].Association.PublicIp' --output text)
    echo "  Public IP: $FRONTEND_IP"
    echo "  URL: http://$FRONTEND_IP"
else
    echo "  No tasks running"
fi

echo ""

# Get backend task
echo "Backend Service:"
BACKEND_TASKS=$(aws ecs list-tasks --cluster $CLUSTER --service-name medifind-dev-backend-service --region $REGION --query 'taskArns[0]' --output text)

if [ "$BACKEND_TASKS" != "None" ] && [ -n "$BACKEND_TASKS" ]; then
    BACKEND_IP=$(aws ecs describe-tasks --cluster $CLUSTER --tasks $BACKEND_TASKS --region $REGION --query 'tasks[0].attachments[0].details[?name==`networkInterfaceId`].value' --output text | xargs -I {} aws ec2 describe-network-interfaces --network-interface-ids {} --region $REGION --query 'NetworkInterfaces[0].Association.PublicIp' --output text)
    echo "  Public IP: $BACKEND_IP"
    echo "  API URL: http://$BACKEND_IP:5000"
    echo "  Health: http://$BACKEND_IP:5000/health"
else
    echo "  No tasks running"
fi

echo ""
echo "========================================="
