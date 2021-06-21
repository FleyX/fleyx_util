alter table history modify fileNum integer default 0 not null;

alter table history modify fileSize double default 0 not null;

alter table history modify speed double default 0 not null;

alter table history modify startTime bigint not null;

alter table history modify endTime bigint null;

alter table history modify comment varchar(200) not null;