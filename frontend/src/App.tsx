import './App.css';
import { CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useMemo } from 'react';
import { themeSettings } from './utilities/theme.js';
import { useStore } from './store/globalStore.js';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './pages/Layout/Layout.js';
import { Dashboard } from './pages/Dashboard/Dashboard.js';
import { CreatePost } from './pages/CreatePost/CreatePost.js';
import { ListPosts } from './components/ListPosts/ListPosts';

function App() {
	const mode = useStore(state => state.mode);
	const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
	return (
		<div>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<Routes>
					<Route element={<Layout />}>
						<Route path='/' element={<Navigate to='/home' replace />} />
						<Route path='home' element={<Dashboard />} />
						<Route path='publicar' element={<CreatePost />} />
						<Route path='explorar' element={<ListPosts />} />
					</Route>
				</Routes>
			</ThemeProvider>
		</div>
	);
}

export default App;
