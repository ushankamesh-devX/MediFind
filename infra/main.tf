terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "us-east-1"
}

resource "aws_s3_bucket" "health_app_bucket" {
  bucket = "health-app-demo-bucket-$(date +%s)"  # Unique name
}
