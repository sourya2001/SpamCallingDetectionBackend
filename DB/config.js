const {PrismaClient}=require('@prisma/client')
//for seeing the sql database changes
const prisma =new PrismaClient({
    log:["query"],
})


module.exports=prisma