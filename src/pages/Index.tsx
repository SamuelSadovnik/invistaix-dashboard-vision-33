
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Dashboard from './Dashboard';

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to dashboard
    navigate('/');
  }, [navigate]);

  return <Dashboard />;
};

export default Index;
