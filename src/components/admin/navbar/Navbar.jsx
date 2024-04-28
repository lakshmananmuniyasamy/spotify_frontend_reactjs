import { Button, Nav, NavDropdown } from 'react-bootstrap';
import { useState } from 'react';
import { AdminDashboard } from '../dashboard/AdminDashboard';
import { AddSong } from '../addsongs/AddSong';
import { User } from '../user/User';
import { useParams } from 'react-router-dom';



function Navbar() {
    const { username } = useParams();
    const [activeLink, setActiveLink] = useState("/dashboard");

    const handleSelect = (selectedKey) => {
        setActiveLink(selectedKey);
    };

    return (
        <>
            <Nav fill variant="tabs" activeKey={activeLink} onSelect={handleSelect}>
                <Nav.Item>
                    <Nav.Link eventKey="/dashboard">Dashboard</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="/admin/addsongs">AddSongs</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="/user"> User </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <NavDropdown
                        id="nav-dropdown-dark-example"
                        title="Accounts">
                        <NavDropdown.Item href="#action/3.2">
                            Admin : <b>{username}</b>
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="/">
                            <Button>Log Out</Button>
                        </NavDropdown.Item>
                    </NavDropdown>
                </Nav.Item>



            </Nav >


            {activeLink === '/dashboard' && <AdminDashboard />}
            {activeLink === '/admin/addsongs' && <AddSong />}
            {activeLink === '/user' && <User />}


        </>
    );
}

export default Navbar;
