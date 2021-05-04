DROP TABLE IF EXISTS products;

CREATE TABLE products(
  id int NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  description VARCHAR(255),
  price int NOT NULL,
  category VARCHAR(255) NOT NULL,
  image VARCHAR(255),
  PRIMARY KEY (id)
);

-- INSERT INTO products(name, description, price, category, image) VALUES("Product 1", "Product 1 Description", 540, "eyes", "https://mrsldna.org/wp-content/uploads/2019/03/product-placeholder.gif");
INSERT INTO products(name, description, price, category) VALUES("Product 1", "Product 1 Description", 540, "eyes");