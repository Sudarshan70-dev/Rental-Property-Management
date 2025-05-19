"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import "../app/style.css";

export default function TopNavbar() {
  const router = useRouter();

  const [userName, setUserName] = useState("User");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  // Get session and fetch user profile
  useEffect(() => {
    (async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.user) return;

      const userId = session.user.id;

      const { data: profile, error } = await supabase
  .from("user_profiles")
  .select("*")
  .eq("id", userId); 


      if (!error && profile) {
        setUserName(profile[0].full_name);
      }
    })();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/auth/login");
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <header className="shadow px-6 py-4 flex justify-between items-center navbarColor">
      <h1 className="text-xl font-semibold text-white">Rental Property Tracker</h1>

      <div className="flex items-center gap-4">
        <div className="text-sm text-white">Welcome, {userName}</div>

        <Tooltip title="User Menu">
          <IconButton onClick={handleClick}>
            <Avatar sx={{ bgcolor: "orange" }}>{userName.charAt(0)}</Avatar>
          </IconButton>
        </Tooltip>

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          onClick={handleClose}
        >
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </div>
    </header>
  );
}
// select * from user_profiles where id = d6e64126-0147-4452-83d8-b7b9588964ac;
