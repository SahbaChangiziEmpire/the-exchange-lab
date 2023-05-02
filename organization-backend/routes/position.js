const express = require('express');
const {getConnection} = require("../db");
const router = express.Router();

/**
 * Add a new manager position to the organization hierarchy
 * @route POST /positions
 * @group Positions - Operations related to manager positions in the organization hierarchy
 * @param {string} positionTitle.body.required - The title of the new position
 * @param {number} [parentPositionId] - The ID of the parent position (if any)
 * @param {number} positionNumber.body.required - The position number of the new position
 * @returns {Object} 200 - The message indicating the manager position was added successfully
 * @returns {Object} 500 - An error message
 */
router.post("/", async (req, res) => {
    const {positionTitle, parentPositionId, positionNumber} = req.body;
    try {
        const connection = await getConnection();
        await connection.execute(
            "INSERT INTO positions (position_title, position_number, parent_position_id) VALUES ( ?, ? , ?)",
            [positionTitle, positionNumber, parentPositionId]
        );
        connection.end();
        res.json({message: "Manager position added successfully"});
    } catch (error) {
        console.error(error);
        res.status(500).send("Error adding Manager position");
    }
});

module.exports = router;
