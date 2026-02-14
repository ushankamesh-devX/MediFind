#!/bin/bash
# Quick EC2 Access and Docker Status Check
# This script uses AWS SSM to access the instance without SSH keys

INSTANCE_ID="i-086970a46666c4075"
REGION="us-east-1"

echo "Connecting to EC2 instance via AWS Systems Manager..."
echo "Once connected, run these commands:"
echo ""
echo "cd /home/ubuntu/medifind"
echo "sudo docker-compose ps"
echo "sudo docker-compose logs"
echo ""
echo "Starting session..."

aws ssm start-session --target $INSTANCE_ID --region $REGION
