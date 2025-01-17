import { useState } from "react";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { Divider, Input, Typography } from "antd";
import { ToastContainer, toast } from "react-toastify";
import SizeChart from "./components/SizeChart";
const { Title, Text } = Typography;
const { Search } = Input;

function App() {
	const [size, setSize] = useState(undefined);

	const generateFile = () => {
		if (isNaN(size) || size <= 0) {
			toast.error("Please enter a valid size in bytes");
			return;
		}
		try {
			// Create a buffer of the specified size
			const buffer = new ArrayBuffer(size);
			const blob = new Blob([buffer], { type: "application/octet-stream" });

			// Create a download link and simulate a click
			const link = document.createElement("a");
			link.href = URL.createObjectURL(blob);
			link.download = `filer-${size}-bytes.bin`;
			document.body.appendChild(link); // Append link to the body
			link.click(); // Programmatically click the link
			document.body.removeChild(link); // Remove link from the body

			// Clean up
			URL.revokeObjectURL(link.href);
		} catch (error) {
			toast.error("Size too large for your browser. Try something smaller.");
			console.error(error);
		}
	};

	return (
		<>
			<Title>📁 Filer - Generate files of any size</Title>
			<Divider />
			<Search
				value={size}
				onChange={(e) => setSize(e.target.value)}
				size="large"
				addonBefore="Size (in bytes)"
				enterButton="Generate"
				placeholder="1024"
				onSearch={generateFile}
				type="number"
				autoFocus
			/>
			<Divider />
			<SizeChart size={size} />
			<Divider />
			<Text type="secondary">
				An{" "}
				<a href="https://www.linkedin.com/in/anushibinj/" target="_blank">
					anushibinj
				</a>{" "}
				side project // Fork me on{" "}
				<a href="https://github.com/anushibin007/filer" target="_blank">
					GitHub
				</a>
			</Text>
			<ToastContainer
				position="bottom-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				pauseOnHover
				theme="light"
			/>
		</>
	);
}

export default App;
