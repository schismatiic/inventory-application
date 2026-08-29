const { Client } = require("pg");
process.loadEnvFile();

const SQL = `
CREATE TABLE IF NOT EXISTS categories (
   id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
   name VARCHAR ( 255 ),
   description TEXT
);
INSERT INTO categories (name, description) VALUES ('Psychological Fiction', 'Stories that explore the thoughts, emotions, and mental struggles of their characters.'),
('Western', 'Stories set in the American frontier.'),
('Dystopian Fiction', 'Stories set in oppressive or undesirable societies.');

CREATE TABLE IF NOT EXISTS books (
   id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
   name VARCHAR ( 255 ),
   author VARCHAR ( 255 ),
   description TEXT,
   pages INTEGER,
   category_fk INTEGER,
   FOREIGN KEY (category_fk) REFERENCES categories(id) 
);

INSERT INTO books (name, author, description, pages, category_fk)
VALUES 
('1984', 'George Orwell', 'A man rebels against an oppressive totalitarian regime.', 328, 3), 
('Blood Meridian', 'Cormac McCarthy', 'A brutal journey through the American frontier.', 337, 2), 
('Crime and Punishment', 'Fyodor Dostoevsky', 'A young man struggles with guilt after committing murder.', 671, 1), 
('No Longer Human', 'Osamu Dazai', 'A troubled man struggles to connect with society.', 177, 1);
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: process.env.DB_URL,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
