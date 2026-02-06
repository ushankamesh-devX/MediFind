variable "aws_region" {
  description = "AWS region to deploy resources"
  type        = string
  default     = "us-east-1"
}

variable "domain_name" {
  description = "Your domain name (e.g., kamesh.me)"
  type        = string
  default     = "medifind.kamesh.me"
}

variable "subdomain" {
  description = "Subdomain for the application"
  type        = string
  default     = "www"
}

variable "key_name" {
  description = "Name of the EC2 key pair"
  type        = string
  default     = "medifind-devops"
}

variable "instance_type" {
  description = "EC2 instance type"
  type        = string
  default     = "t2.micro"
}

variable "project_name" {
  description = "Project name for resource tagging"
  type        = string
  default     = "medifind"
}
