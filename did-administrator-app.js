import { useState } from 'react';
import {
  Users,
  Building,
  Clock,
  Settings,
  Shield,
  Plus,
  Search,
  Mail,
  Download,
  Upload,
  MoreVertical,
  ChevronDown,
  Award,
  AlertTriangle,
  Check,
  X,
  UserPlus,
  RefreshCw
} from 'lucide-react';

const AdminPortal = () => {
  const [activeTab, setActiveTab] = useState('users');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showRevokeModal, setShowRevokeModal] = useState(false);
  
  // Mock data for demonstration
  const users = [
    {
      id: 1,
      name: 'Alex Smith',
      email: 'alex.smith@contoso.com',
      department: 'Engineering',
      title: 'Senior Developer',
      status: 'active',
      verificationLevel: 'complete',
      lastActive: '10 minutes ago',
      did: 'did:ion:EiBHdtfrI1gu52iJbGUJ0FkIx_FtVF3AW3wvcSdIRpS02g',
      photo: '/api/placeholder/48/48',
      accessGroups: ['Main Office', 'Development Labs', 'Server Room'],
      createdAt: 'Feb 15, 2025',
      credentials: [
        { name: 'Employee Badge', issuer: 'Contoso HR', issued: 'Feb 15, 2025', expires: 'Feb 15, 2026' },
        { name: 'Code Signing', issuer: 'Contoso Security', issued: 'Feb 18, 2025', expires: 'Aug 18, 2025' }
      ],
      authHistory: [
        { service: 'Microsoft 365', time: '10:32 AM', date: 'Today', location: 'Seattle, WA' },
        { service: 'Building Access', time: '8:45 AM', date: 'Today', location: 'Main Entrance' },
        { service: 'VPN Connection', time: '7:30 PM', date: 'Yesterday', location: 'Redmond, WA' }
      ]
    },
    {
      id: 2,
      name: 'Jamie Wong',
      email: 'jamie.wong@contoso.com',
      department: 'Marketing',
      title: 'Creative Director',
      status: 'active',
      verificationLevel: 'complete',
      lastActive: '1 hour ago',
      did: 'did:ion:EiBYzgfxjjKKn8jx6QkQn4ch9csA8vjbB1l0n-6_j_d34Q',
      photo: '/api/placeholder/48/48',
      accessGroups: ['Main Office', 'Creative Studio'],
      createdAt: 'Jan 05, 2025',
      credentials: [
        { name: 'Employee Badge', issuer: 'Contoso HR', issued: 'Jan 05, 2025', expires: 'Jan 05, 2026' }
      ],
      authHistory: [
        { service: 'SharePoint', time: '2:15 PM', date: 'Yesterday', location: 'San Francisco, CA' },
        { service: 'Building Access', time: '9:30 AM', date: 'Yesterday', location: 'Side Entrance' }
      ]
    },
    {
      id: 3,
      name: 'Taylor Johnson',
      email: 'taylor.johnson@contoso.com',
      department: 'Finance',
      title: 'Financial Analyst',
      status: 'pending',
      verificationLevel: 'invited',
      lastActive: 'Never',
      did: '',
      photo: '/api/placeholder/48/48',
      accessGroups: ['Main Office'],
      createdAt: 'Apr 02, 2025',
      credentials: [],
      authHistory: []
    },
    {
      id: 4,
      name: 'Morgan Chen',
      email: 'morgan.chen@contoso.com',
      department: 'Operations',
      title: 'Operations Manager',
      status: 'suspended',
      verificationLevel: 'complete',
      lastActive: '3 days ago',
      did: 'did:ion:EiA9342NyfKeD5kArx30wRcpOSlZC_AmnoIcjnbsUKwupQ',
      photo: '/api/placeholder/48/48',
      accessGroups: ['Main Office', 'Warehouse'],
      createdAt: 'Nov 12, 2024',
      credentials: [
        { name: 'Employee Badge', issuer: 'Contoso HR', issued: 'Nov 15, 2024', expires: 'Nov 15, 2025' }
      ],
      authHistory: [
        { service: 'Teams', time: '4:45 PM', date: '3 days ago', location: 'Chicago, IL' },
        { service: 'Building Access - Failed', time: '4:30 PM', date: '3 days ago', location: 'Warehouse Entrance' }
      ]
    }
  ];
  
  const [searchQuery, setSearchQuery] = useState('');
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.department.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Render user status badge
  const renderStatusBadge = (status) => {
    switch(status) {
      case 'active':
        return <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Active</span>;
      case 'pending':
        return <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">Pending</span>;
      case 'suspended':
        return <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">Suspended</span>;
      default:
        return null;
    }
  };

  // Render verification level badge
  const renderVerificationBadge = (level) => {
    switch(level) {
      case 'complete':
        return <span className="flex items-center text-xs text-green-700"><Check size={14} className="mr-1" /> Verified</span>;
      case 'partial':
        return <span className="flex items-center text-xs text-yellow-700"><AlertTriangle size={14} className="mr-1" /> Partial</span>;
      case 'invited':
        return <span className="flex items-center text-xs text-blue-700"><Mail size={14} className="mr-1" /> Invited</span>;
      default:
        return null;
    }
  };
  
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Invite User Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Invite New User</h3>
              <button 
                onClick={() => setShowInviteModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md" 
                  placeholder="Enter full name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input 
                  type="email" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md" 
                  placeholder="user@company.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                  <option>Engineering</option>
                  <option>Marketing</option>
                  <option>Finance</option>
                  <option>Operations</option>
                  <option>Human Resources</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md" 
                  placeholder="Enter job title"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Access Groups</label>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input type="checkbox" id="mainOffice" className="mr-2" />
                    <label htmlFor="mainOffice">Main Office</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="serverRoom" className="mr-2" />
                    <label htmlFor="serverRoom">Server Room</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="creativeStudio" className="mr-2" />
                    <label htmlFor="creativeStudio">Creative Studio</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="warehouse" className="mr-2" />
                    <label htmlFor="warehouse">Warehouse</label>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 p-3 rounded-md">
                <p className="text-sm text-blue-800">
                  <span className="font-medium">Note:</span> User will receive an email invitation to download the DID wallet app and complete identity verification.
                </p>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button 
                onClick={() => setShowInviteModal(false)}
                className="flex-1 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  alert("Invitation sent successfully!");
                  setShowInviteModal(false);
                }}
                className="flex-1 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Send Invitation
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Revoke Access Modal */}
      {showRevokeModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-red-600">Revoke Access</h3>
              <button 
                onClick={() => setShowRevokeModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="mb-6">
              <div className="flex items-center mb-4">
                <img src={selectedUser.photo} alt={selectedUser.name} className="w-12 h-12 rounded-full mr-3" />
                <div>
                  <p className="font-bold">{selectedUser.name}</p>
                  <p className="text-sm text-gray-500">{selectedUser.email}</p>
                </div>
              </div>
              
              <div className="bg-red-50 p-4 rounded-md mb-4">
                <div className="flex">
                  <AlertTriangle className="text-red-600 mr-3 flex-shrink-0" size={24} />
                  <div>
                    <h4 className="font-medium text-red-800">Warning: This action will:</h4>
                    <ul className="mt-2 text-sm text-red-700 list-disc list-inside">
                      <li>Immediately revoke all access credentials</li>
                      <li>Invalidate building access passes</li>
                      <li>Block sign-in to all Microsoft 365 services</li>
                      <li>Prevent document signing and secure communication</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Revocation Reason</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                  <option>Employment termination</option>
                  <option>Security incident</option>
                  <option>Extended leave</option>
                  <option>Lost/stolen device</option>
                  <option>Role change</option>
                  <option>Other (specify below)</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes</label>
                <textarea 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md h-20" 
                  placeholder="Enter any additional details"
                />
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button 
                onClick={() => setShowRevokeModal(false)}
                className="flex-1 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  alert(`Access revoked for ${selectedUser.name}`);
                  setShowRevokeModal(false);
                }}
                className="flex-1 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Confirm Revocation
              </button>
            </div>
          </div>
        </div>
      )}
      
      <header className="bg-blue-800 p-4 text-white">
        <div className="flex items-center justify-between max-w-screen-xl mx-auto">
          <h1 className="text-2xl font-bold flex items-center">
            <Shield className="mr-2" /> DID Wallet Admin Portal
          </h1>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-blue-200">
              <span className="block">Contoso Corporation</span>
              <span className="block text-xs">Administrator Console</span>
            </div>
            <img 
              src="/api/placeholder/40/40" 
              alt="Admin" 
              className="w-10 h-10 rounded-full border-2 border-white"
            />
          </div>
        </div>
      </header>
      
      {/* Main navigation */}
      <div className="bg-white border-b">
        <div className="flex max-w-screen-xl mx-auto">
          <button 
            className={`px-4 py-3 font-medium text-sm flex items-center ${activeTab === 'users' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
            onClick={() => setActiveTab('users')}
          >
            <Users size={16} className="mr-2" /> Users
          </button>
          <button 
            className={`px-4 py-3 font-medium text-sm flex items-center ${activeTab === 'access' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
            onClick={() => setActiveTab('access')}
          >
            <Building size={16} className="mr-2" /> Access Control
          </button>
          <button 
            className={`px-4 py-3 font-medium text-sm flex items-center ${activeTab === 'activity' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
            onClick={() => setActiveTab('activity')}
          >
            <Clock size={16} className="mr-2" /> Activity Logs
          </button>
          <button 
            className={`px-4 py-3 font-medium text-sm flex items-center ${activeTab === 'settings' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
            onClick={() => setActiveTab('settings')}
          >
            <Settings size={16} className="mr-2" /> Settings
          </button>
        </div>
      </div>
      
      {/* Main content area */}
      <div className="flex-grow overflow-auto p-4 md:p-6">
        <div className="max-w-screen-xl mx-auto">
          {/* Users Tab */}
          {activeTab === 'users' && (
            <div>
              <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-2xl font-bold mb-2 sm:mb-0">Manage Users</h2>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => setShowInviteModal(true)}
                    className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 flex items-center"
                  >
                    <UserPlus size={16} className="mr-2" /> Invite New User
                  </button>
                  <button className="bg-white border border-gray-300 px-3 py-2 rounded hover:bg-gray-50 flex items-center">
                    <ChevronDown size={16} className="mr-2" /> Actions
                  </button>
                </div>
              </div>
              
              {/* Search and filters */}
              <div className="bg-white rounded-lg shadow mb-6">
                <div className="p-4 border-b">
                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                    <div className="relative flex-grow">
                      <input
                        type="text"
                        placeholder="Search users..."
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                      <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                    </div>
                    <div className="flex space-x-2">
                      <select className="border border-gray-300 rounded px-3 py-2">
                        <option>All Departments</option>
                        <option>Engineering</option>
                        <option>Marketing</option>
                        <option>Finance</option>
                        <option>Operations</option>
                      </select>
                      <select className="border border-gray-300 rounded px-3 py-2">
                        <option>All Statuses</option>
                        <option>Active</option>
                        <option>Pending</option>
                        <option>Suspended</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          User
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Department
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Verification
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Last Active
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredUsers.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                <img
                                  className="h-10 w-10 rounded-full"
                                  src={user.photo}
                                  alt={user.name}
                                />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                <div className="text-sm text-gray-500">{user.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{user.department}</div>
                            <div className="text-xs text-gray-500">{user.title}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {renderStatusBadge(user.status)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {renderVerificationBadge(user.verificationLevel)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {user.lastActive}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex justify-end space-x-2">
                              <button 
                                onClick={() => setSelectedUser(user)}
                                className="text-blue-600 hover:text-blue-800"
                              >
                                View
                              </button>
                              {user.status === 'active' && (
                                <button 
                                  onClick={() => {
                                    setSelectedUser(user);
                                    setShowRevokeModal(true);
                                  }}
                                  className="text-red-600 hover:text-red-800"
                                >
                                  Revoke
                                </button>
                              )}
                              {user.status === 'pending' && (
                                <button 
                                  className="text-blue-600 hover:text-blue-800"
                                  onClick={() => alert(`Invitation resent to ${user.email}`)}
                                >
                                  Resend
                                </button>
                              )}
                              {user.status === 'suspended' && (
                                <button 
                                  className="text-green-600 hover:text-green-800"
                                  onClick={() => alert(`${user.name} has been reactivated`)}
                                >
                                  Reactivate
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-8 w-8">
                              <img className="h-8 w-8 rounded-full" src="/api/placeholder/32/32" alt="" />
                            </div>
                            <div className="ml-3">
                              <div className="text-sm font-medium text-gray-900">Jamie Wong</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">SharePoint</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">Yesterday, 2:15 PM</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">San Francisco, CA</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">iPhone</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                            Success
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-8 w-8">
                              <img className="h-8 w-8 rounded-full" src="/api/placeholder/32/32" alt="" />
                            </div>
                            <div className="ml-3">
                              <div className="text-sm font-medium text-gray-900">Morgan Chen</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">Teams</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">3 days ago, 4:45 PM</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">Chicago, IL</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">Android Phone</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                            Failed
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <div className="p-4 border-t flex justify-between items-center">
                  <button className="text-blue-600 text-sm font-medium hover:text-blue-800">
                    View All Events →
                  </button>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 border border-gray-300 rounded bg-white text-gray-700 hover:bg-gray-50">
                      Previous
                    </button>
                    <button className="px-3 py-1 border border-gray-300 rounded bg-white text-gray-700 hover:bg-gray-50">
                      Next
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow">
                <div className="p-4 border-b">
                  <h3 className="font-bold">Digital Signature Events</h3>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          User
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Document
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Time
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Signature Type
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-8 w-8">
                              <img className="h-8 w-8 rounded-full" src="/api/placeholder/32/32" alt="" />
                            </div>
                            <div className="ml-3">
                              <div className="text-sm font-medium text-gray-900">Alex Smith</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">Project Proposal.pdf</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">Yesterday, 3:45 PM</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">Biometric</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                            Completed
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-8 w-8">
                              <img className="h-8 w-8 rounded-full" src="/api/placeholder/32/32" alt="" />
                            </div>
                            <div className="ml-3">
                              <div className="text-sm font-medium text-gray-900">Jamie Wong</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">Marketing Contract.docx</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">Mar 28, 2025</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">DID</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                            Completed
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <div className="p-4 border-t">
                  <button className="text-blue-600 text-sm font-medium hover:text-blue-800">
                    View All Signatures →
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-bold">System Settings</h2>
                <p className="text-gray-600">Configure DID wallet system parameters</p>
              </div>
              
              <div className="bg-white rounded-lg shadow mb-6">
                <div className="p-4 border-b">
                  <h3 className="font-bold">Organization Settings</h3>
                </div>
                
                <div className="p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Organization Name</label>
                      <input 
                        type="text"
                        defaultValue="Contoso Corporation" 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md" 
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Organization Domain</label>
                      <input 
                        type="text"
                        defaultValue="contoso.com" 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md" 
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Microsoft Entra ID Tenant ID</label>
                      <input 
                        type="text"
                        defaultValue="12a34b56-7c89-0d12-e34f-g56h789i0j12" 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md" 
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Microsoft Verified ID Client ID</label>
                      <input 
                        type="text"
                        defaultValue="98j76h54-g32f-1e0d-c98b-a76v54c32d10" 
                        className="w-full px-3 py-2 border border-gray-300 rounded-md" 
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Organizational DID</label>
                    <input 
                      type="text"
                      defaultValue="did:ion:EiB9FS2D38rYh8MtGYWifbKfsMRPp7ANX6umBHKzcpGPjA" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md font-mono text-sm" 
                      readOnly
                    />
                    <p className="mt-1 text-xs text-gray-500">This is your organization's decentralized identifier.</p>
                  </div>
                </div>
                
                <div className="px-6 py-3 border-t">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                    Save Changes
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow">
                  <div className="p-4 border-b">
                    <h3 className="font-bold">Security Settings</h3>
                  </div>
                  
                  <div className="p-6 space-y-4">
                    <div>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" defaultChecked />
                        <span className="ml-2 text-sm text-gray-700">Require biometric verification for all signatures</span>
                      </label>
                    </div>
                    
                    <div>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" defaultChecked />
                        <span className="ml-2 text-sm text-gray-700">Enable multi-factor authentication for wallet access</span>
                      </label>
                    </div>
                    
                    <div>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" defaultChecked />
                        <span className="ml-2 text-sm text-gray-700">Automatically suspend access after 5 failed attempts</span>
                      </label>
                    </div>
                    
                    <div>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
                        <span className="ml-2 text-sm text-gray-700">Require ID verification renewal every 6 months</span>
                      </label>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Credential Expiration Period</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                        <option>1 year</option>
                        <option>6 months</option>
                        <option>3 months</option>
                        <option>1 month</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="px-6 py-3 border-t">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                      Update Security Settings
                    </button>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow">
                  <div className="p-4 border-b">
                    <h3 className="font-bold">Integration Settings</h3>
                  </div>
                  
                  <div className="p-6 space-y-4">
                    <div>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" defaultChecked />
                        <span className="ml-2 text-sm text-gray-700">Microsoft 365 Integration</span>
                      </label>
                    </div>
                    
                    <div>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" defaultChecked />
                        <span className="ml-2 text-sm text-gray-700">Building Access System</span>
                      </label>
                    </div>
                    
                    <div>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" defaultChecked />
                        <span className="ml-2 text-sm text-gray-700">Digital Signature Service</span>
                      </label>
                    </div>
                    
                    <div>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" defaultChecked />
                        <span className="ml-2 text-sm text-gray-700">Encrypted Email Service</span>
                      </label>
                    </div>
                    
                    <div className="pt-2">
                      <button className="px-3 py-1 text-sm text-blue-600 border border-blue-200 rounded hover:bg-blue-50">
                        Configure API Keys
                      </button>
                    </div>
                  </div>
                  
                  <div className="px-6 py-3 border-t">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                      Save Integration Settings
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPortal;
                      ))}
                    </tbody>
                  </table>
                </div>
                
                {filteredUsers.length === 0 && (
                  <div className="py-6 text-center text-gray-500">
                    No users found matching your search criteria
                  </div>
                )}
                
                <div className="px-6 py-3 border-t flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    Showing {filteredUsers.length} of {users.length} users
                  </div>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 border border-gray-300 rounded bg-white text-gray-700 hover:bg-gray-50">
                      Previous
                    </button>
                    <button className="px-3 py-1 border border-gray-300 rounded bg-white text-gray-700 hover:bg-gray-50">
                      Next
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Selected User Details */}
              {selectedUser && (
                <div className="bg-white rounded-lg shadow mb-6">
                  <div className="p-4 border-b flex justify-between items-center">
                    <h3 className="text-lg font-bold">User Details</h3>
                    <button 
                      onClick={() => setSelectedUser(null)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <X size={20} />
                    </button>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/3 mb-6 md:mb-0">
                        <div className="flex items-center mb-4">
                          <img 
                            src={selectedUser.photo} 
                            alt={selectedUser.name} 
                            className="w-20 h-20 rounded-full mr-4"
                          />
                          <div>
                            <h4 className="text-xl font-bold">{selectedUser.name}</h4>
                            <p className="text-gray-600">{selectedUser.title}</p>
                            <p className="text-sm text-gray-500">{selectedUser.department}</p>
                            <div className="mt-2">
                              {renderStatusBadge(selectedUser.status)}
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-4 space-y-3">
                          <div>
                            <label className="block text-xs text-gray-500">Email</label>
                            <div className="text-sm">{selectedUser.email}</div>
                          </div>
                          
                          <div>
                            <label className="block text-xs text-gray-500">Created</label>
                            <div className="text-sm">{selectedUser.createdAt}</div>
                          </div>
                          
                          {selectedUser.did && (
                            <div>
                              <label className="block text-xs text-gray-500">DID</label>
                              <div className="text-sm font-mono text-xs truncate">{selectedUser.did}</div>
                            </div>
                          )}
                          
                          <div>
                            <label className="block text-xs text-gray-500">Building Access</label>
                            <div className="text-sm">
                              {selectedUser.accessGroups.join(', ')}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="md:w-2/3 md:pl-6 md:border-l">
                        <div className="flex mb-4 border-b">
                          <button 
                            className="px-4 py-2 text-sm font-medium text-blue-600 border-b-2 border-blue-600"
                          >
                            Credentials
                          </button>
                          <button 
                            className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700"
                          >
                            Auth History
                          </button>
                          <button 
                            className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700"
                          >
                            Permissions
                          </button>
                        </div>
                        
                        {selectedUser.credentials.length > 0 ? (
                          <div className="space-y-3">
                            {selectedUser.credentials.map((credential, index) => (
                              <div key={index} className="border rounded-md p-3 hover:bg-gray-50">
                                <div className="flex items-start justify-between">
                                  <div>
                                    <div className="font-medium">{credential.name}</div>
                                    <div className="text-xs text-gray-500">Issued by: {credential.issuer}</div>
                                    <div className="flex space-x-4 mt-1 text-xs text-gray-500">
                                      <span>Issued: {credential.issued}</span>
                                      <span>Expires: {credential.expires}</span>
                                    </div>
                                  </div>
                                  <Award size={20} className="text-blue-600 flex-shrink-0" />
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-8 text-gray-500">
                            <Award size={48} className="mx-auto mb-2 opacity-30" />
                            <p>No credentials issued yet</p>
                            {selectedUser.status === 'active' && (
                              <button className="mt-2 text-sm text-blue-600 hover:text-blue-800">
                                Issue Credential
                              </button>
                            )};