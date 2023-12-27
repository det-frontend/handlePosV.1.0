import client from './client';

const requests = () => client.post('/device-connection/whreq');


export default {
    requests
}