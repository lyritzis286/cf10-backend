use("codingfactory");

db.getCollection("users").find({}, { password: 0 });
