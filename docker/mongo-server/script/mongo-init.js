db.createUser(
    {
        user: "pmkt_dev",
        pwd: "passpass",
        roles: [
            {
                role: "readWrite",
                db: "pmkt_db"
            }
        ]
    }
)