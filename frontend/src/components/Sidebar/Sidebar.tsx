import { FC } from 'react';
import {
	Box,
	Drawer,
	IconButton,
	Typography,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
} from '@mui/material';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import FlexBetween from '../FlexBetween';
import {
	ChevronLeft,
	ChevronRightOutlined,
	Groups2Outlined,
	HomeOutlined,
	ShoppingCartOutlined,
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles'; // Importar useTheme

type NavItem = {
	text: string;
	icon: JSX.Element | null;
};

const navItems: NavItem[] = [
	{
		text: 'Home',
		icon: <HomeOutlined />,
	},
	{
		text: 'Panel de Administración',
		icon: null,
	},
	{
		text: 'Publicar',
		icon: <Groups2Outlined />,
	},
	{
		text: 'Explorar',
		icon: <ShoppingCartOutlined />,
	},
];

type SidebarProps = {
	isNonMobile: boolean;
	drawerWidth: string;
	isSidebarOpen: boolean;
	setIsSidebarOpen: (isOpen: boolean) => void;
};

export const Sidebar: FC<SidebarProps> = ({
	isNonMobile,
	drawerWidth,
	isSidebarOpen,
	setIsSidebarOpen,
}) => {
	const { pathname } = useLocation();
	const [active, setActive] = useState('');
	const navigate = useNavigate();
	const theme: any = useTheme(); // Utilizar useTheme para obtener el tema

	useEffect(() => {
		setActive(pathname.substring(1));
	}, [pathname]);

	return (
		<Box component='nav'>
			{isSidebarOpen && (
				<Drawer
					open={isSidebarOpen}
					onClose={() => setIsSidebarOpen(false)}
					variant='persistent'
					anchor='left'
					sx={{
						width: drawerWidth,
						'& .MuiDrawer-paper': {
							color: theme.palette.secondary['200'],
							backgroundColor: theme.palette.background.alt,
							boxSizing: 'border-box',
							borderWidth: isNonMobile ? 0 : '2px',
							width: drawerWidth,
						},
					}}
				>
					<Box width='100%'>
						<Box m='1.5rem 2rem 2rem 3rem'>
							<FlexBetween color={theme.palette.secondary.main}>
								<Box display='flex' alignItems='center' gap='0.5rem'>
									<Typography
										variant='h4'
										fontWeight='bold'
										sx={{ textAlign: 'center' }}
									>
										SYNERGIAT
									</Typography>
								</Box>
								{!isNonMobile && (
									<IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
										<ChevronLeft />
									</IconButton>
								)}
							</FlexBetween>
						</Box>
						<List>
							{navItems.map(({ text, icon }) => {
								if (!icon) {
									return (
										<Typography key={text} sx={{ m: '2.25rem 0 1rem 3rem' }}>
											{text}
										</Typography>
									);
								}
								const lcText = text.toLowerCase();
								return (
									<ListItem key={text}>
										<ListItemButton
											onClick={() => {
												navigate(`/${lcText}`);
												setActive(lcText);
											}}
											sx={{
												backgroundColor:
													active === lcText
														? theme.palette.secondary[300]
														: 'transparent',
												color:
													active === lcText
														? theme.palette.primary[600]
														: theme.palette.secondary[100],
												p: '8px 0px',
											}}
										>
											<ListItemIcon
												sx={{
													ml: '2rem',
													color:
														active === lcText
															? theme.palette.primary[600]
															: theme.palette.secondary[200],
												}}
											>
												{icon}
											</ListItemIcon>
											<ListItemText primary={text} />
											{active === lcText && (
												<ChevronRightOutlined sx={{ ml: 'auto' }} />
											)}
										</ListItemButton>
									</ListItem>
								);
							})}
						</List>
					</Box>
				</Drawer>
			)}
		</Box>
	);
};
