variable "aws_region" {
  description = "AWS region to deploy resources"
  type        = string
  default     = "us-east-1"  # Free tier eligible
}

variable "project_name" {
  description = "Project name for resource naming"
  type        = string
  default     = "medifind"
}

variable "environment" {
  description = "Environment (dev, staging, prod)"
  type        = string
  default     = "dev"
}

# VPC Configuration
variable "vpc_cidr" {
  description = "CIDR block for VPC"
  type        = string
  default     = "10.0.0.0/16"
}

variable "availability_zones" {
  description = "Availability zones"
  type        = list(string)
  default     = ["us-east-1a", "us-east-1b"]
}

# Database Configuration
variable "db_name" {
  description = "Database name"
  type        = string
  default     = "healthdb"
}

variable "db_username" {
  description = "Database master username"
  type        = string
  default     = "admin"
}

variable "db_password" {
  description = "Database master password"
  type        = string
  sensitive   = true
  default     = "Kamesh9396164"  # Change this in production!
}

variable "db_instance_class" {
  description = "RDS instance class (Free tier: db.t3.micro)"
  type        = string
  default     = "db.t3.micro"
}

variable "db_allocated_storage" {
  description = "Allocated storage in GB (Free tier: up to 20GB)"
  type        = number
  default     = 20
}

# SSH Key
variable "ssh_public_key" {
  description = "Public SSH key for EC2 instance access"
  type        = string
}

# Image Versions (Optional, for Ansible or future use)
variable "frontend_image_tag" {
  description = "Tag for frontend image"
  type        = string
  default     = "latest"
}

variable "backend_image_tag" {
  description = "Tag for backend image"
  type        = string
  default     = "latest"
}

# JWT Secret
variable "jwt_secret" {
  description = "JWT secret key for authentication"
  type        = string
  sensitive   = true
  default     = "your-secret-key-change-in-production"
}
