import * as React from 'react';
import PropTypes from 'prop-types';
import {alpha} from '@mui/material/styles';
import {format} from 'date-fns';
import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel,
    Toolbar,
    IconButton,
    Tooltip,
    FormControlLabel,
    Typography,
    Avatar,
    TextField,
    InputAdornment,
    Paper,
    Grid
} from '@mui/material';

import {visuallyHidden} from '@mui/utils';
import {Button} from '@mui/material';

import {useSelector, useDispatch} from 'react-redux';
import CustomCheckbox from 'src/components/forms/theme-elements/CustomCheckbox';
import {IconSearch, IconTrash, IconUnlink} from '@tabler/icons';
import sourceIcons from "../SourceIcons";
import {useEffect} from "react";

import {GET_KNOWLEDGE_SOURCES, DELETE_SOURCE_CONNECTION} from "src/services/KnowledgeSourcesService"

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    {
        id: 'name',
        numeric: false,
        disablePadding: false,
        label: 'Source name',
    },
    {
        id: 'type',
        numeric: false,
        disablePadding: false,
        label: 'Type',
    },

    {
        id: 'last-update',
        numeric: false,
        disablePadding: false,
        label: 'Last update',
    },
    {
        id: 'status',
        numeric: false,
        disablePadding: false,
        label: 'Status',
    },

    {
        id: 'action',
        numeric: false,
        disablePadding: false,
        label: '',
    },
];

function EnhancedTableHead(props) {
    const {onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort} = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <CustomCheckbox
                        color="primary"
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputprops={{
                            'aria-label': 'select all desserts',
                        }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
    const {numSelected, handleSearch, search} = props;

    return (
        <Toolbar
            sx={{
                pl: {sm: 2},
                pr: {xs: 1, sm: 1},
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            }}
        >
            {numSelected > 0 ? (
                <Typography sx={{flex: '1 1 100%'}} color="inherit" variant="subtitle2" component="div">
                    {numSelected} selected
                </Typography>
            ) : (
                <Grid container justifyContent="space-between" alignItems="center">
                    <Grid item xs={9}>
                        <TextField
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <IconSearch size="1.1rem"/>
                                    </InputAdornment>
                                ),
                            }}
                            placeholder="Search sources"
                            size="small"
                            onChange={handleSearch}
                            value={search}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <Button variant="contained" color="primary">
                            Connect source
                        </Button>
                    </Grid>
                </Grid>
            )}

            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton>
                        <IconTrash width="18"/>
                    </IconButton>
                </Tooltip>
            ) : (
                <>
                </>
            )}
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

const AgentSourcesTable = () => {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('status');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [rows, setRows] = React.useState([]);
    const [search, setSearch] = React.useState('');

    const dispatch = useDispatch();
    const agent_sources = useSelector((state) => state.agentSourcesReducer.sources);
    const agents = useSelector((state) => state.agentsReducer.agents);
    const selected_agent_id = useSelector((state) => state.agentsReducer.selected_agent_id);
    const selectedAgent = agents.find(x => x.id === selected_agent_id);

    useEffect(() => {
        console.log(selectedAgent.knowledge_sources)
        setRows(selectedAgent.knowledge_sources)
    }, [selectedAgent]);

    const handleSearch = (event) => {
        const filteredRows = agent_sources.filter((row) => {
            return row.configs.info.name.toLowerCase().includes(event.target.value);
        });
        setSearch(event.target.value);
        setRows(filteredRows);
    };

    // This is for the sorting
    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    // This is for select all the row
    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n) => n.id);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    // This is for the single row sleect
    const handleSingleCheckboxClick = (event, id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const onUnlinkClick = (source_id) => {
        if (selected_agent_id) {
            dispatch(DELETE_SOURCE_CONNECTION(source_id, selected_agent_id));
        } else {
            console.log('No selected agent ID');
        }
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;



    return (
        <Box>
            <Box>
                <EnhancedTableToolbar
                    numSelected={selected.length}
                    search={search}
                    handleSearch={(event) => handleSearch(event)}
                />
                <Paper variant="outlined" sx={{mx: 2, mt: 1}}>
                    <TableContainer>
                        <Table
                            sx={{minWidth: 750}}
                            aria-labelledby="tableTitle"
                            size={'medium'}
                        >
                            <EnhancedTableHead
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                onSelectAllClick={handleSelectAllClick}
                                onRequestSort={handleRequestSort}
                                rowCount={rows.length}
                            />
                            <TableBody>
                                {stableSort(rows, getComparator(order, orderBy))
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row, index) => {
                                        const isItemSelected = isSelected(row.id);
                                        const labelId = `enhanced-table-checkbox-${index}`;
                                        const IconComponent = sourceIcons[row.type] || null; // Add this line

                                        return (
                                            <TableRow
                                                hover
                                                role="checkbox"
                                                aria-checked={isItemSelected}
                                                tabIndex={-1}
                                                key={row.configs.info.name}
                                                selected={isItemSelected}
                                            >
                                                <TableCell padding="checkbox">
                                                    <CustomCheckbox
                                                        color="primary"
                                                        onClick={(event) => handleSingleCheckboxClick(event, row.id)}
                                                        checked={isItemSelected}
                                                        inputprops={{
                                                            'aria-labelledby': labelId,
                                                        }}
                                                    />
                                                </TableCell>

                                                <TableCell>
                                                    <Box display="flex" alignItems="center">
                                                        <Box
                                                            sx={{
                                                                ml: 2,
                                                            }}
                                                        >
                                                            <Typography variant="h6" fontWeight="600">
                                                                {row.configs.info.name}
                                                            </Typography>
                                                            <Typography color="textSecondary" variant="subtitle2">
                                                                {row.category}
                                                            </Typography>
                                                        </Box>
                                                    </Box>
                                                </TableCell>

                                                <TableCell>
                                                    <Box display="flex" alignItems="center">
                                                        <IconComponent
                                                            sx={{
                                                                width: 30,
                                                                height: 30,
                                                                borderRadius: '100%',
                                                            }}
                                                        ></IconComponent>
                                                        <Typography
                                                            color="textSecondary"
                                                            variant="subtitle2"
                                                            sx={{
                                                                ml: 1,
                                                            }}
                                                        >
                                                            {row.type}
                                                        </Typography>
                                                    </Box>
                                                </TableCell>

                                                <TableCell>
                                                    <Typography>
                                                        {row.last_trained_at ? format(new Date(row.last_trained_at), 'dd MMMM HH:mm') : 'NA'}
                                                    </Typography>
                                                </TableCell>


                                                <TableCell>
                                                    <Box display="flex" alignItems="center">
                                                        <Box
                                                            sx={{
                                                                backgroundColor: row.status === "enabled"
                                                                    ? (theme) => theme.palette.success.main
                                                                    : (theme) => theme.palette.error.main,
                                                                borderRadius: '100%',
                                                                width: 10,
                                                                height: 10,
                                                                marginRight: 1, // Optional: add some space between the circle and the text
                                                            }}
                                                        />

                                                    </Box>
                                                </TableCell>

                                                <TableCell>
                                                    <Button
                                                        onClick={() => onUnlinkClick(row.id)}
                                                    >
                                                        Disconnect
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        )
                                            ;
                                    })}
                                {emptyRows > 0 && (
                                    <TableRow
                                        style={{
                                            height: (53) * emptyRows,
                                        }}
                                    >
                                        <TableCell colSpan={6}/>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>

            </Box>
        </Box>
    );
};

export default AgentSourcesTable;
