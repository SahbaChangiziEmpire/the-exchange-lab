import React, {useEffect, useState} from "react";
import {
    Button, Chip, IconButton, Tooltip,
} from "@mui/material";
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import UpdateEmployeeNameDialog from "./UpdateEmployeeNameDialog";
import AddManagerPositionDialog from "./AddManagerPositionDialog";
import AddNewEmployeeDialog from "./AddNewEmployeeDialog";
import {
    addManagerPosition,
    createEmployeeAndAssignPosition,
    fetchOrganizationHierarchy,
    removeEmployeeFromPosition,
    updateEmployeeName
} from "../service/organizationService";
import {useSnackbar} from 'notistack';

/**
 * React component for displaying the organization hierarchy and providing
 * functionality to update employee names, add new managers or employees, and
 * remove employees from positions.
 *
 * @returns {JSX.Element} The rendered component.
 */
const Organization = () => {
    const [organizationHierarchy, setOrganizationHierarchy] = useState([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
    const [newFirstName, setNewFirstName] = useState("");
    const [newLastName, setNewLastName] = useState("");
    const [managerDialogOpen, setManagerDialogOpen] = useState(false);
    const [selectedParentPositionId, setSelectedParentPositionId] = useState(null);
    const [newPositionNumber, setNewPositionNumber] = useState("");
    const [employeeDialogOpen, setEmployeeDialogOpen] = useState(false);
    const [selectedPositionId, setSelectedPositionId] = useState(null);
    const [newEmployeeFirstName, setNewEmployeeFirstName] = useState("");
    const [newEmployeeLastName, setNewEmployeeLastName] = useState("");
    const [newEmployeeNumber, setNewEmployeeNumber] = useState("");
    const [expanded, setExpanded] = useState([]);
    const {enqueueSnackbar} = useSnackbar();

    /**
     * Fetches the organization hierarchy from the server and sets it in state.
     */
    const refreshOrganizationHierarchy = async () => {
        try {
            const response = await fetchOrganizationHierarchy();
            setOrganizationHierarchy(response);
        } catch (error) {
            enqueueSnackbar('Error refreshing organization hierarchy', {variant: 'error'});
        }
    };

    // Fetch the organization hierarchy on initial mount.
    useEffect(() => {
        refreshOrganizationHierarchy();
    }, []);


    // Dialog functions
    const openDialog = (employeeId, firstName, lastName) => {
        setSelectedEmployeeId(employeeId);
        setNewFirstName(firstName);
        setNewLastName(lastName);
        setDialogOpen(true);
    };

    const closeDialog = () => {
        setDialogOpen(false);
        setSelectedEmployeeId(null);
        setNewFirstName('');
        setNewLastName('');
    };

    const updateNameAndCloseDialog = () => {
        updateEmployeeName(selectedEmployeeId, newFirstName, newLastName)
            .then(async (response) => {
                closeDialog();
                enqueueSnackbar(response.message, {variant: 'success'});
                await refreshOrganizationHierarchy();
            }).catch((error) => {
            enqueueSnackbar(error.message, {variant: 'error'});
        });
    };

    const handleFirstNameChange = (event) => {
        setNewFirstName(event.target.value);
    };

    const handleLastNameChange = (event) => {
        setNewLastName(event.target.value);
    };

// Manager Dialog functions
    const openManagerDialog = (positionId) => {
        setManagerDialogOpen(true);
        setSelectedParentPositionId(positionId);
    };

    const closeManagerDialog = () => {
        setManagerDialogOpen(false);
        setNewPositionNumber('');
    };

    const handlePositionNumberChange = (event) => {
        setNewPositionNumber(event.target.value);
    };

    const addManagerPositionAndCloseDialog = () => {
        addManagerPosition(newPositionNumber, selectedParentPositionId)
            .then(async (response) => {
                closeManagerDialog();
                enqueueSnackbar(response.message, {variant: 'success'});
                await refreshOrganizationHierarchy();
            })
            .catch((error) => {
                enqueueSnackbar(error.message, {variant: 'error'});
            });
    };

    // Employee Dialog functions
    const openAddNewEmployeeDialog = (positionId) => {
        setEmployeeDialogOpen(true);
        setSelectedPositionId(positionId);
    };

    const closeAddNewEmployeeDialog = () => {
        setEmployeeDialogOpen(false);
        setNewEmployeeFirstName('');
        setNewEmployeeLastName('');
        setNewEmployeeNumber('');
    };

    const handleNewEmployeeFirstNameChange = (event) => {
        setNewEmployeeFirstName(event.target.value);
    };

    const handleNewEmployeeLastNameChange = (event) => {
        setNewEmployeeLastName(event.target.value);
    };

    const handleNewEmployeeNumberChange = (event) => {
        setNewEmployeeNumber(event.target.value);
    };

    const addNewEmployeeAndCloseDialog = () => {
        createEmployeeAndAssignPosition(newEmployeeFirstName, newEmployeeLastName, newEmployeeNumber, selectedPositionId)
            .then(async (response) => {
                closeAddNewEmployeeDialog();
                enqueueSnackbar(response.message, {variant: 'success'});
                await refreshOrganizationHierarchy();
            })
            .catch((error) => {
                enqueueSnackbar(error.message, {variant: 'error'});
            });
    };

    // Helper functions
    const getAllPositionIds = (positions) => {
        let ids = [];
        positions.forEach((position) => {
            ids.push(String(position.position_id));
            if (position.children) {
                ids = ids.concat(getAllPositionIds(position.children));
            }
        });
        return ids;
    };

    const handleExpandCollapse = () => {
        if (expanded.length === 0) {
            setExpanded(getAllPositionIds(organizationHierarchy));
        } else {
            setExpanded([]);
        }
    };


    const renderHierarchy = (position) => {
        const SENIOR_MANAGER_POSITION = "Senior Manager";
        const label = (<div>
            <strong>Position:</strong> {position.position_title} ({position.position_number}) {" - "}
            {position.employee ? (<span>
                            <strong>Assigned Employee:</strong> {position.employee.first_name} {position.employee.last_name} ({position.employee.employee_number})
                        </span>) : (<Chip label="Vacant" color="primary" variant="outlined"/>)}
            {position.employee && (<>
                <Tooltip title="Update Employee Name">
                    <IconButton
                        onClick={() => openDialog(position.employee?.employee_id, position.employee.first_name, position.employee.last_name)}>
                        <EditIcon/>
                    </IconButton>
                </Tooltip>
                <Tooltip title="Remove Employee">
                    <IconButton
                        onClick={() => {
                            removeEmployeeFromPosition(position.employee?.employee_id).then(async (response) => {
                                await refreshOrganizationHierarchy();
                                enqueueSnackbar(response.message, {variant: 'success'});
                            })
                        }}>
                        <DeleteIcon/>
                    </IconButton>
                </Tooltip>
            </>)}
            {position.position_title === SENIOR_MANAGER_POSITION && (<Tooltip title="Add Manager Position">
                <IconButton variant="outlined" color="primary"
                            onClick={() => openManagerDialog(position.position_id)}><AddCircleIcon/></IconButton></Tooltip>)}
            {!position.employee && (<Tooltip title="Assign Employee"><IconButton variant="outlined"
                                                                                 onClick={() => openAddNewEmployeeDialog(position.position_id)}><AssignmentIndIcon/></IconButton></Tooltip>)}
        </div>);
        return (<TreeItem key={position.position_id} nodeId={String(position.position_id)} label={label}>
            {position.children && position.children.length > 0 && position.children.map((child) => renderHierarchy(child))}
        </TreeItem>);
    };

    return (<div>
        <h1>Organization Hierarchy</h1>
        <Button onClick={handleExpandCollapse}>{expanded.length === 0 ? 'Expand all' : 'Collapse all'}</Button>
        <TreeView
            expanded={expanded}
            onNodeToggle={(event, nodeIds) => {
                setExpanded(nodeIds);
            }}
            defaultCollapseIcon={<ExpandMoreIcon/>}
            defaultExpandIcon={<ChevronRightIcon/>}
        >
            {organizationHierarchy.map((position) => renderHierarchy(position))}
        </TreeView>
        <UpdateEmployeeNameDialog
            dialogOpen={dialogOpen}
            closeDialog={closeDialog}
            newFirstName={newFirstName}
            newLastName={newLastName}
            handleFirstNameChange={handleFirstNameChange}
            handleLastNameChange={handleLastNameChange}
            updateNameAndCloseDialog={updateNameAndCloseDialog}
        />
        <AddManagerPositionDialog
            managerDialogOpen={managerDialogOpen}
            closeManagerDialog={closeManagerDialog}
            newPositionNumber={newPositionNumber}
            handlePositionNumberChange={handlePositionNumberChange}
            addManagerPositionAndCloseDialog={addManagerPositionAndCloseDialog}
        />
        <AddNewEmployeeDialog
            employeeDialogOpen={employeeDialogOpen}
            closeEmployeeDialog={closeAddNewEmployeeDialog}
            newEmployeeFirstName={newEmployeeFirstName}
            handleNewEmployeeFirstNameChange={handleNewEmployeeFirstNameChange}
            newEmployeeLastName={newEmployeeLastName}
            handleNewEmployeeLastNameChange={handleNewEmployeeLastNameChange}
            newEmployeeNumber={newEmployeeNumber}
            handleNewEmployeeNumberChange={handleNewEmployeeNumberChange}
            addNewEmployeeAndCloseDialog={addNewEmployeeAndCloseDialog}
        />
    </div>);
}


export default Organization;
