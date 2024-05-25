CREATE TABLE task(
    id BIGSERIAL PRIMARY KEY NOT NULL,
    title VARCHAR NOT NULL,
    description VARCHAR NOT NULL,
    "dateEnd" timestamp with time zone NOT NULL,
    "dateCreate" timestamp with time zone NOT NULL,
    "updateDate" timestamp with time zone NOT NULL,
    priority VARCHAR NOT NULL,
    creator VARCHAR NOT NULL,
    responsible VARCHAR NOT NULL,
    status VARCHAR NOT NULL,
    FOREIGN KEY (creator) REFERENCES user_data(login),
    FOREIGN KEY (responsible) REFERENCES user_data(login)
);