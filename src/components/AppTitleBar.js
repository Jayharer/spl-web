// import { useSelector } from "react-redux";
// import { SignOutButton } from "features/auth/components/SignOutButton";

// const AppTitleBar = () => {
//   const authState = useSelector((state) => state.auth)

//   // const userInfo = authState.isAuthenticated
//   //   && <div className="userInfo bg-red-100 TitleFont">
//   //     {authState.username}
//   //     <SignOutButton />
//   //   </div>

//   const userInfo = <div className="userInfo bg-red-100 TitleFont">
//     {authState.username}
//     <SignOutButton />
//   </div>

//   return (
//     <div className="appTitleBar">
//       <div style={{ flexGrow: 1 }} />
//       <h1 className="TitleFont text-blue-600">
//         <b>Chem</b>Table
//       </h1>
//       <div style={{ flexGrow: 1 }} />
//       {userInfo}
//     </div>
//   )
// };
// export default AppTitleBar;