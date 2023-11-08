import React from 'react';
import './App.css';
import { BrowserRouter, Navigate, Route, Routes as Switch } from "react-router-dom";
import routes from './routes';

function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <React.Suspense>
            <Switch>
              {
                routes.map((route, index) => {
                  return (
                    <Route
                      key={index}
                      path={route.path}
                      element={<route.component/>}
                    />
                  )
                })
              }
            </Switch>
          </React.Suspense>
        </BrowserRouter>
    </div>
  );
}

export default App;
