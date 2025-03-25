import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from 'react-router-dom';
import { Signup, Login, Not_found_page, Forum } from '../pages';
import { NavBar } from '../components';
import { MyAccountPage } from '../pages/my_account/MyAccountPage';
import NewMessage from '../pages/forum/NewMessage';
import { FormModelCreate } from '../pages/models_page/components/FormModelCreate';
import { FormModelUpdate } from '../pages/models_page/components/FormModelUpdate';
import { FormDatasetCreate } from '../pages/datasets_page/components/FormDatasetCreate';
import { FormDatasetUpdate } from '../pages/datasets_page/components/FormDatasetUpdate';
import TableModels from '../pages/admin_view/home/components/TableModels';
import TableUsers from '../pages/admin_view/home/components/TableUsers';
import TableDatasets from '../pages/admin_view/home/components/TableDatasets';
import Reports from "../pages/admin_view/home/components/StatisticalReports";
import { Thread } from "../pages/forum/Thread";
import { FormUserCreate } from "../pages/admin_view/form_user/FormUserCreate";
import { FormUserUpdate } from "../pages/admin_view/form_user/FormUserUpdate";
import DatasetsPage from "../pages/datasets_page/DatasetsPage";
import Landing from "../pages/landing_view/Landing";
import NewsPage from "../pages/news_page/NewsPage";
import TicketRedaction from "../components/FAQs/TicketRedaction";
import TableTickets from "../pages/admin_view/home/components/TableTickets";
import Community from "../pages/community/CommunityPage";
import UserPage from '../pages/user_profile/UserProfile'
import GoogleLoginSuccess from "../pages/login/helpers/googleLoginSuccess";
import ModelsPage from "../pages/models_page/ModelsPage";
import ModelDetailPage from "../pages/models_page/components/ModelDetailPage";
import ModelDetailPageAdmin from "../pages/admin_view/form_model/ModelDetailPageAdmin";
import ProtectedRoute from './ProtectedRoute';
import DatasetDetailPageAdmin from '../pages/admin_view/form_dataset/DatasetDetailPageAdmin';
import DatasetDetailPage from '../pages/datasets_page/components/DatasetDetailPage';
import TableNews from '../pages/admin_view/home/components/TableNews';
import { FormNewUpdate } from '../pages/news_page/components/FormNewUpdate';
import { FormNewCreate } from '../pages/news_page/components/FormNewCreate';
import NewDetailPage from '../pages/news_page/components/NewDetailPage';
import NewDetailPageAdmin from '../pages/admin_view/form_new/NewDetailPageAdmin';
import EditCategories from '../pages/admin_view/home/components/EditCategories'
import ForgotPassword from '../pages/login/components/ForgotPassword'; 
import ModelCategory from '../pages/models_page/components/ModelCategory';
import TermsAndConditions from '../pages/terms_and_conditions/TermsAndConditions';
import DatasetCategory from '../pages/datasets_page/components/DatasetCategory';
import EditModel from '../pages/admin_view/form_model/EditModel';
import EditDataset from '../pages/admin_view/form_dataset/EditDataset';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer/Footer';
import { Box } from '@mui/material';

const Layout = () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <NavBar /> 
        <Box
            component="main"
            sx={{
                flexGrow: 1, 
                overflow: 'auto',
            }}
            >
            <Outlet />
        </Box>
        <Footer />
    </Box>
);

export const AppRouter = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />}>
            <Route index element={<Landing />} />

            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="/login/success" element={<GoogleLoginSuccess />} />
            <Route path="forgot_password" element={<ForgotPassword />} />

            <Route path="models" element={<ModelsPage />} />
            <Route path="datasets" element={<DatasetsPage />} />
            <Route path="news" element={<NewsPage />} />

            <Route path="forum" element={<Forum />}></Route>
            <Route path="forum/thread/:id" element={<Thread />}></Route>
            <Route path="forum/new-message" element={<NewMessage />}></Route>

            <Route path="account" element={<MyAccountPage />}></Route>

            <Route path="datasets_management" element={<ProtectedRoute requiredRole="ADMIN" element={<TableDatasets />} />} />
            <Route path="tickets_management" element={<ProtectedRoute requiredRole="ADMIN" element={<TableTickets />} />} />
            <Route path="models_management" element={<ProtectedRoute requiredRole="ADMIN" element={<TableModels />} />} />
            <Route path="categories_management" element={<ProtectedRoute requiredRole="ADMIN" element={<EditCategories />} />} />
            <Route path="news_management" element={<ProtectedRoute requiredRole="ADMIN" element={<TableNews />} />} />
            <Route path="users_management" element={<ProtectedRoute requiredRole="ADMIN" element={<TableUsers />} />} />
            <Route path="statistical_reports" element={<ProtectedRoute requiredRole="ADMIN" element={<Reports />} />} />

            <Route path="models/update/:id" element={<FormModelUpdate />} />
            <Route path="models/create" element={<FormModelCreate />} />
            <Route path="/models/:id" element={<ModelDetailPage />} />
            <Route path="models_management/:id" element={<ProtectedRoute requiredRole="ADMIN" element={<ModelDetailPageAdmin />} />} />
            <Route path="edit_model/:id" element={<ProtectedRoute requiredRole="ADMIN" element={<EditModel />} />} />
            
            <Route path="/models/category/:id/:name" element={<ModelCategory />} /> 
            <Route path="/datasets/category/:id/:name" element={<DatasetCategory />} /> 
            
            <Route path="datasets/update/:id" element={<FormDatasetUpdate />} />
            <Route path="datasets/create" element={<FormDatasetCreate />} />
            <Route path="/datasets/:id" element={<DatasetDetailPage />} />
            <Route path="datasets_management/:id" element={<ProtectedRoute requiredRole="ADMIN" element={<DatasetDetailPageAdmin />} />} />
            <Route path="edit_dataset/:id" element={<ProtectedRoute requiredRole="ADMIN" element={<EditDataset />} />} />

            <Route path="news/update/:id" element={<FormNewUpdate />} />
            <Route path="news/create" element={<FormNewCreate />} />
            <Route path="/news/:id" element={<NewDetailPage />} />
            <Route path="news_management/:id" element={<ProtectedRoute requiredRole="ADMIN" element={<NewDetailPageAdmin />} />} />

            <Route path="users_management/form_user_create" element={<ProtectedRoute requiredRole="ADMIN" element={<FormUserCreate />} />} />
            <Route path="users_management/form_user_update/:id" element={<ProtectedRoute requiredRole="ADMIN" element={<FormUserUpdate />} />} />

            <Route path="ticket_redaction" element={<TicketRedaction />}></Route>

            <Route path="community" element={<Community />} />
            <Route path="community/user_profile/:id" element={<UserPage />} />  

            <Route path="/terms_and_conditions" element={<TermsAndConditions />} />

            <Route path="*" element={<Not_found_page />} />
        </Route>
    )
);
