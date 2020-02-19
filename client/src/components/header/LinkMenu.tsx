import React from "react";
import { Menu, Dropdown } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { RootState } from "@redux/store";
import { numberOfItems } from "../../helpers/numberOfItems";
import { connect } from "react-redux";
import { logout } from "@redux/modules/session";
// import { useTypedSelector } from '@redux/store';

// const isOn = useTypedSelector(state => state.products)

const mapStateToProps = (state: RootState) => ({
  username: state.session?.user.name,
  numberOfItems: numberOfItems(state)
});

const mapDispatchToProps = { logout };

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const UnconnectedLinkMenu: React.FC<Props> = ({
  logout,
  numberOfItems,
  username
}) => {
  return (
    <Menu>
      <Menu.Menu position="right">
        <Menu.Item name="shop">
          <Link to="/shop">Shop</Link>
        </Menu.Item>
        <Menu.Item name="cart">
          <Link to="/cart">Cart ({numberOfItems})</Link>
        </Menu.Item>
        {username === null ? (
          <Menu.Item name="login">
            <Link to="/login">Login</Link>
          </Menu.Item>
        ) : (
          <Dropdown item text={username}>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => logout()}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}
      </Menu.Menu>
    </Menu>
  );
};

export const LinkMenu = connect(
  mapStateToProps,
  mapDispatchToProps
)(UnconnectedLinkMenu);
