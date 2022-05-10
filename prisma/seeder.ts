import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

async function seed() {

    await Promise.all(
        getTodos().map(todo => {
            return db.todo.create({ data: todo });
        })
    )

}

seed();

function getTodos() {

    return [
        { 
            "title": "Todo Number 1", 
            "description": "Todo Number 1 Description"
        },
        {
            "title": "Todo Number 2", 
            "description": "Todo Number 2 Description"
        },
        {
            "title": "Todo Number 3", 
            "description": "Todo Number 3 Description"
        }
    ]

}