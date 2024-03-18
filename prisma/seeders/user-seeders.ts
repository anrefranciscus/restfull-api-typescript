import {prismaClient} from "../../src/application/database";
import {faker} from "@faker-js/faker";
import bcrypt from "bcrypt";
import {CreateUserRequest} from "../../src/model/user-model";
import {CreateContactRequest} from "../../src/model/contact-model";
import {Address, Contact, User} from "@prisma/client";

const snakeCase = (name: string) => {
    return name.replace(/\d+/g, ' ')
        .split(/ |\B(?=[A-Z])/)
        .map((word) => word.toLowerCase())
        .join('_');
};
const UserSeeders = async () => {
    try {
        await prismaClient.user.deleteMany({})
        const amountOfUser = 25

        for (let i = 0; i < amountOfUser; i++) {
            const username = faker.name.fullName()
            const password = await bcrypt.hash('my_secure_password', 10);

            //seed user
            const user = await prismaClient.user.upsert({
                where: {
                    username: username,
                },
                update: {},
                create: {
                    username: snakeCase(username),
                    password: password,
                    name: username
                }
            })

            const splitUsername = user.username.split('_')

            const contact = await prismaClient.contact.upsert({
                where: {
                    id: i+1,
                },
                update: {},
                create: {
                    first_name: splitUsername[0],
                    last_name: splitUsername[1],
                    email: faker.internet.email(),
                    phone: faker.phone.number(),
                    username: user.username
                }
            })

            await prismaClient.address.upsert({
                where: {
                    id: i+1
                },
                update: {},
                create: {
                    street: faker.address.streetAddress(),
                    city: faker.address.city(),
                    province: faker.address.state(),
                    country: faker.address.country(),
                    postal_code: faker.address.zipCode(),
                    contact: {
                        connect: {id: contact.id}
                    }
                }
            })
        }
    }catch (e) {
        console.log('Error seeding database', e)
    }finally {
        await prismaClient.$disconnect()
    }
}

const UndoSeeders = async () => {
    try {
        // Delete all users
        await prismaClient.user.deleteMany();
        await prismaClient.contact.deleteMany()
        await prismaClient.address.deleteMany()
        console.log('Seed data deleted successfully.');
    } catch (error) {
        console.error('Error deleting seed data:', error);
    } finally {
        await prismaClient.$disconnect();
    }
}

UserSeeders().then()