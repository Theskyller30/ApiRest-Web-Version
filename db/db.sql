 USE bd_serpomar_driver;


CREATE TABLE users(
	id BIGINT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(180) NOT NULL UNIQUE,
    name VARCHAR(90) NOT NULL,
    lastname VARCHAR(90) NOT NULL,
    notification_token VARCHAR(255),
    phone VARCHAR(90) NOT NULL UNIQUE,
    image VARCHAR(255) NULL,
    password VARCHAR(90) NOT NULL,
    placa VARCHAR(255) NULL,
    created_at TIMESTAMP(0) NOT NULL,
    update_at TIMESTAMP(0) CURRENT_TIMESTAMP
);

--   update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

 

CREATE TABLE roles_app(
	id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(90) NOT NULL UNIQUE,
    image VARCHAR(255) NULL,
    route VARCHAR(180) NOT NULL,
    created_at TIMESTAMP(0) NOT NULL,
    update_at TIMESTAMP(0) NOT NULL
    
);

CREATE TABLE address(
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    address VARCHAR(255) NOT NULL,
    neighborhood VARCHAR(180) NOT NULL,
    lat DOUBLE PRECISION NOT NULL,
    lng DOUBLE PRECISION NOT NULL,
    lat2 DOUBLE PRECISION, -- Segunda latitud
    lng2 DOUBLE PRECISION, -- Segunda longitud
    lat3 DOUBLE PRECISION, -- Tercera latitud
    lng3 DOUBLE PRECISION, -- Tercera longitud
    created_at TIMESTAMP(0) NOT NULL,
    updated_at TIMESTAMP(0) NOT NULL,
    id_user BIGINT NOT NULL,
    FOREIGN KEY(id_user) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE ubicaciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    lat DOUBLE PRECISION NOT NULL,
    lng DOUBLE PRECISION NOT NULL
);

INSERT INTO ubicaciones (nombre, lat, lng) VALUES
('Contecar', 10.377222, -75.504167),
('SPRC', 10.407222, -75.527222),
('Compas', 10.398611, -75.524167),
('Broom', 10.322778, -75.498333),
('SIMMARITIMA TURBANA', 10.247500, -75.446667),
('SINMARITIMA CTG', 10.343333, -75.487500),
('CY Tractocar', 10.308056, -75.485278),
('APM', 10.381111, -75.503056),
('INTERMODAL', 10.370833, -75.503056),
('Serpomar', 10.339167, -75.491944),
('esenttia', 10.326389, -75.502222),
('Cabot', 10.299444, -75.495556),
('Syngenta', 10.348611, -75.490556),
('Arclad', 10.339722, -75.490000),
('Knauf', 10.335278, -75.486667),
('Esenttia MB', 10.295556, -75.506667),
('Zona Franca Candelaria', 10.326111, -75.488056),
('Zona Franca Parque Central', 10.387222, -75.442778);



CREATE TABLE user_has_roles(
	id_user BIGINT NOT NULL,
	id_rol BIGINT NOT NULL,
    created_at TIMESTAMP(0) NOT NULL,
    update_at TIMESTAMP(0) NOT NULL,
    FOREIGN KEY(id_user) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY(id_rol) REFERENCES roles(id) ON UPDATE CASCADE ON DELETE CASCADE,
    PRIMARY KEY(id_user, id_rol)
);


CREATE TABLE categories(
id BIGINT PRIMARY KEY AUTO_INCREMENT,
name VARCHAR(180) NOT NULL,
description TEXT NOT NULL,
created_at TIMESTAMP(0) NOT NULL,
update_at TIMESTAMP(0) NOT NULL
);

 

CREATE TABLE products (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(180) NOT NULL,
    description TEXT NOT NULL,
    image1 VARCHAR(255),
    image2 VARCHAR(255),
    image3 VARCHAR(255),
    id_category BIGINT NOT NULL,
    id_user_creator BIGINT NOT NULL,
    selected_route VARCHAR(255),
    port_warehouse_date DATE,
    free_days_date DATE,
    scheduling_date DATE, 
    fecha_date DATE, 
    expiration_date DATE,
    loading_date DATE,
    patio_withdrawal_date DATE,
    attachment_url VARCHAR(255),
    container_types VARCHAR(255),
    remision VARCHAR(255),
    observaciones TEXT,
    num_containers INT DEFAULT 0,
    is_assigned BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    version INT DEFAULT 1,
    FOREIGN KEY (id_category) REFERENCES categories(id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (id_user_creator) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE
);




 

CREATE TABLE orders(
	id BIGINT PRIMARY KEY AUTO_INCREMENT,
    id_client BIGINT NOT NULL,
    id_delivery BIGINT NULL,
    id_address BIGINT NOT NULL,
    lat DOUBLE PRECISION,
    lng DOUBLE PRECISION,
    lat2 DOUBLE PRECISION, 
    lng2 DOUBLE PRECISION,
    lat3 DOUBLE PRECISION,
    lng3 DOUBLE PRECISION,
    status VARCHAR(90) NOT NULL,
    cita_puerto VARCHAR(20) NULL,
    timestamp BIGINT NOT NULL,
    created_at TIMESTAMP(0) NOT NULL,
    update_at TIMESTAMP(0) NOT NULL,
    destinationReached INT DEFAULT 0,
    FOREIGN KEY(id_client) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY(id_delivery) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY(id_address) REFERENCES address(id) ON UPDATE CASCADE ON DELETE CASCADE
); 

 

CREATE TABLE order_has_products(
	id_order BIGINT NOT NULL,
    id_product BIGINT NOT NULL,
    quantity BIGINT NOT NULL,
    created_at TIMESTAMP(0) NOT NULL,
    update_at TIMESTAMP(0) NOT NULL,
    PRIMARY KEY(id_order, id_product),
    FOREIGN KEY(id_order) REFERENCES orders(id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY(id_product) REFERENCES products(id) ON UPDATE CASCADE ON DELETE CASCADE
);

 

CREATE TABLE galery(
id BIGINT PRIMARY KEY AUTO_INCREMENT,
name VARCHAR(180) NULL,
description TEXT NULL,
image1 VARCHAR(255) NULL,
image2 VARCHAR(255) NULL,
image3 VARCHAR(255) NULL,
image4 VARCHAR(255) NULL,
image5 VARCHAR(255) NULL,
image6 VARCHAR(255) NULL,
id_category_galeries BIGINT NOT NULL,
created_at TIMESTAMP(0) NOT NULL,
update_at TIMESTAMP(0) NOT NULL,
FOREIGN KEY(id_category_galeries) REFERENCES categories_galery(id) ON UPDATE CASCADE ON DELETE CASCADE
);


 

CREATE TABLE categories_galery(
	id BIGINT PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(180) NOT NULL,
	created_at TIMESTAMP(0) NOT NULL,
	update_at TIMESTAMP(0) NOT NULL
);