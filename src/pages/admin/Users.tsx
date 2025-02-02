import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../store/adminSlice';
import { RootState, AppDispatch } from '../../store/store';
import PageHeader from '../../components/PageHeader';
import { Sdk } from '../../utils/sdk';
import Loader from '../../components/Loader';
import SingleLineError from '../../components/errors/SingleLineError';
import { FiChevronDown, FiChevronUp, FiMail, FiPhone, FiMapPin, FiGlobe, FiHome, FiCheckCircle, FiXCircle } from 'react-icons/fi';
import { RiUser4Fill } from 'react-icons/ri';

const sdk = new Sdk();

const UserInventory: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { users, status, error } = useSelector((state: RootState) => state.admin);
  const [expandedUser, setExpandedUser] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleToggle = (email: string) => {
    setExpandedUser((prev) => (prev === email ? null : email));
  };

  return (
    <div className="container flex flex-col gap-3 mx-auto p-6">
      <PageHeader heading="" accent="Users" backToRoute={sdk.adminDashboardRoute} backToLabel="Dashboard" />

      {users.map((user) => (
        <div
          className="flex flex-col border-b dark:border-b-neutral-600 pb-2 cursor-pointer"
          key={user.email}
          onClick={() => handleToggle(user.email)}
        >
          <div className="flex gap-3 items-center justify-between">
            <div className="flex items-center gap-2">
              
              <RiUser4Fill className="text-lg" />

              <h1 className="text-sm">{user.firstName || user.lastName || user.name || 'Not supplied'}</h1>
              <h1 className="text-xs opacity-50">/{user.email}</h1>
            
            </div>
            {expandedUser === user.email ? (
              <FiChevronUp className="text-gray-500" />
            ) : (
              <FiChevronDown className="text-gray-500" />
            )}
          </div>

          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out`}
            style={{
              maxHeight: expandedUser === user.email ? '500px' : '0',
              opacity: expandedUser === user.email ? 1 : 0,
            }}
          >
            <div className="mx-4 my-6 text-sm opacity-40 space-y-2">
              <p className="flex items-center gap-2"><FiMail /> Email: {user.email || 'Not provided'}</p>
              <p className="flex items-center gap-2"><FiPhone /> Phone: {user.phoneNumber || 'Not provided'}</p>
              <p className="flex items-center gap-2"><FiMapPin /> Address: {user.address || 'Not provided'}</p>
              <p className="flex items-center gap-2"><FiGlobe /> Country: {user.country || 'Not provided'}</p>
              <p className="flex items-center gap-2"><FiHome /> City: {user.city || 'Not provided'}</p>
              <p className="flex items-center gap-2">
                {user.verified ? <FiCheckCircle className="" /> : <FiXCircle className="text-red-500" />} Email Verified: {user.verified ? 'Yes' : 'No'}
              </p>
            </div>
          </div>
        </div>
      ))}

      {status === 'loading' && <div className="mt-32"><Loader /></div>}
      {status === 'failed' && (
        <div className="mt-8">
          <SingleLineError errorMessage={error || 'Connection Error. Try again.'} />
        </div>
      )}
    </div>
  );
};

export default UserInventory;