import {
    Button,
    Menu,
    MenuTrigger,
    MenuList,
    MenuItem,
    MenuPopover,
  } from "@fluentui/react-components";
  import * as React from "react";
  
  export const TopBar = () => (
    <Menu>
      <MenuTrigger disableButtonEnhancement>
        <Button>Toggle menu</Button>
      </MenuTrigger>
  
      <MenuPopover>
        <MenuList>
          <MenuItem>New </MenuItem>
          <MenuItem>New Window</MenuItem>
          <MenuItem disabled>Open File</MenuItem>
          <MenuItem>Open Folder</MenuItem>
        </MenuList>
      </MenuPopover>
    </Menu>
  );