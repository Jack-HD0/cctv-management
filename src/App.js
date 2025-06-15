import React, { useState } from 'react';
import { Camera, CheckCircle, AlertTriangle, Settings, Users, FileText, Clock, Search, Menu, X, User, LogOut, Plus, Edit, Trash2, RotateCcw, Download, RefreshCw } from 'lucide-react';
import './App.css';

const CCTVManagementSystem = () => {
  // Authentication state
  const [currentUser, setCurrentUser] = useState(null);
  const [showLogin, setShowLogin] = useState(true);
  
  // Navigation state
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Modal states
  const [selectedCamera, setSelectedCamera] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showCameraModal, setShowCameraModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showCheckModal, setShowCheckModal] = useState(false);
  const [showRetireModal, setShowRetireModal] = useState(false);
  
  // Form states
  const [checkForm, setCheckForm] = useState({
    working: true,
    lens: true,
    position: true,
    lighting: true,
    issuesFound: false,
    issueDescription: '',
    additionalNotes: ''
  });

  const [userForm, setUserForm] = useState({
    name: '',
    email: '',
    role: '',
    company: '',
    phone: '',
    status: 'active'
  });

  const [cameraForm, setCameraForm] = useState({
    name: '',
    location: '',
    asset_tag: '',
    serial_number: '',
    ip_address: '',
    model: '',
    assignedTo: '',
    priority: 'medium',
    inspectionNotes: ''
  });
  
  // Search and filter
  const [cameraSearch, setCameraSearch] = useState('');
  const [userSearch, setUserSearch] = useState('');

  // Sample data
  const [cameras, setCameras] = useState([
    {
      id: 'CAM001',
      name: 'Front Entrance Camera',
      location: 'Main Entrance - Building A',
      asset_tag: 'FS-CAM-001',
      serial_number: 'SN123456789',
      ip_address: '192.168.1.101',
      model: 'Hikvision DS-2CD2143G0-I',
      lastChecked: '2025-05-28',
      inspectionNotes: 'Previous check: lens cleaned, all functions normal',
      assignedTo: 'John Smith',
      priority: 'high',
      status: 'overdue',
      freshservice_id: '12345',
      retired: false
    },
    {
      id: 'CAM002',
      name: 'Parking Lot Camera A',
      location: 'North Parking Area',
      asset_tag: 'FS-CAM-002',
      serial_number: 'SN123456790',
      ip_address: '192.168.1.102',
      model: 'Axis P3245-LVE',
      lastChecked: '2025-05-15',
      inspectionNotes: 'Previous check: slight dirt on lens',
      assignedTo: 'John Smith',
      priority: 'medium',
      status: 'overdue',
      freshservice_id: '12346',
      retired: false
    },
    {
      id: 'CAM003',
      name: 'Loading Bay Camera',
      location: 'Service Entrance - Dock 3',
      asset_tag: 'FS-CAM-003',
      serial_number: 'SN123456791',
      ip_address: '192.168.1.103',
      model: 'Dahua IPC-HFW4431R-Z',
      lastChecked: '2025-06-02',
      inspectionNotes: 'Previous check: clear view, good condition',
      assignedTo: 'John Smith',
      priority: 'low',
      status: 'recent',
      freshservice_id: '12347',
      retired: false
    },
    {
      id: 'CAM004',
      name: 'Emergency Exit Camera',
      location: 'East Wing - Fire Exit 2',
      asset_tag: 'FS-CAM-004',
      serial_number: 'SN123456792',
      ip_address: '192.168.1.104',
      model: 'Hikvision DS-2CD2143G0-I',
      lastChecked: '2025-05-20',
      inspectionNotes: '',
      assignedTo: 'Mike Johnson',
      priority: 'high',
      status: 'overdue',
      freshservice_id: '12348',
      retired: false
    },
    {
      id: 'CAM005',
      name: 'Reception Area Camera',
      location: 'Main Lobby - Visitor Desk',
      asset_tag: 'FS-CAM-005',
      serial_number: 'SN123456793',
      ip_address: '192.168.1.105',
      model: 'Axis M3045-V',
      lastChecked: '2025-06-01',
      inspectionNotes: 'Previous check: functioning normally',
      assignedTo: 'Sarah Wilson',
      priority: 'medium',
      status: 'due-soon',
      freshservice_id: '12349',
      retired: false
    },
    {
      id: 'CAM006',
      name: 'Warehouse Camera 1',
      location: 'Warehouse Section A',
      asset_tag: 'FS-CAM-006',
      serial_number: 'SN123456794',
      ip_address: '192.168.1.106',
      model: 'Dahua IPC-HFW4431R-Z',
      lastChecked: '2025-05-30',
      inspectionNotes: 'Working well, good coverage',
      assignedTo: 'Mike Johnson',
      priority: 'medium',
      status: 'recent',
      freshservice_id: '12350',
      retired: false
    },
    {
      id: 'CAM007',
      name: 'Old Security Camera',
      location: 'Former Back Gate',
      asset_tag: 'FS-CAM-007',
      serial_number: 'SN123456795',
      ip_address: '192.168.1.107',
      model: 'Legacy Model XY-2019',
      lastChecked: '2025-04-15',
      inspectionNotes: 'Retired due to location closure',
      assignedTo: null,
      priority: 'low',
      status: 'retired',
      freshservice_id: '12351',
      retired: true
    },
    {
      id: 'CAM008',
      name: 'Damaged Parking Camera',
      location: 'South Parking (Damaged)',
      asset_tag: 'FS-CAM-008',
      serial_number: 'SN123456796',
      ip_address: '192.168.1.108',
      model: 'Hikvision DS-2CD2143G0-I',
      lastChecked: '2025-03-20',
      inspectionNotes: 'Camera damaged in storm, retired',
      assignedTo: null,
      priority: 'low',
      status: 'retired',
      freshservice_id: '12352',
      retired: true
    }
  ]);

  const [users, setUsers] = useState([
    {
      id: 'USER001',
      name: 'John Smith',
      email: 'john@securetech.com',
      role: 'contractor',
      company: 'SecureTech Ltd',
      status: 'active',
      lastLogin: '2025-06-04',
      phone: '+44 7700 900123'
    },
    {
      id: 'USER002',
      name: 'Sarah Wilson',
      email: 'admin@site.com',
      role: 'admin',
      company: 'Site Management',
      status: 'active',
      lastLogin: '2025-06-04',
      phone: '+44 7700 900124'
    },
    {
      id: 'USER003',
      name: 'Mike Johnson',
      email: 'mike@contractors.com',
      role: 'contractor',
      company: 'Security Solutions',
      status: 'active',
      lastLogin: '2025-06-03',
      phone: '+44 7700 900125'
    },
    {
      id: 'USER004',
      name: 'Emma Davis',
      email: 'emma@sitemanage.com',
      role: 'manager',
      company: 'Site Management',
      status: 'active',
      lastLogin: '2025-06-02',
      phone: '+44 7700 900126'
    },
    {
      id: 'USER005',
      name: 'Tom Wilson',
      email: 'tom@newcompany.com',
      role: 'contractor',
      company: 'New Security Co',
      status: 'pending',
      lastLogin: 'Never',
      phone: '+44 7700 900127'
    }
  ]);

  // Helper functions
  const login = (role) => {
    if (role === 'admin') {
      setCurrentUser({
        id: 'USER002',
        name: 'Sarah Wilson',
        email: 'admin@site.com',
        role: 'admin',
        company: 'Site Management'
      });
    } else {
      setCurrentUser({
        id: 'USER001',
        name: 'John Smith',
        email: 'john@securetech.com',
        role: 'contractor',
        company: 'SecureTech Ltd'
      });
    }
    setShowLogin(false);
    setActiveSection(role === 'admin' ? 'admin-dashboard' : 'dashboard');
  };

  const logout = () => {
    setCurrentUser(null);
    setShowLogin(true);
    setSidebarOpen(false);
  };

  const getStats = () => {
    const today = '2025-06-04';
    const activeCameras = cameras.filter(c => !c.retired);
    
    if (currentUser?.role === 'contractor') {
      const assigned = activeCameras.filter(c => c.assignedTo === currentUser.name);
      return {
        assigned: assigned.length,
        checkedToday: assigned.filter(c => c.lastChecked === today).length,
        overdue: assigned.filter(c => c.status === 'overdue').length
      };
    } else {
      return {
        totalCameras: cameras.length,
        activeCameras: activeCameras.length,
        overdue: activeCameras.filter(c => c.status === 'overdue').length,
        retired: cameras.filter(c => c.retired).length
      };
    }
  };

  const getPriorityBadge = (priority) => {
    const badges = {
      high: 'priority-high',
      medium: 'priority-medium',
      low: 'priority-low'
    };
    return badges[priority] || badges.medium;
  };

  const getStatusBadge = (camera) => {
    if (camera.retired) return 'status-retired';
    if (camera.status === 'overdue') return 'status-overdue';
    if (camera.status === 'recent') return 'status-recent';
    if (camera.status === 'due-soon') return 'status-due-soon';
    return 'status-default';
  };

  const getStatusIcon = (camera) => {
    const today = '2025-06-04';
    if (camera.retired) return '⚫';
    if (camera.lastChecked === today) return '✅';
    if (camera.status === 'overdue') return '⚠️';
    return '🕐';
  };

  const performCheck = (camera) => {
    setSelectedCamera(camera);
    setShowCheckModal(true);
    setCheckForm({
      working: true,
      lens: true,
      position: true,
      lighting: true,
      issuesFound: false,
      issueDescription: '',
      additionalNotes: ''
    });
  };

  const completeCheck = () => {
    if (!selectedCamera) return;
    
    const today = '2025-06-04';
    let notes = checkForm.additionalNotes.trim();
    if (checkForm.issuesFound && checkForm.issueDescription.trim()) {
      notes += (notes ? ' - ' : '') + `ISSUES: ${checkForm.issueDescription.trim()}`;
    }
    
    setCameras(prev => prev.map(camera => 
      camera.id === selectedCamera.id 
        ? { 
            ...camera, 
            lastChecked: today, 
            inspectionNotes: notes || 'Check completed - no issues reported',
            status: 'recent'
          }
        : camera
    ));
    
    setShowCheckModal(false);
    setSelectedCamera(null);
  };

  // User Management Functions
  const addNewUser = () => {
    setSelectedUser(null);
    setUserForm({
      name: '',
      email: '',
      role: '',
      company: '',
      phone: '',
      status: 'active'
    });
    setShowUserModal(true);
  };

  const editUser = (user) => {
    setSelectedUser(user);
    setUserForm({
      name: user.name,
      email: user.email,
      role: user.role,
      company: user.company,
      phone: user.phone,
      status: user.status
    });
    setShowUserModal(true);
  };

  const saveUser = () => {
    if (!userForm.name || !userForm.email || !userForm.role) {
      alert('Please fill in all required fields (Name, Email, Role)');
      return;
    }

    if (selectedUser) {
      // Update existing user
      setUsers(prev => prev.map(user => 
        user.id === selectedUser.id 
          ? { ...user, ...userForm }
          : user
      ));
    } else {
      // Add new user
      const newUser = {
        id: `USER${String(users.length + 1).padStart(3, '0')}`,
        ...userForm,
        lastLogin: 'Never'
      };
      setUsers(prev => [...prev, newUser]);
    }
    
    setShowUserModal(false);
    setSelectedUser(null);
  };

  const deleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(prev => prev.filter(user => user.id !== userId));
    }
  };

  // Camera Management Functions
  const addNewCamera = () => {
    setSelectedCamera(null);
    setCameraForm({
      name: '',
      location: '',
      asset_tag: '',
      serial_number: '',
      ip_address: '',
      model: '',
      assignedTo: '',
      priority: 'medium',
      inspectionNotes: ''
    });
    setShowCameraModal(true);
  };

  const editCamera = (camera) => {
    setSelectedCamera(camera);
    setCameraForm({
      name: camera.name,
      location: camera.location,
      asset_tag: camera.asset_tag,
      serial_number: camera.serial_number,
      ip_address: camera.ip_address,
      model: camera.model,
      assignedTo: camera.assignedTo || '',
      priority: camera.priority,
      inspectionNotes: camera.inspectionNotes
    });
    setShowCameraModal(true);
  };

  const saveCamera = () => {
    if (!cameraForm.name || !cameraForm.location) {
      alert('Please fill in all required fields (Name, Location)');
      return;
    }

    if (selectedCamera) {
      // Update existing camera
      setCameras(prev => prev.map(camera => 
        camera.id === selectedCamera.id 
          ? { ...camera, ...cameraForm }
          : camera
      ));
    } else {
      // Add new camera
      const newCamera = {
        id: `CAM${String(cameras.length + 1).padStart(3, '0')}`,
        ...cameraForm,
        lastChecked: null,
        status: 'pending',
        freshservice_id: null,
        retired: false
      };
      setCameras(prev => [...prev, newCamera]);
    }
    
    setShowCameraModal(false);
    setSelectedCamera(null);
  };

  const retireCamera = (camera) => {
    setSelectedCamera(camera);
    setShowRetireModal(true);
  };

  const confirmRetireCamera = () => {
    if (!selectedCamera) return;
    
    setCameras(prev => prev.map(camera => 
      camera.id === selectedCamera.id 
        ? { 
            ...camera, 
            retired: true,
            status: 'retired',
            assignedTo: null
          }
        : camera
    ));
    
    setShowRetireModal(false);
    setSelectedCamera(null);
  };

  const reactivateCamera = (camera) => {
    setCameras(prev => prev.map(c => 
      c.id === camera.id 
        ? { 
            ...c, 
            retired: false,
            status: 'pending'
          }
        : c
    ));
  };

  const syncWithFreshservice = () => {
    alert('Successfully synced with Freshservice! 3 cameras updated.');
  };

  const exportCameraData = () => {
    const headers = ['Name', 'Location', 'Serial Number', 'IP Address', 'Model', 'Assigned To', 'Status', 'Last Checked'];
    const csvData = cameras.map(camera => [
      camera.name,
      camera.location,
      camera.serial_number,
      camera.ip_address,
      camera.model,
      camera.assignedTo || 'Unassigned',
      camera.retired ? 'Retired' : camera.status,
      camera.lastChecked || 'Never'
    ]);
    
    const csvContent = [headers, ...csvData]
      .map(row => row.map(field => `"${field}"`).join(','))
      .join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `camera_inventory_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const filteredCameras = () => {
    let filtered = cameras;
    
    // Filter by section
    if (activeSection === 'my-cameras' && currentUser?.role === 'contractor') {
      filtered = filtered.filter(c => c.assignedTo === currentUser.name && !c.retired);
    } else if (activeSection === 'overdue') {
      filtered = filtered.filter(c => c.status === 'overdue' && !c.retired);
      if (currentUser?.role === 'contractor') {
        filtered = filtered.filter(c => c.assignedTo === currentUser.name);
      }
    } else if (activeSection === 'completed') {
      filtered = filtered.filter(c => c.lastChecked === '2025-06-04' && !c.retired);
      if (currentUser?.role === 'contractor') {
        filtered = filtered.filter(c => c.assignedTo === currentUser.name);
      }
    } else if (activeSection === 'dashboard' && currentUser?.role === 'contractor') {
      filtered = filtered.filter(c => c.assignedTo === currentUser.name && !c.retired);
    }
    
    // Apply search filter
    if (cameraSearch) {
      filtered = filtered.filter(camera => 
        camera.name.toLowerCase().includes(cameraSearch.toLowerCase()) ||
        camera.location.toLowerCase().includes(cameraSearch.toLowerCase()) ||
        camera.serial_number.toLowerCase().includes(cameraSearch.toLowerCase())
      );
    }
    
    return filtered;
  };

  const filteredUsers = () => {
    if (!userSearch) return users;
    return users.filter(user => 
      user.name.toLowerCase().includes(userSearch.toLowerCase()) ||
      user.email.toLowerCase().includes(userSearch.toLowerCase()) ||
      user.role.toLowerCase().includes(userSearch.toLowerCase())
    );
  };

  // Login Page
  if (showLogin) {
    return (
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <div className="login-logo">
              <Camera size={32} />
            </div>
            <h1 className="login-title">CCTV Management</h1>
            <p className="login-subtitle">Sign in to your account</p>
          </div>
          
          <div className="demo-accounts">
            <div className="demo-title">Demo Accounts - Click to Login</div>
            
            <button
              onClick={() => login('admin')}
              className="demo-account"
            >
              <div className="demo-account-info">
                <div className="demo-account-role">Site Manager</div>
                <div className="demo-account-email">admin@site.com</div>
              </div>
              <span className="demo-account-badge admin-badge">ADMIN</span>
            </button>
            
            <button
              onClick={() => login('contractor')}
              className="demo-account"
            >
              <div className="demo-account-info">
                <div className="demo-account-role">Field Contractor</div>
                <div className="demo-account-email">john@securetech.com</div>
              </div>
              <span className="demo-account-badge contractor-badge">CONTRACTOR</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  const stats = getStats();

  return (
    <div className="app-container">
      {/* Top Header */}
      <div className="top-header">
        <div className="header-left">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="menu-toggle lg:hidden"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <div className="logo">
            <Camera size={16} />
          </div>
          <h1 className="header-title">
            {currentUser?.role === 'admin' ? 'CCTV Admin Portal' : 'CCTV Contractor Portal'}
          </h1>
        </div>
        
        <div className="header-right">
          <div className="user-info">
            <div className="user-avatar">
              {currentUser?.name.split(' ').map(n => n[0]).join('')}
            </div>
            <span className="user-name">{currentUser?.name}</span>
            <span className={`user-role-badge ${currentUser?.role === 'admin' ? 'admin-badge' : 'contractor-badge'}`}>
              {currentUser?.role.toUpperCase()}
            </span>
          </div>
          <button onClick={logout} className="logout-btn">
            <LogOut size={16} />
          </button>
        </div>
      </div>

      <div className="main-layout">
        {/* Sidebar */}
        <div className={`sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}>
          <div className="sidebar-content">
            {/* Contractor Navigation */}
            {currentUser?.role === 'contractor' && (
              <>
                <div className="nav-section">
                  <h3 className="nav-section-title">Camera Management</h3>
                  <nav className="nav-list">
                    <button
                      onClick={() => { setActiveSection('dashboard'); setSidebarOpen(false); }}
                      className={`nav-item ${activeSection === 'dashboard' ? 'active' : ''}`}
                    >
                      <FileText size={16} />
                      Dashboard
                    </button>
                    <button
                      onClick={() => { setActiveSection('my-cameras'); setSidebarOpen(false); }}
                      className={`nav-item ${activeSection === 'my-cameras' ? 'active' : ''}`}
                    >
                      <Camera size={16} />
                      My Cameras
                      <span className="nav-badge">{stats.assigned}</span>
                    </button>
                    <button
                      onClick={() => { setActiveSection('overdue'); setSidebarOpen(false); }}
                      className={`nav-item ${activeSection === 'overdue' ? 'active' : ''}`}
                    >
                      <AlertTriangle size={16} />
                      Overdue Checks
                      <span className="nav-badge urgent">{stats.overdue}</span>
                    </button>
                    <button
                      onClick={() => { setActiveSection('completed'); setSidebarOpen(false); }}
                      className={`nav-item ${activeSection === 'completed' ? 'active' : ''}`}
                    >
                      <CheckCircle size={16} />
                      Today's Checks
                      <span className="nav-badge success">{stats.checkedToday}</span>
                    </button>
                  </nav>
                </div>
              </>
            )}

            {/* Admin Navigation */}
            {currentUser?.role === 'admin' && (
              <>
                <div className="nav-section">
                  <h3 className="nav-section-title">Dashboard</h3>
                  <nav className="nav-list">
                    <button
                      onClick={() => { setActiveSection('admin-dashboard'); setSidebarOpen(false); }}
                      className={`nav-item ${activeSection === 'admin-dashboard' ? 'active' : ''}`}
                    >
                      <FileText size={16} />
                      Overview
                    </button>
                  </nav>
                </div>

                <div className="nav-section">
                  <h3 className="nav-section-title">Asset Management</h3>
                  <nav className="nav-list">
                    <button
                      onClick={() => { setActiveSection('camera-management'); setSidebarOpen(false); }}
                      className={`nav-item ${activeSection === 'camera-management' ? 'active' : ''}`}
                    >
                      <Camera size={16} />
                      Camera Management
                      <span className="nav-badge">{stats.totalCameras}</span>
                    </button>
                    <button
                      onClick={() => { setActiveSection('all-cameras'); setSidebarOpen(false); }}
                      className={`nav-item ${activeSection === 'all-cameras' ? 'active' : ''}`}
                    >
                      <FileText size={16} />
                      All Cameras List
                    </button>
                  </nav>
                </div>

                <div className="nav-section">
                  <h3 className="nav-section-title">User Management</h3>
                  <nav className="nav-list">
                    <button
                      onClick={() => { setActiveSection('users'); setSidebarOpen(false); }}
                      className={`nav-item ${activeSection === 'users' ? 'active' : ''}`}
                    >
                      <Users size={16} />
                      All Users
                      <span className="nav-badge">{users.length}</span>
                    </button>
                    <button
                      onClick={() => { setActiveSection('permissions'); setSidebarOpen(false); }}
                      className={`nav-item ${activeSection === 'permissions' ? 'active' : ''}`}
                    >
                      <Settings size={16} />
                      Permissions
                    </button>
                  </nav>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="main-content">
          {/* Content Header */}
          <div className="content-header">
            <div className="content-header-text">
              <h1 className="content-title">
                {activeSection === 'dashboard' && 'Dashboard'}
                {activeSection === 'admin-dashboard' && 'Admin Dashboard'}
                {activeSection === 'camera-management' && 'Camera Management'}
                {activeSection === 'all-cameras' && 'All Cameras List'}
                {activeSection === 'my-cameras' && 'My Cameras'}
                {activeSection === 'overdue' && 'Overdue Checks'}
                {activeSection === 'completed' && "Today's Checks"}
                {activeSection === 'users' && 'User Management'}
                {activeSection === 'permissions' && 'Permissions Management'}
              </h1>
              <p className="content-subtitle">
                {activeSection === 'dashboard' && 'Overview of your camera assignments'}
                {activeSection === 'admin-dashboard' && 'System overview and management'}
                {activeSection === 'camera-management' && 'Manage all camera assets with full edit capabilities'}
                {activeSection === 'all-cameras' && 'Complete camera inventory with technical details'}
                {activeSection === 'my-cameras' && 'Cameras assigned to you'}
                {activeSection === 'overdue' && 'Cameras that need immediate attention'}
                {activeSection === 'completed' && 'Cameras checked today'}
                {activeSection === 'users' && 'Manage users and permissions'}
                {activeSection === 'permissions' && 'Configure user roles and permissions'}
              </p>
            </div>
            <div className="content-actions">
              {activeSection === 'camera-management' && (
                <>
                  <button onClick={syncWithFreshservice} className="action-button">
                    <RefreshCw size={16} />
                    Sync with Freshservice
                  </button>
                  <button onClick={addNewCamera} className="action-button primary">
                    <Plus size={16} />
                    Add Camera
                  </button>
                </>
              )}
              {activeSection === 'all-cameras' && (
                <>
                  <button onClick={exportCameraData} className="action-button">
                    <Download size={16} />
                    Export Data
                  </button>
                  <button onClick={addNewCamera} className="action-button primary">
                    <Plus size={16} />
                    Add Camera
                  </button>
                </>
              )}
              {activeSection === 'users' && (
                <button
                  onClick={addNewUser}
                  className="action-button primary"
                >
                  <User size={16} />
                  Add User
                </button>
              )}
            </div>
          </div>

          {/* Content Body */}
          <div className="content-body">
            {/* Dashboard Stats */}
            {(activeSection === 'dashboard' || activeSection === 'admin-dashboard') && (
              <div className="stats-grid">
                {currentUser?.role === 'admin' ? (
                  <>
                    <div className="stat-card stat-blue">
                      <div className="stat-content">
                        <div className="stat-info">
                          <p className="stat-label">Total Cameras</p>
                          <p className="stat-number">{stats.totalCameras}</p>
                        </div>
                        <Camera size={24} />
                      </div>
                    </div>
                    <div className="stat-card stat-green">
                      <div className="stat-content">
                        <div className="stat-info">
                          <p className="stat-label">Active Cameras</p>
                          <p className="stat-number">{stats.activeCameras}</p>
                        </div>
                        <CheckCircle size={24} />
                      </div>
                    </div>
                    <div className="stat-card stat-red">
                      <div className="stat-content">
                        <div className="stat-info">
                          <p className="stat-label">Overdue</p>
                          <p className="stat-number">{stats.overdue}</p>
                        </div>
                        <AlertTriangle size={24} />
                      </div>
                    </div>
                    <div className="stat-card stat-gray">
                      <div className="stat-content">
                        <div className="stat-info">
                          <p className="stat-label">Retired</p>
                          <p className="stat-number">{stats.retired}</p>
                        </div>
                        <Clock size={24} />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="stat-card stat-blue">
                      <div className="stat-content">
                        <div className="stat-info">
                          <p className="stat-label">Assigned Cameras</p>
                          <p className="stat-number">{stats.assigned}</p>
                        </div>
                        <Camera size={24} />
                      </div>
                    </div>
                    <div className="stat-card stat-green">
                      <div className="stat-content">
                        <div className="stat-info">
                          <p className="stat-label">Checked Today</p>
                          <p className="stat-number">{stats.checkedToday}</p>
                        </div>
                        <CheckCircle size={24} />
                      </div>
                    </div>
                    <div className="stat-card stat-red">
                      <div className="stat-content">
                        <div className="stat-info">
                          <p className="stat-label">Overdue Checks</p>
                          <p className="stat-number">{stats.overdue}</p>
                        </div>
                        <AlertTriangle size={24} />
                      </div>
                    </div>
                    <div className="stat-card stat-yellow">
                      <div className="stat-content">
                        <div className="stat-info">
                          <p className="stat-label">Pending Auth</p>
                          <p className="stat-number">0</p>
                        </div>
                        <Clock size={24} />
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Search Bar for Grid Views */}
            {!['all-cameras', 'users', 'permissions'].includes(activeSection) && (
              <div className="search-container">
                <div className="search-box-container">
                  <Search className="search-icon" size={16} />
                  <input
                    type="text"
                    placeholder="Search cameras..."
                    value={cameraSearch}
                    onChange={(e) => setCameraSearch(e.target.value)}
                    className="search-input"
                  />
                </div>
              </div>
            )}

            {/* Camera Grid View */}
            {!['all-cameras', 'users', 'permissions'].includes(activeSection) && (
              <div className="cameras-grid">
                {filteredCameras().map(camera => (
                  <div key={camera.id} className={`camera-card ${camera.retired ? 'camera-retired' : ''}`}>
                    <div className="camera-header">
                      <div className="camera-info">
                        <div className="camera-title">
                          <Camera size={20} />
                          <h3>{camera.name}</h3>
                        </div>
                        <p className="camera-location">
                          📍 {camera.location}
                        </p>
                        <div className="camera-badges">
                          <span className={`badge ${getStatusBadge(camera)}`}>
                            {camera.retired ? 'RETIRED' : camera.status.replace('-', ' ').toUpperCase()}
                          </span>
                          <span className={`badge priority ${getPriorityBadge(camera.priority)}`}>
                            {camera.priority.toUpperCase()}
                          </span>
                        </div>
                      </div>
                      <div className="camera-status-icon">
                        {getStatusIcon(camera)}
                      </div>
                    </div>
                    
                    <div className="camera-details">
                      <div className="detail-grid">
                        <div className="detail-item">
                          <span className="detail-label">Serial:</span>
                          <p className="detail-value mono">{camera.serial_number}</p>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">IP Address:</span>
                          <p className="detail-value mono">{camera.ip_address}</p>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Model:</span>
                          <p className="detail-value">{camera.model}</p>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Assigned To:</span>
                          <p className="detail-value">{camera.assignedTo || 'Unassigned'}</p>
                        </div>
                      </div>
                      <div className="detail-item full-width">
                        <span className="detail-label">Last Checked:</span>
                        <span className={`detail-value ${camera.status === 'overdue' ? 'overdue' : ''}`}>
                          {camera.lastChecked ? new Date(camera.lastChecked).toLocaleDateString() : 'Never'}
                        </span>
                      </div>
                      {camera.inspectionNotes && (
                        <div className="detail-item full-width">
                          <span className="detail-label">Previous Notes:</span>
                          <div className="previous-notes">
                            {camera.inspectionNotes}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {!camera.retired ? (
                      <button
                        onClick={() => performCheck(camera)}
                        className="check-button enabled"
                        disabled={camera.lastChecked === '2025-06-04'}
                      >
                        {camera.lastChecked === '2025-06-04' ? (
                          <>
                            <CheckCircle size={16} />
                            Already Checked Today
                          </>
                        ) : (
                          <>
                            <Camera size={16} />
                            Perform Check
                          </>
                        )}
                      </button>
                    ) : (
                      <div className="check-button disabled">
                        Camera Retired
                      </div>
                    )}

                    {currentUser?.role === 'admin' && (
                      <div className="admin-actions">
                        <button
                          onClick={() => editCamera(camera)}
                          className="admin-btn edit"
                        >
                          ✏️ Edit
                        </button>
                        {!camera.retired ? (
                          <button
                            onClick={() => retireCamera(camera)}
                            className="admin-btn retire"
                          >
                            🗑️ Retire
                          </button>
                        ) : (
                          <button
                            onClick={() => reactivateCamera(camera)}
                            className="admin-btn reactivate"
                          >
                            🔄 Reactivate
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* All Cameras Table View */}
            {activeSection === 'all-cameras' && (
              <div className="data-table">
                <div className="table-header">
                  <h3 className="table-title">Camera Inventory</h3>
                  <div className="search-box-container">
                    <Search className="search-icon" size={16} />
                    <input
                      type="text"
                      placeholder="Search cameras..."
                      value={cameraSearch}
                      onChange={(e) => setCameraSearch(e.target.value)}
                      className="search-input"
                    />
                  </div>
                </div>
                <div className="table-container">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Location</th>
                        <th>Serial Number</th>
                        <th>IP Address</th>
                        <th>Assigned To</th>
                        <th>Status</th>
                        <th>Last Check</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredCameras().map(camera => (
                        <tr key={camera.id} className={camera.retired ? 'row-retired' : ''}>
                          <td className="font-medium">{camera.name}</td>
                          <td>{camera.location}</td>
                          <td className="mono">{camera.serial_number}</td>
                          <td className="mono">{camera.ip_address}</td>
                          <td>{camera.assignedTo || 'Unassigned'}</td>
                          <td>
                            <span className={`badge ${getStatusBadge(camera)}`}>
                              {camera.retired ? 'RETIRED' : camera.status.replace('-', ' ').toUpperCase()}
                            </span>
                          </td>
                          <td>
                            {camera.lastChecked ? new Date(camera.lastChecked).toLocaleDateString() : 'Never'}
                          </td>
                          <td>
                            <div className="table-actions">
                              <button
                                onClick={() => editCamera(camera)}
                                className="table-action-btn edit"
                                title="Edit"
                              >
                                <Edit size={16} />
                              </button>
                              {!camera.retired ? (
                                <button
                                  onClick={() => retireCamera(camera)}
                                  className="table-action-btn retire"
                                  title="Retire"
                                >
                                  <Trash2 size={16} />
                                </button>
                              ) : (
                                <button
                                  onClick={() => reactivateCamera(camera)}
                                  className="table-action-btn reactivate"
                                  title="Reactivate"
                                >
                                  <RotateCcw size={16} />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Users Table View */}
            {activeSection === 'users' && (
              <div className="data-table">
                <div className="table-header">
                  <h3 className="table-title">System Users</h3>
                  <div className="search-box-container">
                    <Search className="search-icon" size={16} />
                    <input
                      type="text"
                      placeholder="Search users..."
                      value={userSearch}
                      onChange={(e) => setUserSearch(e.target.value)}
                      className="search-input"
                    />
                  </div>
                </div>
                <div className="table-container">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Company</th>
                        <th>Status</th>
                        <th>Last Login</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers().map(user => (
                        <tr key={user.id}>
                          <td className="font-medium">{user.name}</td>
                          <td>{user.email}</td>
                          <td>
                            <span className={`badge role-${user.role}`}>
                              {user.role.toUpperCase()}
                            </span>
                          </td>
                          <td>{user.company}</td>
                          <td>
                            <span className={`badge status-${user.status}`}>
                              {user.status.toUpperCase()}
                            </span>
                          </td>
                          <td>
                            {user.lastLogin !== 'Never' ? new Date(user.lastLogin).toLocaleDateString() : 'Never'}
                          </td>
                          <td>
                            <div className="table-actions">
                              <button
                                onClick={() => editUser(user)}
                                className="table-action-btn edit"
                                title="Edit"
                              >
                                <Edit size={16} />
                              </button>
                              <button 
                                onClick={() => deleteUser(user.id)}
                                className="table-action-btn retire" 
                                title="Delete"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Permissions View */}
            {activeSection === 'permissions' && (
              <div className="permissions-container">
                <div className="permissions-cards">
                  <div className="permission-card">
                    <div className="permission-role admin">Admin</div>
                    <div className="permission-description">Full system access</div>
                  </div>
                  <div className="permission-card">
                    <div className="permission-role manager">Manager</div>
                    <div className="permission-description">Site oversight</div>
                  </div>
                  <div className="permission-card">
                    <div className="permission-role contractor">Contractor</div>
                    <div className="permission-description">Assigned cameras only</div>
                  </div>
                </div>

                <div className="permissions-matrix">
                  <h3 className="matrix-title">Role Permissions Matrix</h3>
                  <div className="table-container">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Permission</th>
                          <th>Admin</th>
                          <th>Manager</th>
                          <th>Contractor</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { permission: 'View all cameras', admin: '✅', manager: '✅', contractor: '❌' },
                          { permission: 'Perform camera checks', admin: '✅', manager: '⚠️', contractor: '✅' },
                          { permission: 'Edit camera details', admin: '✅', manager: '⚠️', contractor: '❌' },
                          { permission: 'Retire cameras', admin: '✅', manager: '❌', contractor: '❌' },
                          { permission: 'Manage users', admin: '✅', manager: '❌', contractor: '❌' },
                          { permission: 'System settings', admin: '✅', manager: '❌', contractor: '❌' }
                        ].map((row, index) => (
                          <tr key={index}>
                            <td>{row.permission}</td>
                            <td className="text-center text-lg">{row.admin}</td>
                            <td className="text-center text-lg">{row.manager}</td>
                            <td className="text-center text-lg">{row.contractor}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="permission-legend">
                    <h4 className="legend-title">Permission Legend:</h4>
                    <div className="legend-items">
                      <div>✅ Full access</div>
                      <div>⚠️ Limited access (own assignments/sites only)</div>
                      <div>❌ No access</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* User Modal */}
      {showUserModal && (
        <div className="modal-overlay">
          <div className="modal large">
            <div className="modal-header">
              <h3 className="modal-title">
                {selectedUser ? 'Edit User' : 'Add New User'}
              </h3>
              <p className="modal-subtitle">User account information</p>
            </div>

            <div className="modal-body">
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input
                    type="text"
                    value={userForm.name}
                    onChange={(e) => setUserForm(prev => ({ ...prev, name: e.target.value }))}
                    className="form-input"
                    placeholder="Enter full name"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Email *</label>
                  <input
                    type="email"
                    value={userForm.email}
                    onChange={(e) => setUserForm(prev => ({ ...prev, email: e.target.value }))}
                    className="form-input"
                    placeholder="Enter email address"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Role *</label>
                  <select
                    value={userForm.role}
                    onChange={(e) => setUserForm(prev => ({ ...prev, role: e.target.value }))}
                    className="form-select"
                  >
                    <option value="">Select role...</option>
                    <option value="contractor">Contractor</option>
                    <option value="manager">Site Manager</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Company</label>
                  <input
                    type="text"
                    value={userForm.company}
                    onChange={(e) => setUserForm(prev => ({ ...prev, company: e.target.value }))}
                    className="form-input"
                    placeholder="Enter company name"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Phone</label>
                  <input
                    type="tel"
                    value={userForm.phone}
                    onChange={(e) => setUserForm(prev => ({ ...prev, phone: e.target.value }))}
                    className="form-input"
                    placeholder="Enter phone number"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Status</label>
                  <select
                    value={userForm.status}
                    onChange={(e) => setUserForm(prev => ({ ...prev, status: e.target.value }))}
                    className="form-select"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="modal-actions">
              <button
                onClick={saveUser}
                className="modal-button primary"
              >
                {selectedUser ? 'Update User' : 'Add User'}
              </button>
              <button
                onClick={() => setShowUserModal(false)}
                className="modal-button secondary"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Camera Modal */}
      {showCameraModal && (
        <div className="modal-overlay">
          <div className="modal large">
            <div className="modal-header">
              <h3 className="modal-title">
                {selectedCamera ? 'Edit Camera' : 'Add New Camera'}
              </h3>
              <p className="modal-subtitle">Camera asset information</p>
            </div>

            <div className="modal-body">
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">Camera Name *</label>
                  <input
                    type="text"
                    value={cameraForm.name}
                    onChange={(e) => setCameraForm(prev => ({ ...prev, name: e.target.value }))}
                    className="form-input"
                    placeholder="Enter camera name"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Asset Tag</label>
                  <input
                    type="text"
                    value={cameraForm.asset_tag}
                    onChange={(e) => setCameraForm(prev => ({ ...prev, asset_tag: e.target.value }))}
                    className="form-input"
                    placeholder="Enter asset tag"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Location *</label>
                  <input
                    type="text"
                    value={cameraForm.location}
                    onChange={(e) => setCameraForm(prev => ({ ...prev, location: e.target.value }))}
                    className="form-input"
                    placeholder="Enter location"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Serial Number</label>
                  <input
                    type="text"
                    value={cameraForm.serial_number}
                    onChange={(e) => setCameraForm(prev => ({ ...prev, serial_number: e.target.value }))}
                    className="form-input"
                    placeholder="Enter serial number"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">IP Address</label>
                  <input
                    type="text"
                    value={cameraForm.ip_address}
                    onChange={(e) => setCameraForm(prev => ({ ...prev, ip_address: e.target.value }))}
                    className="form-input"
                    placeholder="192.168.1.100"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Model</label>
                  <input
                    type="text"
                    value={cameraForm.model}
                    onChange={(e) => setCameraForm(prev => ({ ...prev, model: e.target.value }))}
                    className="form-input"
                    placeholder="Enter camera model"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Assigned To</label>
                  <select
                    value={cameraForm.assignedTo}
                    onChange={(e) => setCameraForm(prev => ({ ...prev, assignedTo: e.target.value }))}
                    className="form-select"
                  >
                    <option value="">Select contractor...</option>
                    {users.filter(u => u.role === 'contractor').map(user => (
                      <option key={user.id} value={user.name}>{user.name}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Priority</label>
                  <select
                    value={cameraForm.priority}
                    onChange={(e) => setCameraForm(prev => ({ ...prev, priority: e.target.value }))}
                    className="form-select"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>

              <div className="form-group full-width">
                <label className="form-label">Installation Notes</label>
                <textarea
                  value={cameraForm.inspectionNotes}
                  onChange={(e) => setCameraForm(prev => ({ ...prev, inspectionNotes: e.target.value }))}
                  placeholder="Installation notes, special instructions..."
                  className="textarea"
                  rows="3"
                />
              </div>
            </div>

            <div className="modal-actions">
              <button
                onClick={saveCamera}
                className="modal-button primary"
              >
                {selectedCamera ? 'Update Camera' : 'Add Camera'}
              </button>
              <button
                onClick={() => setShowCameraModal(false)}
                className="modal-button secondary"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Check Modal */}
      {showCheckModal && selectedCamera && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3 className="modal-title">
                Camera Check: {selectedCamera.name}
              </h3>
              <p className="modal-subtitle">{selectedCamera.location}</p>
            </div>

            <div className="modal-body">
              <div className="form-section">
                <h4 className="section-title">Camera Status Check</h4>
                <div className="checkbox-group">
                  {[
                    { key: 'working', label: 'Camera is working and recording' },
                    { key: 'lens', label: 'Lens is clean and clear' },
                    { key: 'position', label: 'Camera position is correct' },
                    { key: 'lighting', label: 'Lighting is adequate' }
                  ].map((check) => (
                    <div key={check.key} className="checkbox-item">
                      <input
                        type="checkbox"
                        id={check.key}
                        checked={checkForm[check.key]}
                        onChange={(e) => setCheckForm(prev => ({ ...prev, [check.key]: e.target.checked }))}
                        className="checkbox"
                      />
                      <label htmlFor={check.key} className="checkbox-label">{check.label}</label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="form-section">
                <div className="checkbox-item issues">
                  <input
                    type="checkbox"
                    id="issues-found"
                    checked={checkForm.issuesFound}
                    onChange={(e) => setCheckForm(prev => ({ ...prev, issuesFound: e.target.checked }))}
                    className="checkbox"
                  />
                  <label htmlFor="issues-found" className="checkbox-label">Issues found</label>
                </div>
                {checkForm.issuesFound && (
                  <textarea
                    value={checkForm.issueDescription}
                    onChange={(e) => setCheckForm(prev => ({ ...prev, issueDescription: e.target.value }))}
                    placeholder="Describe the issues found..."
                    className="textarea issues-textarea"
                    rows="3"
                  />
                )}
              </div>

              <div className="form-section">
                <label className="form-label">
                  Additional Notes (Optional)
                </label>
                <textarea
                  value={checkForm.additionalNotes}
                  onChange={(e) => setCheckForm(prev => ({ ...prev, additionalNotes: e.target.value }))}
                  placeholder="Any additional observations..."
                  className="textarea"
                  rows="3"
                />
              </div>
            </div>

            <div className="modal-actions">
              <button
                onClick={completeCheck}
                className="modal-button primary"
              >
                <CheckCircle size={18} />
                Complete Check
              </button>
              <button
                onClick={() => setShowCheckModal(false)}
                className="modal-button secondary"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Retire Camera Modal */}
      {showRetireModal && selectedCamera && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3 className="modal-title">Retire Camera</h3>
              <p className="modal-subtitle">Retire: {selectedCamera.name}</p>
            </div>

            <div className="modal-body">
              <div className="form-group">
                <label className="form-label">Reason for Retirement *</label>
                <select className="form-select">
                  <option value="">Select reason...</option>
                  <option value="end-of-life">End of Life</option>
                  <option value="damaged">Damaged/Broken</option>
                  <option value="replaced">Replaced with New Model</option>
                  <option value="location-change">Location No Longer Needed</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Additional Notes</label>
                <textarea
                  placeholder="Any additional information about the retirement..."
                  className="textarea"
                  rows="3"
                />
              </div>
            </div>

            <div className="modal-actions">
              <button
                onClick={confirmRetireCamera}
                className="modal-button danger"
              >
                Retire Camera
              </button>
              <button
                onClick={() => setShowRetireModal(false)}
                className="modal-button secondary"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

function App() {
  return <CCTVManagementSystem />;
}

export default App;