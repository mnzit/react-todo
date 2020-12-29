import * as React from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {ViewTodo} from "./view-todo";

export class Routes extends React.Component {
    render() {
        return (
            <div>
                <BrowserRouter>
                    <Switch>
                        <Route path="/" exact>
                            <ViewTodo/>
                        </Route>
                    </Switch>
                </BrowserRouter>
            </div>
        );
    };
};
