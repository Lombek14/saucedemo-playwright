import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '10s', target: 20 },   // warm up: 0 -> 20
    { duration: '20s', target: 50 },   // more load: 20 -> 50
    { duration: '20s', target: 100 },  // heavier: 50 -> 100
    { duration: '20s', target: 150 },  // max stress: 100 -> 150
    { duration: '10s', target: 0 },    // ramp down: 150 -> 0
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
