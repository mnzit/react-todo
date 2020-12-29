import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import {Button, Chip} from "@material-ui/core";
import {STORAGE_KEY} from "./systemConstant";
import TextField from '@material-ui/core/TextField';
import {
    Paper,
    Grid,
} from '@material-ui/core';
import ListItemText from '@material-ui/core/ListItemText';
export class ViewTodo extends React.Component {

    constructor(props) {
        super(props);
        let todos =  JSON.parse(localStorage.getItem(STORAGE_KEY));
        if (todos) {
            this.state = {todos}
        } else {
            localStorage.setItem(STORAGE_KEY, JSON.stringify([]))
            todos = JSON.parse(localStorage.getItem(STORAGE_KEY));
            this.state = {todos}
        }
    }

    classes = makeStyles((theme) => ({
        root: {
            width: '100%',
            maxWidth: 360,
            backgroundColor: theme.palette.background.paper,
        }
    }));

    handleChange = (event) => {
        this.setState({
            ...this.state,
            current: {
                ...this.state.current,
                [event.target.name]: event.target.value
            }
        })
    }

    handleDelete = (id) => {
        let todos = this.state.todos.filter((todo) => todo.id != id);
        this.setState({
            todos
        });
        localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
    };

    handleClick = (id) => {
        console.info('You clicked the Chip.' + id);
    };

    handleCreate = () => {
        let current = this.state.current
        let todos = JSON.parse(localStorage.getItem(STORAGE_KEY));
        todos.push({...current, id: new Date()});

        this.setState({
            todos
        });
        localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
    }

    render() {
        return (
            <div>
                <Paper style={{padding: 40}}>
                    <Grid container alignItems="flex-start" spacing={2}>
                        <Grid item xs={4}>
                            <TextField id="standard-basic" label="Todo" name="todo" onChange={this.handleChange}/>
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                id="datetime-local"
                                label="Date"
                                type="datetime-local"
                                name="date"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={this.handleChange}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <Button variant="contained" color="primary" onClick={this.handleCreate}>
                                Create
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
                <form autoComplete="off">


                </form>
                <List className={this.classes.root}>
                    {this.state.todos.map((item) => (
                        <ListItem>
                            <Chip style={{paddingTop: "50px", paddingBottom: "50px", width: "100%"}}
                                  label=<ListItemText primary={item.todo} secondary={item.date}/>
                            onClick={() => this.handleClick(item.id)}
                            onDelete={() => this.handleDelete(item.id)}
                            variant="outlined"
                            />
                        </ListItem>
                    ))}
                </List>
            </div>
        );
    };
};
