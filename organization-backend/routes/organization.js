const express = require('express');
const {getConnection} = require("../db");
const router = express.Router();

/**
 * Fetches the organization hierarchy from the database
 *
 * @param {Object} req - The HTTP request object
 * @param {Object} res - The HTTP response object
 * @returns {Object} - The organization hierarchy
 */
router.get('/', async (req, res) => {
    try {
        const connection = await getConnection();
        const [rows] = await connection.query(`
        SELECT p.position_id,
               p.position_number,
               p.position_title,
               p.parent_position_id,
               e.employee_id,
               e.first_name,
               e.last_name,
               e.employee_number
        FROM positions p
                 LEFT JOIN employees e ON p.position_id = e.position_id
    `);
        connection.end();
        const hierarchy = buildHierarchy(rows);
        res.json(hierarchy);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching organization hierarchy');
    }
});

/**
 * Helper function to build the organization hierarchy
 *
 * @param {Array} rows - The rows returned from the database query
 * @param {number|null} parentId - The ID of the parent position (default: null)
 * @returns {Array} - The organization hierarchy
 */
function buildHierarchy(rows, parentId = null) {
    const hierarchy = [];
    rows
        .filter((row) => row.parent_position_id === parentId)
        .forEach((row) => {
            const children = buildHierarchy(rows, row.position_id);

            let node = {
                position_id: row.position_id,
                position_number: row.position_number,
                position_title: row.position_title,
                children: children.length > 0 ? children : null,
            };
            if (row.employee_id) {
                node.employee = {
                    employee_id: row.employee_id,
                    first_name: row.first_name,
                    last_name: row.last_name,
                    employee_number: row.employee_number,
                };
            }
            hierarchy.push(node);
        });

    return hierarchy;
}

module.exports = router;
