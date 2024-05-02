-- Tabla Usuario
CREATE TABLE IF NOT EXISTS usuario (
    id_usuario SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    nombre VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    summoner_name VARCHAR(255),
    fecha_nacimiento DATE NOT NULL
);

-- Tabla Rol
CREATE TABLE IF NOT EXISTS rol (
    id_rol SERIAL PRIMARY KEY,
    nombre_rol VARCHAR(255) NOT NULL,
    descripcion VARCHAR(255)
);

-- Tabla Permiso
CREATE TABLE IF NOT EXISTS permiso (
    id_permiso SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL
);

-- Tabla Menú
CREATE TABLE IF NOT EXISTS menu (
    id_menu SERIAL PRIMARY KEY,
    nombre_menu VARCHAR(255) NOT NULL,
    id_padre INT,
    accion VARCHAR(255),
    orden INT
);

-- Tabla Cuenta Favorita
CREATE TABLE IF NOT EXISTS cuenta_fav (
    id_cuenta_fav SERIAL PRIMARY KEY,
    nombre_cuenta VARCHAR(255) NOT NULL
);

-- Tabla Item Favorito
CREATE TABLE IF NOT EXISTS item_fav (
    id_item_fav SERIAL PRIMARY KEY,
    nombre_item VARCHAR(255) NOT NULL,
    descripcion_item VARCHAR(255),
    imagen_item VARCHAR(255)
);

-- Tabla Campeón Favorito
CREATE TABLE IF NOT EXISTS champ_fav (
    id_champ_fav SERIAL PRIMARY KEY,
    nombre_champ VARCHAR(255) NOT NULL,
    descripcion_champ VARCHAR(255),
    icon_champion VARCHAR(255),
    splashart_champ VARCHAR(255)
);

-- Tabla Transacciones
CREATE TABLE IF NOT EXISTS transacciones (
    id_transaccion SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion VARCHAR(255),
    coste NUMERIC(10, 2) NOT NULL,
    fecha_compra DATE
);

-- Tablas Intermedias
CREATE TABLE IF NOT EXISTS usuario_rol (
    id SERIAL PRIMARY KEY,
    usuario_id INT REFERENCES usuario(id_usuario),
    rol_id INT REFERENCES rol(id_rol),
    CONSTRAINT fk_usuario_rol_usuario FOREIGN KEY (usuario_id) REFERENCES usuario(id_usuario),
    CONSTRAINT fk_usuario_rol_rol FOREIGN KEY (rol_id) REFERENCES rol(id_rol)
);

CREATE TABLE IF NOT EXISTS usuario_permiso (
    id SERIAL PRIMARY KEY,
    usuario_id INT REFERENCES usuario(id_usuario),
    permiso_id INT REFERENCES permiso(id_permiso),
    CONSTRAINT fk_usuario_permiso_usuario FOREIGN KEY (usuario_id) REFERENCES usuario(id_usuario),
    CONSTRAINT fk_usuario_permiso_permiso FOREIGN KEY (permiso_id) REFERENCES permiso(id_permiso)
);

CREATE TABLE IF NOT EXISTS permiso_menu (
    id SERIAL PRIMARY KEY,
    permiso_id INT REFERENCES permiso(id_permiso),
    menu_id INT REFERENCES menu(id_menu),
    CONSTRAINT fk_permiso_menu_permiso FOREIGN KEY (permiso_id) REFERENCES permiso(id_permiso),
    CONSTRAINT fk_permiso_menu_menu FOREIGN KEY (menu_id) REFERENCES menu(id_menu)
);

CREATE TABLE IF NOT EXISTS rol_menu (
    id SERIAL PRIMARY KEY,
    rol_id INT REFERENCES rol(id_rol),
    menu_id INT REFERENCES menu(id_menu),
    CONSTRAINT fk_rol_menu_rol FOREIGN KEY (rol_id) REFERENCES rol(id_rol),
    CONSTRAINT fk_rol_menu_menu FOREIGN KEY (menu_id) REFERENCES menu(id_menu)
);

CREATE TABLE IF NOT EXISTS usuario_cuenta_fav (
    id SERIAL PRIMARY KEY,
    usuario_id INT REFERENCES usuario(id_usuario),
    cuenta_fav_id INT REFERENCES cuenta_fav(id_cuenta_fav),
    CONSTRAINT fk_usuario_cuenta_fav_usuario FOREIGN KEY (usuario_id) REFERENCES usuario(id_usuario),
    CONSTRAINT fk_usuario_cuenta_fav_cuenta_fav FOREIGN KEY (cuenta_fav_id) REFERENCES cuenta_fav(id_cuenta_fav)
);

CREATE TABLE IF NOT EXISTS usuario_item_fav (
    id SERIAL PRIMARY KEY,
    usuario_id INT REFERENCES usuario(id_usuario),
    item_fav_id INT REFERENCES item_fav(id_item_fav),
    CONSTRAINT fk_usuario_item_fav_usuario FOREIGN KEY (usuario_id) REFERENCES usuario(id_usuario),
    CONSTRAINT fk_usuario_item_fav_item_fav FOREIGN KEY (item_fav_id) REFERENCES item_fav(id_item_fav)
);

CREATE TABLE IF NOT EXISTS usuario_champ_fav (
    id SERIAL PRIMARY KEY,
    usuario_id INT REFERENCES usuario(id_usuario),
    champ_fav_id INT REFERENCES champ_fav(id_champ_fav),
    CONSTRAINT fk_usuario_champ_fav_usuario FOREIGN KEY (usuario_id) REFERENCES usuario(id_usuario),
    CONSTRAINT fk_usuario_champ_fav_champ_fav FOREIGN KEY (champ_fav_id) REFERENCES champ_fav(id_champ_fav)
);

-- Insertar datos en la tabla Usuario
INSERT INTO
    usuario (
        username,
        nombre,
        password,
        summoner_name,
        fecha_nacimiento
    )
VALUES
    (
        'usuario1',
        'NombreUsuario1',
        'contraseña123',
        'Summoner1',
        '1990-01-01'
    ),
    (
        'usuario2',
        'NombreUsuario2',
        'contraseña456',
        NULL,
        '1995-05-15'
    );

-- Insertar datos en la tabla Rol
INSERT INTO
    rol (nombre_rol, descripcion)
VALUES
    ('Admin', 'Rol de administrador del sistema'),
    ('Usuario', 'Rol de usuario estándar');

-- Insertar datos en la tabla Permiso
INSERT INTO
    permiso (nombre)
VALUES
    ('Crear'),
    ('Editar');

-- Insertar datos en la tabla Menú
INSERT INTO
    menu (nombre_menu, id_padre, accion, orden)
VALUES
    ('Inicio', NULL, 'IrInicio', 1),
    ('Configuración', NULL, 'IrConfiguracion', 2);

-- Insertar datos en la tabla Cuenta Favorita
INSERT INTO
    cuenta_fav (nombre_cuenta)
VALUES
    ('Cuenta1'),
    ('Cuenta2');

-- Insertar datos en la tabla Item Favorito
INSERT INTO
    item_fav (nombre_item, descripcion_item, imagen_item)
VALUES
    ('Item1', 'Descripción de Item1', 'imagen1.jpg'),
    ('Item2', 'Descripción de Item2', 'imagen2.jpg');

-- Insertar datos en la tabla Campeón Favorito
INSERT INTO
    champ_fav (
        nombre_champ,
        descripcion_champ,
        icon_champion,
        splashart_champ
    )
VALUES
    (
        'Campeón1',
        'Descripción de Campeón1',
        'icono1.jpg',
        'splash1.jpg'
    ),
    (
        'Campeón2',
        'Descripción de Campeón2',
        'icono2.jpg',
        'splash2.jpg'
    );

-- Insertar datos en la tabla Transacciones
INSERT INTO
    transacciones (nombre, descripcion, coste, fecha_compra)
VALUES
    (
        'Transacción1',
        'Descripción de Transacción1',
        50.00,
        '2024-05-01'
    ),
    (
        'Transacción2',
        'Descripción de Transacción2',
        75.00,
        '2024-04-25'
    );

-- Seleccionar todos los datos de la tabla Usuario
SELECT
    *
FROM
    usuario;

-- Seleccionar todos los datos de la tabla Rol
SELECT
    *
FROM
    rol;

-- Seleccionar todos los datos de la tabla Permiso
SELECT
    *
FROM
    permiso;

-- Seleccionar todos los datos de la tabla Menú
SELECT
    *
FROM
    menu;

-- Seleccionar todos los datos de la tabla Cuenta Favorita
SELECT
    *
FROM
    cuenta_fav;

-- Seleccionar todos los datos de la tabla Item Favorito
SELECT
    *
FROM
    item_fav;

-- Seleccionar todos los datos de la tabla Campeón Favorito
SELECT
    *
FROM
    champ_fav;

-- Seleccionar todos los datos de la tabla Transacciones
SELECT
    *
FROM
    transacciones;

-- Seleccionar todos los datos de la tabla intermedia usuario_rol
SELECT
    *
FROM
    usuario_rol;

-- Seleccionar todos los datos de la tabla intermedia usuario_permiso
SELECT
    *
FROM
    usuario_permiso;

-- Seleccionar todos los datos de la tabla intermedia permiso_menu
SELECT
    *
FROM
    permiso_menu;

-- Seleccionar todos los datos de la tabla intermedia rol_menu
SELECT
    *
FROM
    rol_menu;

-- Seleccionar todos los datos de la tabla intermedia usuario_cuenta_fav
SELECT
    *
FROM
    usuario_cuenta_fav;

-- Seleccionar todos los datos de la tabla intermedia usuario_item_fav
SELECT
    *
FROM
    usuario_item_fav;

-- Seleccionar todos los datos de la tabla intermedia usuario_champ_fav
SELECT
    *
FROM
    usuario_champ_fav;