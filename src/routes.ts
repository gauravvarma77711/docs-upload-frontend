import lazyRetry from "./utils/LazyRetry";

const Documents = lazyRetry(() => import("./pages/documents"))
const DocumentListPage = lazyRetry(() => import('./components/DocumentList'))

const routes = [
  { path: "/", name: "Documents", component: Documents },
  { path: "/documents", name: "Documents", component: DocumentListPage },

]


export default routes