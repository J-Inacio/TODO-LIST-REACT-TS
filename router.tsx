// // router.jsx
// import { createBrowserRouter } from 'react-router-dom';
// import DefaultLayout from './src/layouts/DefaultLayout';
// import HomePage from './src/pages/HomePage';
// import ListItems from './src/pages/ListItems';
// import NewItem from './src/pages/NewItem';
// import ShowItem from './src/pages/ShowItem';
// import UpdateItem from './src/pages/UpdateItem';
// import ItemsLayout from './src/layouts/ItemsLayout';

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <DefaultLayout />,
//     children: [
//       {
//         index: true,
//         element: <HomePage />,
//       },
//       {
//         path: 'items',
//         element: <ItemsLayout />,
//         children: [
//           {
//             index: true,
//             element: <ListItems />,
//           },
//           { path: 'new', element: <NewItem /> },
//           { path: ':id', element: <ShowItem /> },
//           { path: ':id/update', element: <UpdateItem /> },
//         ],
//       },
//     ],
//   },
// ]);

// export default router;
