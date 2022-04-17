create table Nfts (
	id int auto_increment not null primary key,
	collections_id int,
	ipfs varchar(300) not null unique,
    creater_account varchar(300),
    owner_account varchar(300) default null,
    createdAt date not null,
    updatedAt date not null,
	foreign key(collections_id) references Collections(id)
)