const request = require('supertest');
const app = require('../app');
const {setupTestDB, teardownTestDB} = require("./testUtils");

describe('Employee API', () => {

    // Test updating employee name
    beforeAll(async () => {
        await setupTestDB();
    });

    afterAll(async () => {
        await teardownTestDB();
    });


    describe('PUT /api/employees/:employeeId', () => {
        it('should update employee name and return success message', async () => {
            const response = await request(app)
                .put('/api/employees/1')
                .send({ firstName: 'John', lastName: 'Doe' });

            expect(response.status).toEqual(200);
            expect(response.body.message).toEqual('Employee name updated successfully');
        });

        it('should return error message when given an invalid employeeId', async () => {
            const response = await request(app)
                .put('/api/employees/9999')
                .send({ firstName: 'John', lastName: 'Doe' });

            expect(response.status).toEqual(404);
            expect(response.text).toEqual('Employee not found');
        });
    });

    // Test removing employee from position
    describe('PATCH /api/employees/:employeeId/remove', () => {
        it('should remove employee from position and return success message', async () => {
            const response = await request(app)
                .patch('/api/employees/1/remove');

            expect(response.status).toEqual(200);
            expect(response.body.message).toEqual('Employee removed from position successfully');
        });

        it('should return error message when given an invalid employeeId', async () => {
            const response = await request(app)
                .patch('/api/employees/9999/remove');

            expect(response.status).toEqual(404);
            expect(response.text).toEqual('Employee not found');
        });
    });

    // Test creating and assigning a new employee
    describe('POST /api/employees/create-and-assign', () => {
        it('should create and assign a new employee and return success message', async () => {
            const response = await request(app)
                .post('/api/employees/create-and-assign')
                .send({ firstName: 'John', lastName: 'Doe', positionId: 1, employeeNumber: '1234' });

            expect(response.status).toEqual(200);
            expect(response.body.message).toEqual('Employee assigned successfully');
        });

        it('should return error message when given invalid employee data', async () => {
            const response = await request(app)
                .post('/api/employees/create-and-assign')
                .send({ firstName: 'John', lastName: 'Doe' });

            expect(response.status).toEqual(500);
            expect(response.body.error).toEqual('An error occurred while creating and assigning the employee.');
        });
    });
});
