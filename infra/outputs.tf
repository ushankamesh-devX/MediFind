# Application Access
# Using hardcoded Elastic IP since EIP resource is commented out
output "application_url" {
  description = "URL to access the application"
  value       = "http://54.224.51.39"
}

output "ssh_command" {
  description = "Command to SSH into the instance"
  value       = "ssh -i ${aws_key_pair.deployer.key_name}.pem ubuntu@54.224.51.39"
}

output "ec2_public_ip" {
  description = "Public IP of the App Server (Elastic IP)"
  value       = "54.224.51.39"
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
