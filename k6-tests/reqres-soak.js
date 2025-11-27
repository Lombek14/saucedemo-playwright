import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    vus: 20,          // 20 virtual users
    duration: '3m', // run test for 15 seconds
    
    ext: {
        loadimpact: {
            projectID: 5843281,

        }
    }
};





export default function () {
    const response = http.get('https://reqres.in/api/users/2', {
        headers: {
            'x-api-key': 'reqres-free-v1',
        },
    });

    check(response, {
        'status is 200': (resp) => resp.status === 200,
        'response time < 500ms': (resp) => resp.timings.duration < 500,
    });

    sleep(1);
}
