// import { mdiMenu } from "@mdi/js";
// import Icon from "@mdi/react";
// import React, { useEffect, useState } from "react";

// import Header from "./Header";
// import NavLinks from "./NavLinks";


// const SideNavBar = ({ sideNavOpen, setsideNavOpen }) => {

//   return (
//     <div style={{
//       width: sideNavOpen ? 175 : 64,
//       flexShrink: 0,
//       transition: "width .15s cubic-bezier(0.22, 0.61, 0.36, 1) 0s"
//     }}
//     >
//       <div
//         style={{
//           flexShrink: 0,
//           // height: "calc(100vh - 64px)",
//           position: "fixed",
//           display: "flex",
//           flexDirection: "column",
//           height: "100vh",
//           width: sideNavOpen ? 175 : 64,
//           padding: ".75rem",
//           transition: "width .15s cubic-bezier(0.22, 0.61, 0.36, 1) 0s",
//           zIndex: 1000,
//         }}
//         className="bg-blue-100"
//       >
//         <div style={{
//           width: 40,
//           height: 40,
//           // margin: "0 .5rem",
//           marginBottom: "1rem",
//           borderRadius: ".375rem",
//         }}
//           className="btnCircular hover:bg-blue-200 active:bg-blue-300"
//           onClick={setsideNavOpen}
//         >
//           <Icon path={mdiMenu} size={1} />
//         </div>
//         {/* <Header open={open} toggle={toggle} /> */}
//         <NavLinks isSidebarOpen={sideNavOpen} />
//       </div>
//     </div>
//   )
// };
// export default SideNavBar;
