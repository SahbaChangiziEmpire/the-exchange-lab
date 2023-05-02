const request = require('supertest');
const app = require('../app');
const {setupTestDB, teardownTestDB} = require("./testUtils");

describe('Organization Hierarchy API', () => {

    // Test updating employee name
    beforeAll(async () => {
        await setupTestDB();
    });

    afterAll(async () => {
        await teardownTestDB();
    });

    describe('GET /api/organization-hierarchy', () => {
        it('should fetch the organization hierarchy and return a 200 status code', async () => {
            const response = await request(app)
                .get('/api/organization');

            expect(response.status).toEqual(200);
            expect(response.body).toBeDefined();
            expect(response.body[0].children[1].position_title).toEqual('Senior Manager');
            expect(response.body[0].children[1].children[0].employee.employee_number).toEqual(1006);
            expect(response.body[0].children[1].children[0].children).toStrictEqual([{
                "children": null,
                "position_id": 8,
                "position_number": 8,
                "position_title": "Senior Developer"
            }]);
        });


    });
});
