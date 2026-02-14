# Application Access
output "application_url" {
  description = "URL to access the application"
  value       = "http://${aws_eip.app_server.public_ip}"
}

output "ssh_command" {
  description = "Command to SSH into the instance"
  value       = "ssh -i ${aws_key_pair.deployer.key_name}.pem ubuntu@${aws_eip.app_server.public_ip}"
}

output "ec2_public_ip" {
  description = "Public IP of the App Server (Elastic IP)"
  value       = aws_eip.app_server.public_ip
}

# Database
output "rds_endpoint" {
  description = "RDS MySQL endpoint"
  value       = aws_db_instance.mysql.endpoint
}

output "rds_database_name" {
  description = "RDS database name"
  value       = aws_db_instance.mysql.db_name
}
