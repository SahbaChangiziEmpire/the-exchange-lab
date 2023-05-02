import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const API_URL = process.env.NODE_ENV === 'production' ? process.env.API_URL : process.env.LOCAL_API_URL;


export const fetchOrganizationHierarchy = async () => {
    try {
        const response = await axios.get(`${API_URL}/organization`);
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
};

export const updateEmployeeName = async (employeeId, firstName, lastName) => {
    try {
        const response = await axios.put(`${API_URL}/employees/${employeeId}`, {firstName, lastName});
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
};

export const removeEmployeeFromPosition = async (positionId) => {
    try {
        const response = await axios.patch(`${API_URL}/employees/${positionId}/remove`);
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
};

export const addManagerPosition = async (positionNumber, parentPositionId) => {
    try {
        const response = await axios.post(`${API_URL}/positions`, {
            positionTitle: "Manager", parentPositionId, positionNumber
        });
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
};

export const createEmployeeAndAssignPosition = async (newEmployeeFirstName, newEmployeeLastName, newEmployeeNumber, selectedPositionId) => {
    try {
        const response = await axios.post(`${API_URL}/employees/create-and-assign`, {
            firstName: newEmployeeFirstName,
            lastName: newEmployeeLastName,
            employeeNumber: newEmployeeNumber,
            positionId: selectedPositionId
        });
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
};
