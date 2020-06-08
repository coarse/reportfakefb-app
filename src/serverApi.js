const BASE_URL = `https://reportfakefbph.herokuapp.com`

export default {
    reports: {
        list: `${BASE_URL}/reports`,
        add: `${BASE_URL}/reports`
    },
    report: (id) => `${BASE_URL}/reports/${id}`,
};