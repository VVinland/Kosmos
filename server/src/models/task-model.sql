CREATE TABLE task(
    id BIGSERIAL PRIMARY KEY NOT NULL,
    title VARCHAR NOT NULL,
    description VARCHAR NOT NULL,
    dateEnd DATE NOT NULL,
    dateCreate DATE NOT NULL,
    updateDate DATE NOT NULL,
    priority VARCHAR NOT NULL,
    creator VARCHAR NOT NULL,
    responsible VARCHAR NOT NULL,
    FOREIGN KEY (creator) REFERENCES user_data(login),
    FOREIGN KEY (responsible) REFERENCES user_data(login)
);

-- • Заголовок
-- • Описание
-- • Дата окончания
-- • Дата создания
-- • Дата обновления
-- • Приоритет (высокий, средний, низкий)
-- • Статус (к выполнению, выполняется, выполнена, отменена)
-- • Создатель - пользователь
-- • Ответственный - пользователь
