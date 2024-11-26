import { UserProfile } from './../app/auth/models';
/** @format */

import AICloudFeatureManagement from '../app/admin/dashboard';
import AILicenseWriter from '../app/admin/dashboard/ai-api-key/writer/AILicenseWriter';
import AIPackageWriter from '../app/admin/dashboard/ai-package/AIPackageWriter';
import { ForgotPassword } from '../app/auth/forgotPassword';
import Home from '../app/home';
import { Inbody } from '../app/trial/ocr/in-body';
import Login from '../app/auth/login';
import { MedicalDevice } from '../app/trial/ocr/medical-device';
import { PageURL } from '../models/enum';
import { ProductOCR } from '../app/product/ocr';
import Register from '../app/auth/register';
import { ResetPassword } from '../app/auth/resetPassword';
import { RouteModel } from './models';
import Tenant from '../app/admin/tenant/management';
import WelcomeInformation from '../app/admin/welcome-info';
import { Prescription } from '../app/trial/ocr/prescription';
import { ProductLayout } from '@layout/product-layout';
import { LicenseManagement } from '../app/license';
import { DynamicTemplate } from '../app/trial/ocr/dynamic-template';
import { CreateDynamicTemplate } from '../app/trial/ocr/dynamic-template/CreateDynamicTemplate';
import { ShowDynamicResult } from '../app/trial/ocr/dynamic-template/ShowDynamicResult';
import { TextToSpeech } from '../app/audio-processing/tts';
import { UpdateDynamicTemplate } from '../app/trial/ocr/dynamic-template/UpdateDynamicTemplate';
import Jobs from '../app/jobs';
import Companies from '../app/company';
import { ResendVerifyEmail } from '../app/auth/resend-verify-email';
import { VerifyEmail } from '../app/auth/verify-email';
import JobDetail from '../app/jobs/components/JobDetail';
import SavedJobs from '../app/jobs/savedJobs/index';
import ProfileUser from '../app/profile/index';
import CompanyDetail from '../app/company/components/CompanyDetail';
import { UpdatePassword } from '../app/users/update-password';
import Upgrade from '../app/upgrade';
// import UserManagement from '../app/admin/dashboard/components/user';
import UserManagement from '../app/admin/dashboard/components/user';
import JobManagement from '../app/admin/dashboard/components/job';
import CompanyManagement from '../app/admin/dashboard/components/company';
import CVManagement from '../app/admin/dashboard/components/cv';
import HRDashboard from '../app/hr';

export const APP_ROUTE: Array<RouteModel> = [
  { path: PageURL.OCR_MEDICAL_DEVICE, component: MedicalDevice },
  { path: PageURL.OCR_IN_BODY, component: Inbody },
  { path: PageURL.OCR_PRESCRIPTION, component: Prescription },
  { path: PageURL.OCR_DYNAMIC_TEMPLATE_CREATE, component: CreateDynamicTemplate },
  { path: PageURL.OCR_DYNAMIC_TEMPLATE_UPDATE, component: UpdateDynamicTemplate },
  { path: PageURL.OCR_DYNAMIC_TEMPLATE, component: DynamicTemplate },
  { path: PageURL.OCR_DYNAMIC_TEMPLATE_RESULT, component: ShowDynamicResult },
  { path: PageURL.TEXT_TO_SPEECH, component: TextToSpeech },
];

export const PUBLIC_ROUTE = [
  {
    path: PageURL.HOME,
    component: Home,
  },
  {
    path: PageURL.LOGIN,
    component: Login,
  },
  // {
  //   path: PageURL.ADMIN_LOGIN,
  //   component: Login,
  // },
  {
    path: PageURL.REGISTER,
    component: Register,
  },
  {
    path: PageURL.JOBS,
    component: Jobs,
  },
  {
    path: PageURL.JOB_DETAIL,
    component: JobDetail,
  },
  {
    path: PageURL.COMPANY,
    component: Companies,
  },
  {
    path: PageURL.COMPANY_DETAIL,
    component: CompanyDetail,
  },
];

export const PRIVATE_ROUTE = [
  {
    path: PageURL.PROFILE_MANAGEMENT,
    component: ProfileUser,
  },
  {
    path: PageURL.VERIFY_EMAIL,
    component: VerifyEmail,
  },
  {
    path: PageURL.RESEND_VERIFY_EMAIL,
    component: ResendVerifyEmail,
  },
  {
    path: PageURL.UPDATE_PASSWORD,
    component: UpdatePassword,
  },
  {
    path: PageURL.FORGOT_PASSWORD,
    component: ForgotPassword,
  },
  {
    path: PageURL.RESET_PASSWORD,
    component: ResetPassword,
  },
  {
    path: PageURL.UPGRADE,
    component: Upgrade,
  },
  {
    path: PageURL.SAVED_JOBS,
    component: SavedJobs,
  },
  {
    path: PageURL.HR_MANAGE,
    component: HRDashboard,
  },
];

export const ADMIN_ROUTE = [
  {
    path: PageURL.ADMIN_MANAGE,
    component: UserManagement,
  },
  {
    path: PageURL.ADMIN_MANAGE_USER,
    component: UserManagement,
  },
  {
    path: PageURL.ADMIN_MANAGE_JOB,
    component: JobManagement,
  },
  {
    path: PageURL.ADMIN_MANAGE_COMPANY,
    component: CompanyManagement,
  },
  {
    path: PageURL.ADMIN_MANAGE_CV,
    component: CVManagement,
  },
];
