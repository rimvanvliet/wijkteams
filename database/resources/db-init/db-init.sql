create table if not exists marker_data
(
    id uuid not null primary key,
    category text,
    name text,
    description text,
    icon text,
    coordinates point
);
