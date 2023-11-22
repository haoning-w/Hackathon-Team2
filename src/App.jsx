import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Test from "./pages/Test";
import AppLayout from "./ui/AppLayout";

import { Provider } from "react-redux";
import store from "./store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Toast from "./ui/Toast";
import Home from "./pages/Home";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route element={<AppLayout />}>
              <Route index replace element={<Navigate to="home" />} />
              <Route path="/home" element={<Home />} />
              <Route path="/test" element={<Test />} />
            </Route>
          </Routes>
        </BrowserRouter>
        <Toast />
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
