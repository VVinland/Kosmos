CREATE TABLE user_data(
    id BIGSERIAL PRIMARY KEY NOT NULL,
    firstname VARCHAR NOT NULL,
    lastname VARCHAR NOT NULL,
    middlename VARCHAR NOT NULL,
    login VARCHAR NOT NULL UNIQUE,
    password VARCHAR NOT NULL,
    supervisor VARCHAR
);

-- Имя
-- • Фамилия
-- • Отчество
-- • Логин
-- • Пароль
-- • Руководитель - пользователь