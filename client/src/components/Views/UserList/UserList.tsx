import React, { useEffect } from 'react';
import Main from "@components/Layout/Main/Main";
import { fetchUsers, UsersState } from "@redux/modules/users";
import { useDispatch } from "react-redux";
import { useTypedSelector } from 'reduxTools/store';
//import { User } from 'shared/types/User';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

interface Column {
  id: 'id' | 'firstName' | 'lastName' | 'email' | 'role' | 'createdAt' | 'updatedAt';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: Column[] = [
  { id: 'id', label: 'ID', minWidth: 170 },
  { id: 'firstName', label: 'First\u00a0Name', minWidth: 100 },
  {
    id: 'lastName',
    label: 'Last\u00a0Name',
    minWidth: 170,
    //align: 'right',
    //format: (value: number) => value.toLocaleString(),
  },
  {
    id: 'email',
    label: 'Email',
    minWidth: 170,
    //align: 'right',
    //format: (value: number) => value.toLocaleString(),
  },
  {
    id: 'role',
    label: 'Role',
    minWidth: 170,
    //align: 'right',
    //format: (value: number) => value.toFixed(2),
  },
  {
    id: 'createdAt',
    label: 'Date\u00a0Created',
    minWidth: 170,
    //align: 'right',
    //format: (value: number) => value.toFixed(2),
  },
  {
    id: 'updatedAt',
    label: 'Date\u00a0Updated',
    minWidth: 170,
    //align: 'right',
    //format: (value: number) => value.toFixed(2),
  },
];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

const UserList: React.FC = () => {

  const dispatch = useDispatch();
  const usersState: UsersState = useTypedSelector(state => state.users);
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  useEffect(() => {
    fetchUsers(dispatch);
  }, [dispatch])

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const rows = usersState.users;
  return (
    <Main>
      {rows &&
        <Paper className={classes.root}>
          <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map(column => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      {columns.map(column => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number' ? column.format(value) : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
      }
    </Main>
  );
}

export default UserList;