import{ test as base, expect} from '@playwright/test';

const test = base.extend({
    apiUser: async({request}, use) =>{
        const response = await request.get('https://reqres.in/api/users/2', {
            headers:{
                'x-api-key': 'reqres-free-v1' },

        });

        await expect(response).toBeOK();

        const body = await response.json();
        const user = body.data; // { id, email, first_name, last_name, ... }

        console.log('apiUser:', user);

        await use(user);

    },

});

export{test,expect};