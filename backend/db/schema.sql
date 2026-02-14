-- Create pharmacies table
CREATE TABLE IF NOT EXISTS pharmacies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL,
    rating DECIMAL(2, 1) DEFAULT 0.0,
    is_open BOOLEAN DEFAULT TRUE,
    open_time TIME,
    close_time TIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert some sample data (optional, but helpful for testing)
INSERT INTO pharmacies (name, address, phone, latitude, longitude, rating, is_open, open_time, close_time) VALUES 
('HealthCare Pharmacy', '123 Main St, New York, NY', '+1-555-0123', 40.7158, -74.0090, 4.5, TRUE, '08:00:00', '21:00:00'),
('MediPlus Store', '456 Oak Ave, New York, NY', '+1-555-0456', 40.7200, -74.0100, 4.8, TRUE, '07:00:00', '21:00:00'),
('City Pharmacy', '789 Elm St, New York, NY', '+1-555-0789', 40.7100, -74.0050, 4.2, TRUE, '00:00:00', '23:59:59'),
('QuickMeds Pharmacy', '321 Pine Rd, New York, NY', '+1-555-1234', 40.7250, -74.0120, 4.6, TRUE, '09:00:00', '20:00:00'),
('Community Drugstore', '654 Cedar Ln, New York, NY', '+1-555-5678', 40.7050, -74.0030, 4.3, FALSE, '08:00:00', '18:00:00');
