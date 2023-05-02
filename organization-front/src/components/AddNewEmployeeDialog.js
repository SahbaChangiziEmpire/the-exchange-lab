import React from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
} from '@mui/material';
import PropTypes from "prop-types";

const AddManagerPositionDialog = (props) => {
    const {
        employeeDialogOpen,
        closeEmployeeDialog,
        newEmployeeFirstName,
        handleNewEmployeeFirstNameChange,
        newEmployeeLastName,
        handleNewEmployeeLastNameChange,
        newEmployeeNumber,
        handleNewEmployeeNumberChange,
        addNewEmployeeAndCloseDialog,
    } = props;

    return (
        <Dialog open={employeeDialogOpen} onClose={closeEmployeeDialog}>
            <DialogTitle>Create Employee</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please enter the new employee first name and last name:
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    label="First Name"
                    type="text"
                    fullWidth
                    value={newEmployeeFirstName}
                    onChange={handleNewEmployeeFirstNameChange}
                />
                <TextField
                    margin="dense"
                    label="Last Name"
                    type="text"
                    fullWidth
                    value={newEmployeeLastName}
                    onChange={handleNewEmployeeLastNameChange}
                />
                <TextField
                    margin="dense"
                    label="Employee Number"
                    type="text"
                    fullWidth
                    value={newEmployeeNumber}
                    onChange={handleNewEmployeeNumberChange}
                />
            </DialogContent>
            <DialogActions>
                <Button variant="text" onClick={closeEmployeeDialog} color="primary">
                    Cancel
                </Button>
                <Button variant="contained" onClick={() => addNewEmployeeAndCloseDialog()}
                        color="primary">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

AddManagerPositionDialog.propTypes = {
    employeeDialogOpen: PropTypes.bool.isRequired,
    closeEmployeeDialog: PropTypes.func.isRequired,
    newEmployeeFirstName: PropTypes.string.isRequired,
    handleNewEmployeeFirstNameChange: PropTypes.func.isRequired,
    newEmployeeLastName: PropTypes.string.isRequired,
    handleNewEmployeeLastNameChange: PropTypes.func.isRequired,
    newEmployeeNumber: PropTypes.string.isRequired,
    handleNewEmployeeNumberChange: PropTypes.func.isRequired,
    addNewEmployeeAndCloseDialog: PropTypes.func.isRequired,
};


export default AddManagerPositionDialog;
