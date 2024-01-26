import { Box, useMediaQuery } from '@mui/material';
import { useState, type FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../../components/Sidebar/Sidebar';
import { Navbar } from '../../components/Navbar/Navbar';

type LayoutProps = object;

export const Layout: FC<LayoutProps> = () => {
	const isNonMobile = useMediaQuery('(min-width:600px)');
	const [isSidebarOpen, setIsSidebarOpen] = useState(true);
	return (
		<Box display={isNonMobile ? 'flex' : 'block'} width='100%' height='100%'>
			<Sidebar
				isNonMobile={isNonMobile}
				drawerWidth='250px'
				isSidebarOpen={isSidebarOpen}
				setIsSidebarOpen={setIsSidebarOpen}
			/>
			<Box>
				<Navbar
					isSidebarOpen={isSidebarOpen}
					setIsSidebarOpen={setIsSidebarOpen}
				></Navbar>
				<Outlet />
			</Box>
		</Box>
	);
};
