-- run this first
CREATE TABLE parks(
	fullname varchar,
	name varchar,
	parkCode varchar,
	designation varchar,
	states varchar,
	url varchar,
	CONSTRAINT pk_parks PRIMARY KEY (
	parkCode)
);

create table alerts(
	category varchar,
	description varchar,
	id varchar primary key,
	parkCode varchar,
	title varchar,
	url varchar
);

create table campgrounds(
	parkCode varchar,
	name varchar,
	totalSites int,
	latitude varchar,
	longitude varchar,
	numberOfSitesFirstComeFirstServe int,
	numberOfSitesReservable int,
	description varchar,
	operatingHours varchar,
	reservationInfo varchar,
	id varchar,
	reservationUrl varchar
);

create table weather_data(
	parkCode varchar,
	name varchar,
	Qtr int,
	maxtempC double precision,
	mintempC double precision,
	humidity double precision,
	visibility double precision,
	windspeedKmph double precision,
	DewPointC double precision,
	cloudcover double precision
);

-- Run this second
ALTER TABLE alerts ADD CONSTRAINT fk_alerts_parkCode FOREIGN KEY (parkCode) REFERENCES parks (parkCode);
ALTER TABLE campgrounds ADD CONSTRAINT fk_campgrounds_parkCode FOREIGN KEY (parkCode) REFERENCES parks (parkCode);
ALTER TABLE weather_data ADD CONSTRAINT fk_weather_data_parkCode FOREIGN KEY (parkCode) REFERENCES parks (parkCode);

-- Then import data

-- Run this third
create table clean_data as(
select campgrounds.parkCode, weather_data.name, campgrounds.totalSites, campgrounds.latitude,
campgrounds.longitude, campgrounds.reservationInfo, campgrounds.reservationUrl,
weather_data.Qtr, weather_data.maxtempC, weather_data.mintempC, weather_data.humidity,
weather_data.visibility, weather_data.windspeedKmph, weather_data.DewPointC, weather_data.cloudcover
from campgrounds
inner join weather_data
on campgrounds.name = weather_data.name);

