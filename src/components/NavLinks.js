// import React, { useEffect, useState } from "react";
// import { NavLink } from "react-router-dom";
// import { Divider, Tooltip } from "antd";
// import { useSelector, useDispatch } from "react-redux";

// import links from "../utils/links";
// import { updateNavLink } from "shared/slice/navLinkSlice";

// const NavLinks = ({ isSidebarOpen }) => {
//   const dispatch = useDispatch()
//   const linkState = useSelector(state => state.navlink)

//   useEffect(() => {
//     const linkIndex = links.findIndex(link =>
//       link.path === "/" + window.location.pathname.split("/")[1])
//     dispatch(updateNavLink(linkIndex))
//   })

//   return (
//     <ul style={{
//       display: "flex",
//       flexDirection: "column",
//       gap: ".5rem",
//       flexGrow: 1,
//       marginBottom: 0,
//     }}>
//       {links.map((link, linkIndex) => {
//         const { text, path, id, icon } = link;
//         const bgSelected = linkIndex === linkState.selectedLink
//           ? "bg-blue-500 text-gray-50 hover:bg-blue-500 active:bg-blue-500"
//           : "text-gray-800 hover:bg-blue-200 active:bg-blue-300";

//         return ( // Using <></> will cause no unique key warning. Use list instead.
//           [
//             text === "Upload"
//             && <Divider style={{ margin: 0, backgroundColor: "#00000020" }} key={text} />,
//             text === "Settings"
//             && <div style={{ flexGrow: 1 }} key={text} />,
//             <NavLink
//               to={path}
//               className="rounded-md cursor-pointer"
//               key={id}
//               onClick={() => {
//                 dispatch(updateNavLink(linkIndex))
//               }}
//             >
//               <div className={`${bgSelected} rounded-md flex`}
//                 style={{
//                   width: "100%",
//                   padding: ".5rem",
//                   transition: "background-color .2s",
//                   userSelect: "none"
//                 }}>

//                 <div style={{ flexShrink: 0 }}>
//                   {!isSidebarOpen
//                     ? <Tooltip
//                       placement="right"
//                       title={text.toUpperCase()}
//                       color="#3B82F6"
//                       overlayClassName="TitleFont"
//                     >
//                       {icon}
//                     </Tooltip>
//                     : icon
//                   }
//                 </div>

//                 <span className={`origin-left TitleFont`}
//                   style={{
//                     paddingLeft: "1rem",
//                     fontSize: "1rem",
//                     textTransform: "uppercase",
//                     fontWeight: 500,
//                     height: 24,
//                     overflowX: "hidden",
//                     overflowY: "hidden"
//                   }}>
//                   {text}
//                 </span>

//               </div>
//             </NavLink>
//           ]
//         );
//       })}
//     </ul>
//   );
// };

// export default NavLinks;

