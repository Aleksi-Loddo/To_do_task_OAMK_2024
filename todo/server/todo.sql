create  table task (
    id serial primary key,
    descrition varchar(255) not null,
)


insert into task (description) values ('my test task');

insert into task (description) values ('my anotehr test task');