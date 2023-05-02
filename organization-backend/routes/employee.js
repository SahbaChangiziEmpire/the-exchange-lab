const express = require('express');
const { getConnection } = require('../db');
const router = express.Router();

/**
 * Update the name of an employee
 *
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
router.put('/:employeeId', async (req, res) => {
    const { employeeId } = req.params;
    const { firstName, lastName } = req.body;

    try {
        const connection = await getConnection();
        const [result] = await connection.execute(
            'UPDATE employees SET first_name = ?, last_name = ? WHERE employee_id = ?',
            [firstName, lastName, employeeId]
        );
        connection.end();
        if (result.affectedRows === 0) {
            res.status(404).send('Employee not found');
        } else {
            res.json({ message: 'Employee name updated successfully' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error updating employee name');
    }
});

/**
 * Remove an employee from a position
 *
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
router.patch('/:employeeId/remove', async (req, res) => {
    const { employeeId } = req.params;

    try {
        const connection = await getConnection();
        const [result] = await connection.execute(
            'UPDATE employees SET position_id = NULL WHERE employee_id = ?',
            [employeeId]
        );
        connection.end();
        if (result.affectedRows === 0) {
            res.status(404).send('Employee not found');
        } else {
            res.json({ message: 'Employee removed from position successfully' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error removing employee from position');
    }
});

/**
 * Create a new employee and assign them to a position
 *
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
router.post('/create-and-assign', async (req, res) => {
    try {
        const { firstName, lastName, positionId, employeeNumber } = req.body;
        const connection = await getConnection();
        await connection.execute(
            'INSERT INTO employees (first_name, last_name, employee_number, position_id) VALUES (?, ?, ?, ?)',
            [firstName, lastName, employeeNumber, positionId]
        );
        res.json({ message: 'Employee assigned successfully' });
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .json({ error: 'An error occurred while creating and assigning the employee.' });
    }
});

module.exports = router;
