# Seed data for the "herbs" table
Herb.create(name: "Lavender")
Herb.create(name: "Mint")
Herb.create(name: "Rosemary")

# Seed data for the "users" table
User.create(username: "alice", password_digest: "password123")
User.create(username: "bob", password_digest: "secret456")
User.create(username: "carol", password_digest: "passphrase789")

# Seed data for the "reviews" table
Review.create(rating: 5, content: "Lavender is amazing!", user_id: 1, herb_id: 1)
Review.create(rating: 4, content: "Mint is so refreshing.", user_id: 2, herb_id: 2)
Review.create(rating: 3, content: "Rosemary is quite strong.", user_id: 3, herb_id: 3)