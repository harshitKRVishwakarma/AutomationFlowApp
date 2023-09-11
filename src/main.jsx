import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

/**
 * React flow imports
 */
import { ReactFlowProvider } from "reactflow";

/**
 * Redux imports
 */
import { Provider } from "react-redux";
import store from "./store/index.js";

ReactDOM.createRoot(document.getElementById("root")).render(
	<ReactFlowProvider>
		<Provider store={store}>
			<App />
		</Provider>
	</ReactFlowProvider>
);
