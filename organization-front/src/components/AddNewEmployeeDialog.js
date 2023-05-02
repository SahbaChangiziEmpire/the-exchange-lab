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
        addNewEmployeeAndCloseEmployeeRenameDialog,
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
                    required
                    margin="dense"
                    label="First Name"
                    type="text"
                    fullWidth
                    value={newEmployeeFirstName}
                    onChange={handleNewEmployeeFirstNameChange}
                />
                <TextField
                    margin="dense"
                    required
                    label="Last Name"
                    type="text"
                    fullWidth
                    value={newEmployeeLastName}
                    onChange={handleNewEmployeeLastNameChange}
                />
                <TextField
                    margin="dense"
                    required
                    label="Employee Number"
                    fullWidth
                    value={newEmployeeNumber}
                    onChange={handleNewEmployeeNumberChange}
                    type="number"
                />
            </DialogContent>
            <DialogActions>
                <Button variant="text" onClick={closeEmployeeDialog} color="primary">
                    Cancel
                </Button>
                <Button variant="contained" onClick={() => addNewEmployeeAndCloseEmployeeRenameDialog()}
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
    addNewEmployeeAndCloseEmployeeRenameDialog: PropTypes.func.isRequired,
};


export default AddManagerPositionDialog;
