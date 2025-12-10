import bcrypt from 'bcrypt';
import { prisma } from '../src/prisma';

// Asynkron main-funktion som kører vores seed-data
const main = async () => {

// Sletter eksisterende data i bruger tabellen
    await prisma.user.deleteMany();
    await prisma.cartlines.deleteMany();
    await prisma.userRatings.deleteMany();

// Opretter en testbruger i databasen
const user = await prisma.user.create({
    data: {
        firstName: 'Test',
        lastName: 'Bruger',
        email: "test@example.com", // Login-email
        password: await bcrypt.hash('password', 10), // Password hash
        role: 'USER', // Brugerrolle
        isActive: true // Brugeren er aktiv og må logge ind
    },
});

// Opretter en testbruger i databasen
const admin = await prisma.user.create({
    data: {
        firstName: 'Admin',
        lastName: 'Bruger',
        email: "admin@exmample.com", //login-email
        password: await bcrypt.hash('password', 10), // Password hash
        role: 'ADMIN', // Brugerrolle
        isActive: true // Brugeren er aktiv og må logge ind
    },
});

// Opretter nogle cartlines i databasen
const cartlines = await prisma.cartlines.createMany({
    data: [{ name: "Cartline 1 },
           { name: "Cartline 2", },
           { name: "Cartline 3"}],
});

// Opretter nogle userRatings i databasen
const userRatings = await prisma.userRatings.createMany({
    data: [{ rating: 5,},
           { rating: 4,},
           { rating: 3}],
});

// Udskriver i terminalen at brugeren er oprettet
console.log("Seed completed for users:", user, admin);

//Udskriver i terminalen at cartlines er oprettet
console.log("Seed completed for cartlines", cartlines);

// Udskriver i terminalen at userRatings er oprettet
console.log("Seed completed for userRatings", userRatings);
}

// Kører main-funktionen
main()
.then(() => prisma.$disconnect()) //Lukker db forbindelsen når alt er okay
.catch((e) => {
    console.error(e)
    prisma.$disconnect();
    process.exit(1);
});


