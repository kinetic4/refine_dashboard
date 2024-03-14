import { Authenticated, GitHubBanner, Refine, WelcomePage } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import { useNotificationProvider } from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";

import { dataProvider, liveProvider } from "./Providers/data";
import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { App as AntdApp,  } from "antd";
import Layout from "./component/layout";

import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { authProvider } from "./Providers";
import { Home, ForgotPassword, Login, Register, CompanyList } from './pages';
import { resources } from "./config/resources";
import Create from "./pages/compony/create";
import Edit from "./pages/compony/edit";
import List from "./pages/Task/List";





function App() {
  return (
    <BrowserRouter>
      
      <RefineKbarProvider>
          <AntdApp>
            <DevtoolsProvider>
              <Refine
                dataProvider={dataProvider}
                liveProvider={liveProvider}
                notificationProvider={useNotificationProvider}
                routerProvider={routerBindings}
                authProvider={authProvider}
                resources={resources}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                  useNewQueryKeys: true,
                  projectId: "qJnqn0-5MaLQa-3f4mDh",
                  liveMode: "auto",
                }}
              >
                <Routes>
                  <Route path="/register" element={<Register />} />  
                  <Route path="/login" element={<Login />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} 
                  />
                  <Route
                  element = {
                  <Authenticated
                    key= "Authenticated-layout"
                    fallback = {<CatchAllNavigate to="/login"/>}
                    >
                  <Layout>
                    <Outlet />
                  </Layout>
                  </Authenticated>
                  }>
                    <Route index element={<Home />} />
                    <Route path="/companies">
                    <Route index element = {<CompanyList />} />
                    <Route path="new" element = {<Create/>} /> 
                    <Route path="edit/:id" element = {<Edit/>} /> 
                    </Route>
                    <Route path="/tasks">
                      <Route  index element= {<List />}/>
                    </Route>
                  </Route>
                </Routes>
                <RefineKbar />
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
              <DevtoolsPanel />
            </DevtoolsProvider>
          </AntdApp>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
