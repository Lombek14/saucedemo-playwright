import { test, expect, request } from '@playwright/test';

const BASE_URL = 'https://simplecrudapi.com/api';

test.describe.serial('@api SimpleCrud API testing', () => {

    let createdUserId;
    let createdEmail;

    // ***GET all users***
    test('GET all users', async ({ request }) => {

        const response = await request.get(`${BASE_URL}/users`);
        const body = await response.json();

        await expect(response).toBeOK();

        expect(response.status()).toBe(200);
        expect(response.headers()['content-type']).toContain('application/json');
        expect(response.body).toHaveProperty('name');

        expect(body.data).toBeDefined();
        expect(Array.isArray(body.data)).toBeTruthy();

        for (const user of body.data) {
            expect(user.email).toMatch(/@(example\.com|example\.org|example\.net)$/);
        }


        console.log('Get users:', body);

    });


    // ***POST create user***
    test('POST create user ', async ({ request }) => {
        createdEmail = `user_${Date.now()}@example.com`;

        const newUser = {
            name: 'Mahoula CRUD QA',
            email: createdEmail
        };
        const response = await request.post(`${BASE_URL}/users`, {
            data: newUser,
            timeout: 20000,
        });

        console.log('Status:', response.status());
        console.log('Body:', await response.text());

        expect(response.status()).toBe(201);

        const body = await response.json();

        expect(body.data).toBeDefined();
        expect(body.data.email).toBe(createdEmail);
        expect(body.data.id).toBeTruthy();

        createdUserId = body.data.id;  // save dynamic id


        console.log('Create user:', body);


    });


    //***PUT update user***
    test('PUT update user', async ({ request }) => {
        const UpdatedEmail = `user_${Date.now()}@example.com`;

        const response = await request.put(`${BASE_URL}/users/${createdUserId}`, {
            data: { name: 'Mahoula SDET', email: UpdatedEmail },
            timeout: 20000,

        });

        console.log('Status:', response.status());
        console.log('Body:', await response.text());

        expect(response.status()).toBe(200);

        const body = await response.json();

        expect(body.data).toBeDefined();
        expect(body.data.email).toBe(UpdatedEmail);


        console.log('Updated user:', body);


    });


    //***DELETE user***
    test('DELETE user', async ({ request }) => {
        const response = await request.delete(`${BASE_URL}/users/${createdUserId}`, {
            timeout: 20000,

        });

        console.log('Status:', response.status());
        console.log('Body:', await response.text());

        expect([200, 204]).toContain(response.status());


    });


});


