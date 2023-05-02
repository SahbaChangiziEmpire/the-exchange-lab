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

const UpdateEmployeeNameDialog = ({ dialogOpen, closeDialog, newFirstName, newLastName, handleFirstNameChange, handleLastNameChange, updateNameAndCloseDialog }) => {
    return (
        <Dialog open={dialogOpen} onClose={closeDialog}>
            <DialogTitle>Update Employee Name</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please enter the new first name and last name for the employee.
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    label="First Name"
                    type="text"
                    fullWidth
                    value={newFirstName}
                    onChange={handleFirstNameChange}
                />
                <TextField
                    margin="dense"
                    label="Last Name"
                    type="text"
                    fullWidth
                    value={newLastName}
                    onChange={handleLastNameChange}
                />
            </DialogContent>
            <DialogActions>
                <Button variant="text" onClick={closeDialog}>
                    Cancel
                </Button>
                <Button variant="contained" color="primary" onClick={updateNameAndCloseDialog}>
                    Update
                </Button>
            </DialogActions>
        </Dialog>
    );
};

UpdateEmployeeNameDialog.propTypes = {
    dialogOpen: PropTypes.bool.isRequired,
    closeDialog: PropTypes.func.isRequired,
    newFirstName: PropTypes.string.isRequired,
    newLastName: PropTypes.string.isRequired,
    handleFirstNameChange: PropTypes.func.isRequired,
    handleLastNameChange: PropTypes.func.isRequired,
    updateNameAndCloseDialog: PropTypes.func.isRequired,
};

export default UpdateEmployeeNameDialog;
