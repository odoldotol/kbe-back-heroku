create table MarketLogs (
	id int not null auto_increment primary key,
    nft_id int not null,
    seller_account varchar(300) not null,
    sale_price int not null,
    sale_token varchar(300) not null default 'ETH',
    status_code int not null,
    buyer_account varchar(300),
    transaction_hash varchar(300) unique,
    transactedAt date,
    createdAt date not null,
    updatedAt date not null,
    foreign key (nft_id) references Nfts(id) on delete RESTRICT
)