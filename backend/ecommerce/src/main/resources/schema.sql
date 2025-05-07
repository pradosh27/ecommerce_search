CREATE TABLE IF NOT EXISTS product (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(19,2),
    brand VARCHAR(255),
    category VARCHAR(255),
    image_url VARCHAR(255)
);