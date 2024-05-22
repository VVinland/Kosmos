CREATE TABLE refreshToken(
    id BIGSERIAL PRIMARY KEY NOT NULL,
    refreshToken VARCHAR NOT NULL UNIQUE,
    user_dataId INTEGER NOT NULL,
    FOREIGN KEY (user_dataId) REFERENCES user_data(id)
);