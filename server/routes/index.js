const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
// async function main(req, res) {
//     await prisma.user.create({
//         data: {
//             id: "2389389kjwdww",
//             name: "Alice",
//             email: "alice@prisma.io"
//         }
//     });

//     const allUsers = await prisma.user.findMany();
//     console.dir(allUsers, { depth: null });
// }
// main()
//     .catch((e) => {
//         throw e;
//     })
//     .finally(async () => {
//         await prisma.$disconnect();
//     });
router.get("/me", async (req, res) => {
    return res.send("I'm hooked!");
});

module.exports = router;
