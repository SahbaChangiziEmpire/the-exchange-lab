const request = require('supertest');
const app = require('../app');
const {setupTestDB, teardownTestDB} = require("./testUtils");

describe('Positions API', () => {

    // Test updating employee name
    beforeAll(async () => {
        await setupTestDB();
    });

    afterAll(async () => {
        await teardownTestDB();
    });

    describe('POST /api/positions', () => {
        it('should create a new position and return a success message', async () => {
            const response = await request(app)
                .post('/api/positions')
                .send({
                    positionTitle: 'Test Position',
                    parentPositionId: 2,
                    positionNumber: 1234
                });

            expect(response.status).toEqual(200);
            expect(response.body.message).toEqual('Manager position added successfully');
        });


        it('should return an error message when missing required fields', async () => {
            const response = await request(app)
                .post('/api/positions')
                .send({
                    positionTitle: 'Test Position'
                });

            expect(response.status).toEqual(500);
            expect(response.text).toEqual('Error adding Manager position');
        });
    });
});
