import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 10,          // 5 virtual users
  duration: '15s', // run test for 15 seconds
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
