# json-flow

A React-based JSON visualization tool that transforms JSON data into an interactive node graph. Built with React Flow and Vite for fast visualization of JSON structures.

## Features

### Core Functionality
- **JSON Visualization**: 
	- Paste any valid JSON and visualize it as an interactive node graph
	- Automatic layout with top-to-bottom hierarchy
	- Color-coded nodes by type:
		- Objects/Keys (Purple)
		- Arrays/Indices(Green)
		- Primitive values (Orange)

### Navigation & Search
- **Path-based Node Search**:
	- Search nodes using JSON path notation (starting with `$`)
	- Example paths:
		- `$.users` - finds the users object/array
		- `$.users.0` - finds the first index in users array
		- `$.users.0.name` - finds the name key of user
	- Highlights matched node in yellow

### Interactive Features
- Node tooltips showing full JSON paths
- Draggable nodes for custom layout


## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```
Hosted Link: https://vidur0012.github.io/json-flow/
