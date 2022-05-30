INSERT INTO user_access."user" (id, username, password, name, gender, is_admin, birthday, phone_num, home_address)
VALUES (-1, 'admin', '$2a$04$RIdM9jw7u.9N9TBjPEbojO2q8gZIn2vq9z5YKDbvbw9beYA6O5PF2', 'admin', 2, true, '2021-05-23 00:00:00.000', '00000000000', 'Dalian China'),
       (1, 'test', '$2a$04$IgK/X3P8MM/qt2VGSG9SUuSV30C0RFT5xLnol1neOPTIAhTkqVBve', 'test', 3, false, '2022-04-30 00:00:00.000', '13400000000', 'testaddress'),
       (6, '1111', '$2a$04$RXORlAbBZcIMHxCSGsAtGeVlqKcDCnOtNbZym014POvZnWBigPM1y', '1111', 2, true, '2022-05-22 00:00:00.000', '00000000000', '0000');

INSERT INTO user_access.dialogue (id, context, context_time)
VALUES  (2, '12312414', '2022-05-24 00:00:00.000'),
        (3, '啊哈哈哈哈哈哈哈哈哈', '2022-05-24 00:00:00.000'),
        (5, '测试', '2022-05-24 00:00:00.000');

INSERT INTOo user_access.notice (id, notice_context, notice_time)
VALUES  (2, '111', '2022-05-25 00:00:00.000');