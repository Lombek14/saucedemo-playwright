import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '10s', target: 5 },   // small normal traffic
    { duration: '5s', target: 100 },   // spike to 100 users
    { duration: '15s', target: 100 },  // hold spike
    { duration: '10s', target: 0 },  // ramp down
  ],

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
