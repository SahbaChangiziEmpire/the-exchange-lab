import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
    TextField,
} from '@mui/material';
import PropTypes from "prop-types";

const UpdateEmployeeNameDialog = ({ employeeRenameDialogOpen, closeEmployeeRenameDialog, newFirstName, newLastName, handleFirstNameChange, handleLastNameChange, updateNameAndCloseEmployeeRenameDialog }) => {
    return (
        <Dialog open={employeeRenameDialogOpen} onClose={closeEmployeeRenameDialog}>
            <DialogTitle>Update Employee Name</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please enter the new first name and last name for the employee:
                </DialogContentText>
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    label="First Name"
                    type="text"
                    fullWidth
                    value={newFirstName}
                    onChange={handleFirstNameChange}
                />
                <TextField
                    required
                    margin="dense"
                    label="Last Name"
                    type="text"
                    fullWidth
                    value={newLastName}
                    onChange={handleLastNameChange}
                />
            </DialogContent>
            <DialogActions>
                <Button variant="text" onClick={closeEmployeeRenameDialog}>
                    Cancel
                </Button>
                <Button variant="contained" color="primary" onClick={updateNameAndCloseEmployeeRenameDialog}>
                    Update
                </Button>
            </DialogActions>
        </Dialog>
    );
};

UpdateEmployeeNameDialog.propTypes = {
    employeeRenameDialogOpen: PropTypes.bool.isRequired,
    closeEmployeeRenameDialog: PropTypes.func.isRequired,
    newFirstName: PropTypes.string.isRequired,
    newLastName: PropTypes.string.isRequired,
    handleFirstNameChange: PropTypes.func.isRequired,
    handleLastNameChange: PropTypes.func.isRequired,
    updateNameAndCloseEmployeeRenameDialog: PropTypes.func.isRequired,
};

export default UpdateEmployeeNameDialog;
