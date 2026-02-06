output "instance_id" {
  description = "ID of the EC2 instance"
  value       = aws_instance.medifind_server.id
}

output "instance_public_ip" {
  description = "Public IP address of the EC2 instance"
  value       = aws_instance.medifind_server.public_ip
}

output "instance_public_dns" {
  description = "Public DNS name of the EC2 instance"
  value       = aws_instance.medifind_server.public_dns
}

output "application_url" {
  description = "URL to access the application"
  value       = "http://${var.subdomain}.${var.domain_name}"
}

output "ssh_command" {
  description = "SSH command to connect to the instance"
  value       = "ssh -i medifind-devops.pem ubuntu@${aws_instance.medifind_server.public_ip}"
}
