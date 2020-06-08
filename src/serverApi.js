let BASE_URL = `https://reportfakefbph.herokuapp.com`
if (process.env.NODE_ENV !== 'dev') {
    BASE_URL = `http://localhost:5000`;
}


export default {
    reports: {
        list: `${BASE_URL}/reports`,
        add: `${BASE_URL}/reports`
    },
    report: (id) => `${BASE_URL}/reports/${id}`,
};