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
import PropTypes from 'prop-types';


const AddManagerPositionDialog = (props) => {
    const {
        managerDialogOpen,
        closeManagerDialog,
        newPositionNumber,
        handlePositionNumberChange,
        addManagerPositionAndCloseEmployeeRenameDialog,
    } = props;

    return (
        <Dialog open={managerDialogOpen} onClose={closeManagerDialog}>
            <DialogTitle>Add Manager Position</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please enter the new position number for the manager:
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Position Number"
                    type="text"
                    fullWidth
                    value={newPositionNumber}
                    onChange={handlePositionNumberChange}
                />
            </DialogContent>
            <DialogActions>
                <Button variant="text" onClick={closeManagerDialog} color="primary">
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    onClick={() => addManagerPositionAndCloseEmployeeRenameDialog()}
                    color="primary"
                >
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

AddManagerPositionDialog.propTypes = {
    managerDialogOpen: PropTypes.bool.isRequired,
    closeManagerDialog: PropTypes.func.isRequired,
    newPositionNumber: PropTypes.string.isRequired,
    handlePositionNumberChange: PropTypes.func.isRequired,
    addManagerPositionAndCloseEmployeeRenameDialog: PropTypes.func.isRequired,
};

export default AddManagerPositionDialog;
