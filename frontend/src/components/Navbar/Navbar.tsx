import type { FC } from 'react';
import { useTheme } from '@mui/material/styles';
import { AppBar, IconButton, InputBase, Toolbar } from '@mui/material';
import {
	LightModeOutlined,
	DarkModeOutlined,
	Menu as MenuIcon,
	Search,
	SettingsOutlined,
} from '@mui/icons-material';
import FlexBetween from '../FlexBetween';
import { useStore } from '../../store/globalStore'; // Asume que este es el archivo donde creaste tu store con Zustand

type NavbarProps = {
	isSidebarOpen: boolean;
	setIsSidebarOpen: (isOpen: boolean) => void;
};

export const Navbar: FC<NavbarProps> = ({
	isSidebarOpen,
	setIsSidebarOpen,
}) => {
	const toggleMode = useStore(state => state.toggleMode);
	const theme = useTheme();

	return (
		<AppBar
			sx={{
				position: 'static',
				background: 'none',
				boxShadow: 'none',
			}}
		>
			<Toolbar sx={{ justifyContent: 'space-between' }}>
				{/* LEFT SIDE */}
				<FlexBetween>
					<IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
						<MenuIcon />
					</IconButton>
					<FlexBetween
						sx={{
							borderRadius: '9px',
							gap: '3rem',
							p: '0.1rem 1.5rem',
						}}
					>
						<InputBase placeholder='Search' />
						<IconButton>
							<Search />
						</IconButton>
					</FlexBetween>
				</FlexBetween>
				{/* RIGTH SIDE */}
				<FlexBetween gap='1.5rem'>
					<IconButton onClick={toggleMode}>
						{theme.palette.mode === 'dark' ? (
							<DarkModeOutlined sx={{ fontSize: '25px' }} />
						) : (
							<LightModeOutlined sx={{ fontSize: '25px' }} />
						)}
					</IconButton>
					<IconButton>
						<SettingsOutlined sx={{ fontSize: '25px' }} />
					</IconButton>
				</FlexBetween>
			</Toolbar>
		</AppBar>
	);
};
