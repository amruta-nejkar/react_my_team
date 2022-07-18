import * as React from 'react';
import {
    styled,
    Card, CardHeader,
    CardContent, Avatar, IconButton, Typography, InputBase, alpha, TablePagination, Box
} from '@mui/material';
// import Pagination from '@mui/material/Pagination';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Data } from './Data';
import { red } from '@mui/material/colors';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import ShareIcon from '@mui/icons-material/Share';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Search } from '@mui/icons-material';
// import { Search } from '@mui/icons-material';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

const options = [
    'Edit',
    'Delete'

];

const ITEM_HEIGHT = 48;
export const SearchBar = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

export const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));
const Home = () => {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [rows, setRows] = React.useState(Data);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(4)
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const requestSearch = (title) => {
        let val = title?.target?.value;
        const filteredVal = Data.filter(({ title }) => title.toLocaleLowerCase().includes(val.toLocaleLowerCase()))
        setRows(filteredVal);
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    };

    const handleChangeRowsPerPage = (e) => {
        setRowsPerPage(e.target.value, 10);
        setPage(0)
    }
    return (
        <>
            <SearchBar style={{ border: '1px solid black', width: '200px', marginTop: '20px', marginLeft: '90px'}}>
                <SearchIconWrapper>
                    <Search />
                </SearchIconWrapper>
                <StyledInputBase
                    id="outlined-basic"
                    label="search"
                    variant="outlined"
                    placeholder="Search By title"
                    inputProps={{ 'aria-label': 'search' }}
                    onChange={(searchedVal) => requestSearch(searchedVal)}
                />
            </SearchBar>
            <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' ,marginLeft: '70px' }}>
                {rows?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map(({ title, date, avtar }) => (
                        <>
                            <Card sx={{ maxWidth: 230, margin: 3 }}>
                                <CardHeader
                                    avatar={<Avatar aria-label="recipe" sx={{ bgcolor: red[500] }} >
                                        {avtar}
                                    </Avatar>}
                                    action={
                                        <>
                                            <IconButton
                                                aria-label="more"
                                                id="long-button"
                                                aria-controls={open ? 'log-menu' : undefined}
                                                aria-expanded={open ? 'true' : undefined}
                                                aria-haspopup="true"
                                                onClick={handleClick}
                                            >
                                                <MoreVertIcon />
                                            </IconButton>
                                            <Menu
                                                id="log-menu"
                                                MenuListProps={{
                                                    'aria-labelledby': 'long-button',
                                                }}
                                                anchorEl={anchorEl}
                                                open={open}
                                                onClose={handleClose}
                                                PaperProps={{
                                                    style: {
                                                        maxHeight: ITEM_HEIGHT * 4.5,
                                                        width: '10ch',
                                                    },
                                                }}
                                            >
                                                {options.map((option) => (
                                                    <MenuItem key={option} selected={option === 'Edit'} onClick={handleClose}>
                                                        {option}
                                                    </MenuItem>
                                                ))}
                                            </Menu></>}
                                    title={title}
                                    subheader={date} /><CardContent>
                                    <Typography variant="body2" color="text.secondary">
                                        This impressive paella is a perfect party dish and a fun meal to cook
                                        together with your guests. Add 1 cup of frozen peas along with the mussels,
                                        if you like.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </>
                    ))}

            </div>
            <TablePagination sx={{mr:15 ,position:'relative'}}
                component="div"
                count={Data?.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[4, 8, 12]}
            />
        </>
    );
}

export default Home;