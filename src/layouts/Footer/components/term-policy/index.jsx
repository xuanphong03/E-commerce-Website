import { Route, Routes } from 'react-router-dom';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermOfService from './components/TermOfService';
import ErrorPage from '~/pages/Error';

function TermAndPolicy() {
  return (
    <div className="mx-auto max-w-[1300px] py-10">
      <Routes>
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/term-of-service" element={<TermOfService />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default TermAndPolicy;
