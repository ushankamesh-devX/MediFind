-- Database migrations for navigation features
-- Run this file to add favorites, user profile enhancements, and contact messages

-- =====================================================
-- 1. FAVORITES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS favorites (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  pharmacy_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (pharmacy_id) REFERENCES pharmacies(id) ON DELETE CASCADE,
  UNIQUE KEY unique_favorite (user_id, pharmacy_id)
);

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_favorites_user ON favorites(user_id);
CREATE INDEX IF NOT EXISTS idx_favorites_pharmacy ON favorites(pharmacy_id);

-- =====================================================
-- 2. USER PROFILE ENHANCEMENTS
-- =====================================================
-- Add profile fields to users table
ALTER TABLE users
ADD COLUMN IF NOT EXISTS full_name VARCHAR(255),
ADD COLUMN IF NOT EXISTS phone VARCHAR(20),
ADD COLUMN IF NOT EXISTS address TEXT,
ADD COLUMN IF NOT EXISTS city VARCHAR(100),
ADD COLUMN IF NOT EXISTS state VARCHAR(100),
ADD COLUMN IF NOT EXISTS zip_code VARCHAR(20),
ADD COLUMN IF NOT EXISTS profile_picture VARCHAR(500),
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;

-- =====================================================
-- 3. CONTACT MESSAGES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS contact_messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  subject VARCHAR(255),
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status ENUM('new', 'read', 'replied') DEFAULT 'new'
);

-- Add index for status filtering
CREATE INDEX IF NOT EXISTS idx_contact_status ON contact_messages(status);
CREATE INDEX IF NOT EXISTS idx_contact_created ON contact_messages(created_at);

-- =====================================================
-- 4. PHARMACY ENHANCEMENTS (Optional)
-- =====================================================
-- Add is_24_hours column if it doesn't exist
ALTER TABLE pharmacies
ADD COLUMN IF NOT EXISTS is_24_hours BOOLEAN DEFAULT FALSE;

-- Update existing pharmacies that are open 24/7
UPDATE pharmacies 
SET is_24_hours = TRUE 
WHERE open_time = '00:00:00' AND close_time = '23:59:59';

-- =====================================================
-- VERIFICATION QUERIES
-- =====================================================
-- Run these to verify the migrations worked:
-- SELECT COUNT(*) FROM favorites;
-- DESCRIBE users;
-- SELECT COUNT(*) FROM contact_messages;
-- SHOW INDEX FROM favorites;
