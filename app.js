const { useState, useEffect, useCallback } = React;

// Sample data
const initialData = {
  "farmers": [
    {
      "id": "1",
      "name": "राज कुमार शर्मा",
      "phone": "9876543210",
      "address": "गांव खुशीपुर, जिला मेरठ",
      "status": "active",
      "registration_date": "2025-01-15",
      "notes": "Premium milk supplier"
    },
    {
      "id": "2", 
      "name": "सुनीता देवी",
      "phone": "9876543211",
      "address": "गांव नंदपुर, जिला मेरठ",
      "status": "active",
      "registration_date": "2025-02-10",
      "notes": "Regular supplier"
    },
    {
      "id": "3",
      "name": "मुकेश यादव",
      "phone": "9876543212", 
      "address": "गांव रामपुर, जिला मेरठ",
      "status": "inactive",
      "registration_date": "2025-01-20",
      "notes": "Seasonal supplier"
    },
    {
      "id": "4",
      "name": "प्रीति अग्रवाल",
      "phone": "9876543213",
      "address": "गांव सरस्वतीपुर, जिला मेरठ", 
      "status": "active",
      "registration_date": "2025-03-05",
      "notes": "High quality milk"
    },
    {
      "id": "5",
      "name": "विनोद कुमार",
      "phone": "9876543214",
      "address": "गांव श्यामपुर, जिला मेरठ",
      "status": "active", 
      "registration_date": "2025-02-20",
      "notes": "Large quantity supplier"
    }
  ],
  "collections": [
    {
      "id": "1",
      "farmer_id": "1",
      "farmer_name": "राज कुमार शर्मा",
      "collection_date": "2025-09-19",
      "session": "morning",
      "quantity": 15.5,
      "fat_percentage": 4.2,
      "snf_percentage": 8.5,
      "rate": 45,
      "total_amount": 697.5,
      "notes": "Good quality milk"
    },
    {
      "id": "2",
      "farmer_id": "2", 
      "farmer_name": "सुनीता देवी",
      "collection_date": "2025-09-19",
      "session": "morning",
      "quantity": 12.0,
      "fat_percentage": 3.8,
      "snf_percentage": 8.2,
      "rate": 42,
      "total_amount": 504,
      "notes": ""
    },
    {
      "id": "3",
      "farmer_id": "1",
      "farmer_name": "राज कुमार शर्मा", 
      "collection_date": "2025-09-19",
      "session": "evening",
      "quantity": 18.0,
      "fat_percentage": 4.0,
      "snf_percentage": 8.3,
      "rate": 44,
      "total_amount": 792,
      "notes": "Evening collection"
    },
    {
      "id": "4",
      "farmer_id": "4",
      "farmer_name": "प्रीति अग्रवाल",
      "collection_date": "2025-09-19", 
      "session": "morning",
      "quantity": 20.5,
      "fat_percentage": 4.5,
      "snf_percentage": 8.7,
      "rate": 48,
      "total_amount": 984,
      "notes": "Premium quality"
    },
    {
      "id": "5",
      "farmer_id": "5",
      "farmer_name": "विनोद कुमार",
      "collection_date": "2025-09-19",
      "session": "morning", 
      "quantity": 25.0,
      "fat_percentage": 3.9,
      "snf_percentage": 8.1,
      "rate": 43,
      "total_amount": 1075,
      "notes": "Large quantity"
    },
    {
      "id": "6",
      "farmer_id": "2",
      "farmer_name": "सुनीता देवी",
      "collection_date": "2025-09-18",
      "session": "evening",
      "quantity": 11.5,
      "fat_percentage": 3.7,
      "snf_percentage": 8.0,
      "rate": 41,
      "total_amount": 471.5,
      "notes": "Previous day evening"
    },
    {
      "id": "7",
      "farmer_id": "1", 
      "farmer_name": "राज कुमार शर्मा",
      "collection_date": "2025-09-18",
      "session": "morning",
      "quantity": 16.0,
      "fat_percentage": 4.1,
      "snf_percentage": 8.4,
      "rate": 44,
      "total_amount": 704,
      "notes": "Regular morning supply"
    },
    {
      "id": "8",
      "farmer_id": "4",
      "farmer_name": "प्रीति अग्रवाल",
      "collection_date": "2025-09-18",
      "session": "evening",
      "quantity": 19.0,
      "fat_percentage": 4.3,
      "snf_percentage": 8.6,
      "rate": 46,
      "total_amount": 874,
      "notes": "Evening premium"
    }
  ],
  "rateChart": [
    {
      "id": "1",
      "fat_min": 3.5,
      "fat_max": 3.9,
      "snf_min": 8.0,
      "snf_max": 8.2,
      "rate": 41,
      "is_active": true
    },
    {
      "id": "2",
      "fat_min": 3.5,
      "fat_max": 3.9,
      "snf_min": 8.3,
      "snf_max": 8.5,
      "rate": 42,
      "is_active": true
    },
    {
      "id": "3",
      "fat_min": 4.0,
      "fat_max": 4.2,
      "snf_min": 8.0,
      "snf_max": 8.2,
      "rate": 43,
      "is_active": true
    },
    {
      "id": "4",
      "fat_min": 4.0,
      "fat_max": 4.2,
      "snf_min": 8.3,
      "snf_max": 8.5,
      "rate": 44,
      "is_active": true
    },
    {
      "id": "5",
      "fat_min": 4.0,
      "fat_max": 4.2,
      "snf_min": 8.6,
      "snf_max": 8.8,
      "rate": 45,
      "is_active": true
    },
    {
      "id": "6",
      "fat_min": 4.3,
      "fat_max": 4.5,
      "snf_min": 8.3,
      "snf_max": 8.5,
      "rate": 46,
      "is_active": true
    },
    {
      "id": "7",
      "fat_min": 4.3,
      "fat_max": 4.5,
      "snf_min": 8.6,
      "snf_max": 8.8,
      "rate": 48,
      "is_active": true
    },
    {
      "id": "8",
      "fat_min": 4.6,
      "fat_max": 5.0,
      "snf_min": 8.6,
      "snf_max": 9.0,
      "rate": 50,
      "is_active": true
    }
  ],
  "translations": {
    "en": {
      "dashboard": "Dashboard",
      "farmers": "Farmers", 
      "dailyCollection": "Daily Collection",
      "balance": "Balance",
      "reports": "Reports",
      "totalFarmers": "Total Farmers",
      "todaysCollections": "Today's Collections",
      "milkCollected": "Milk Collected",
      "revenueToday": "Revenue Today",
      "active": "Active",
      "inactive": "Inactive",
      "morning": "Morning",
      "evening": "Evening",
      "addNewFarmer": "Add New Farmer",
      "fullName": "Full Name",
      "phoneNumber": "Phone Number", 
      "address": "Address",
      "status": "Status",
      "notes": "Notes",
      "save": "Save",
      "cancel": "Cancel",
      "edit": "Edit",
      "search": "Search farmers...",
      "farmer": "Farmer",
      "collectionDate": "Collection Date",
      "session": "Session",
      "quantity": "Quantity (Liters)",
      "fatPercentage": "Fat %",
      "snfPercentage": "SNF %",
      "rate": "Rate per Liter",
      "totalAmount": "Total Amount",
      "selectFarmer": "Select Farmer",
      "checkBalance": "Check Balance",
      "startDate": "Start Date",
      "endDate": "End Date",
      "totalMilk": "Total Milk",
      "totalEarnings": "Total Earnings", 
      "averageRate": "Average Rate",
      "comingSoon": "Coming Soon",
      "recentCollections": "Recent Collections",
      "liters": "Liters"
    },
    "hi": {
      "dashboard": "डैशबोर्ड",
      "farmers": "किसान",
      "dailyCollection": "दैनिक संग्रह", 
      "balance": "बैलेंस",
      "reports": "रिपोर्ट्स",
      "totalFarmers": "कुल किसान",
      "todaysCollections": "आज का संग्रह",
      "milkCollected": "दूध संग्रह",
      "revenueToday": "आज की आय",
      "active": "सक्रिय",
      "inactive": "निष्क्रिय", 
      "morning": "सुबह",
      "evening": "शाम",
      "addNewFarmer": "नया किसान जोड़ें",
      "fullName": "पूरा नाम",
      "phoneNumber": "फोन नंबर",
      "address": "पता",
      "status": "स्थिति",
      "notes": "टिप्पणी",
      "save": "सेव करें",
      "cancel": "रद्द करें", 
      "edit": "संपादित करें",
      "search": "किसान खोजें...",
      "farmer": "किसान",
      "collectionDate": "संग्रह दिनांक",
      "session": "सत्र", 
      "quantity": "मात्रा (लीटर)",
      "fatPercentage": "फैट %",
      "snfPercentage": "एसएनएफ %",
      "rate": "दर प्रति लीटर",
      "totalAmount": "कुल राशि",
      "selectFarmer": "किसान चुनें",
      "checkBalance": "बैलेंस चेक करें",
      "startDate": "शुरुआती तारीख",
      "endDate": "अंतिम तारीख", 
      "totalMilk": "कुल दूध",
      "totalEarnings": "कुल कमाई",
      "averageRate": "औसत दर",
      "comingSoon": "जल्द आ रहा है",
      "recentCollections": "हाल के संग्रह",
      "liters": "लीटर"
    }
  }
};

// Utility functions
const formatDate = (date) => {
  const options = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  return new Date(date).toLocaleDateString('en-US', options);
};

const formatCurrency = (amount) => {
  return `₹${amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;
};

const getCurrentDate = () => {
  return new Date().toISOString().split('T')[0];
};

const findRate = (fatPercentage, snfPercentage, rateChart) => {
  const rate = rateChart.find(r => 
    r.is_active &&
    fatPercentage >= r.fat_min && fatPercentage <= r.fat_max &&
    snfPercentage >= r.snf_min && snfPercentage <= r.snf_max
  );
  return rate ? rate.rate : 0;
};

// Icons
const Icons = {
  Home: () => React.createElement(lucide.Home, { size: 20 }),
  Users: () => React.createElement(lucide.Users, { size: 20 }),
  Milk: () => React.createElement(lucide.Milk, { size: 20 }),
  DollarSign: () => React.createElement(lucide.DollarSign, { size: 20 }),
  FileText: () => React.createElement(lucide.FileText, { size: 20 }),
  Menu: () => React.createElement(lucide.Menu, { size: 20 }),
  X: () => React.createElement(lucide.X, { size: 20 }),
  Edit: () => React.createElement(lucide.Edit2, { size: 16 }),
  ToggleLeft: () => React.createElement(lucide.ToggleLeft, { size: 16 }),
  ToggleRight: () => React.createElement(lucide.ToggleRight, { size: 16 }),
  Search: () => React.createElement(lucide.Search, { size: 16 }),
  Plus: () => React.createElement(lucide.Plus, { size: 16 }),
  Calendar: () => React.createElement(lucide.Calendar, { size: 16 })
};

// Real-time Clock Component
const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return React.createElement('div', { className: 'clock' }, 
    time.toLocaleTimeString('en-US', { 
      hour12: true,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
  );
};

// Language Toggle Component
const LanguageToggle = ({ currentLang, onLanguageChange }) => {
  return React.createElement('div', { className: 'language-toggle' },
    React.createElement('button', {
      className: currentLang === 'en' ? 'active' : '',
      onClick: () => onLanguageChange('en')
    }, 'EN'),
    React.createElement('button', {
      className: currentLang === 'hi' ? 'active' : '',
      onClick: () => onLanguageChange('hi')
    }, 'HI')
  );
};

// Sidebar Component
const Sidebar = ({ currentPage, onPageChange, language, translations, isOpen, onClose }) => {
  const t = translations[language];
  
  const menuItems = [
    { id: 'dashboard', label: t.dashboard, icon: Icons.Home },
    { id: 'farmers', label: t.farmers, icon: Icons.Users },
    { id: 'collection', label: t.dailyCollection, icon: Icons.Milk },
    { id: 'balance', label: t.balance, icon: Icons.DollarSign },
    { id: 'reports', label: t.reports, icon: Icons.FileText }
  ];

  return React.createElement('aside', {
    className: `sidebar ${!isOpen ? 'mobile-hidden' : ''} fixed md:relative top-0 left-0 h-full w-64 bg-white border-r border-gray-200 z-50`
  },
    React.createElement('div', { className: 'p-6 border-b border-gray-200' },
      React.createElement('div', { className: 'flex items-center justify-between' },
        React.createElement('div', { className: 'flex items-center space-x-3' },
          React.createElement('div', { className: 'w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center' },
            React.createElement(Icons.Milk, null)
          ),
          React.createElement('h1', { className: 'text-xl font-bold text-gray-900' }, 'DairyCoop')
        ),
        React.createElement('button', {
          className: 'md:hidden p-1',
          onClick: onClose
        }, React.createElement(Icons.X, null))
      )
    ),
    React.createElement('nav', { className: 'p-4' },
      menuItems.map(item =>
        React.createElement('a', {
          key: item.id,
          href: '#',
          className: `sidebar-link ${currentPage === item.id ? 'active' : ''}`,
          onClick: (e) => {
            e.preventDefault();
            onPageChange(item.id);
            onClose();
          }
        },
          React.createElement(item.icon, null),
          item.label
        )
      )
    )
  );
};

// Stats Card Component
const StatsCard = ({ title, value, subtitle, color = 'primary' }) => {
  return React.createElement('div', { className: 'stats-card' },
    React.createElement('h3', { className: 'text-sm font-medium text-gray-500 mb-2' }, title),
    React.createElement('div', { className: `text-2xl font-bold text-${color}-600 mb-1` }, value),
    subtitle && React.createElement('p', { className: 'text-sm text-gray-400' }, subtitle)
  );
};

// Farmer Form Component
const FarmerForm = ({ farmer, onSave, onCancel, translations, language }) => {
  const t = translations[language];
  const [formData, setFormData] = useState({
    name: farmer?.name || '',
    phone: farmer?.phone || '',
    address: farmer?.address || '',
    status: farmer?.status || 'active',
    notes: farmer?.notes || ''
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (!/^[a-zA-Z\u0900-\u097F\s]+$/.test(formData.name)) {
      newErrors.name = 'Name should contain only letters and spaces';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number must be exactly 10 digits';
    }
    
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave({
        ...formData,
        id: farmer?.id || Date.now().toString(),
        registration_date: farmer?.registration_date || getCurrentDate()
      });
    }
  };

  return React.createElement('div', { className: 'farmer-form' },
    React.createElement('h3', { className: 'text-lg font-semibold mb-4' }, 
      farmer ? t.edit + ' ' + t.farmer : t.addNewFarmer
    ),
    React.createElement('form', { onSubmit: handleSubmit },
      React.createElement('div', { className: 'form-grid' },
        React.createElement('div', { className: 'form-group' },
          React.createElement('label', { className: 'form-label' }, t.fullName),
          React.createElement('input', {
            type: 'text',
            className: 'form-control',
            value: formData.name,
            onChange: (e) => setFormData({ ...formData, name: e.target.value })
          }),
          errors.name && React.createElement('div', { className: 'form-error' }, errors.name)
        ),
        React.createElement('div', { className: 'form-group' },
          React.createElement('label', { className: 'form-label' }, t.phoneNumber),
          React.createElement('input', {
            type: 'tel',
            className: 'form-control',
            value: formData.phone,
            onChange: (e) => setFormData({ ...formData, phone: e.target.value })
          }),
          errors.phone && React.createElement('div', { className: 'form-error' }, errors.phone)
        )
      ),
      React.createElement('div', { className: 'form-group' },
        React.createElement('label', { className: 'form-label' }, t.address),
        React.createElement('input', {
          type: 'text',
          className: 'form-control',
          value: formData.address,
          onChange: (e) => setFormData({ ...formData, address: e.target.value })
        }),
        errors.address && React.createElement('div', { className: 'form-error' }, errors.address)
      ),
      React.createElement('div', { className: 'form-grid' },
        React.createElement('div', { className: 'form-group' },
          React.createElement('label', { className: 'form-label' }, t.status),
          React.createElement('select', {
            className: 'form-control',
            value: formData.status,
            onChange: (e) => setFormData({ ...formData, status: e.target.value })
          },
            React.createElement('option', { value: 'active' }, t.active),
            React.createElement('option', { value: 'inactive' }, t.inactive)
          )
        ),
        React.createElement('div', { className: 'form-group' },
          React.createElement('label', { className: 'form-label' }, t.notes),
          React.createElement('textarea', {
            className: 'form-control',
            value: formData.notes,
            onChange: (e) => setFormData({ ...formData, notes: e.target.value }),
            rows: 3
          })
        )
      ),
      React.createElement('div', { className: 'flex space-x-4 mt-6' },
        React.createElement('button', {
          type: 'submit',
          className: 'btn btn--primary'
        }, t.save),
        React.createElement('button', {
          type: 'button',
          className: 'btn btn--secondary',
          onClick: onCancel
        }, t.cancel)
      )
    )
  );
};

// Farmer Card Component
const FarmerCard = ({ farmer, onEdit, onToggleStatus, translations, language }) => {
  const t = translations[language];
  
  return React.createElement('div', { className: 'farmer-card' },
    React.createElement('div', { className: 'flex justify-between items-start mb-4' },
      React.createElement('h3', { className: 'text-lg font-semibold' }, farmer.name),
      React.createElement('span', { 
        className: `status-badge ${farmer.status}` 
      }, t[farmer.status])
    ),
    React.createElement('div', { className: 'space-y-2 mb-4' },
      React.createElement('p', { className: 'text-sm text-gray-600' }, farmer.phone),
      React.createElement('p', { className: 'text-sm text-gray-600' }, farmer.address),
      React.createElement('p', { className: 'text-xs text-gray-400' }, 
        `Registered: ${new Date(farmer.registration_date).toLocaleDateString()}`
      )
    ),
    React.createElement('div', { className: 'flex space-x-2' },
      React.createElement('button', {
        className: 'btn btn--sm btn--outline',
        onClick: () => onEdit(farmer)
      },
        React.createElement(Icons.Edit, null),
        ' ', t.edit
      ),
      React.createElement('button', {
        className: 'btn btn--sm btn--outline',
        onClick: () => onToggleStatus(farmer.id)
      },
        farmer.status === 'active' ? 
          React.createElement(Icons.ToggleRight, null) : 
          React.createElement(Icons.ToggleLeft, null)
      )
    )
  );
};

// Dashboard Component
const Dashboard = ({ farmers, collections, translations, language }) => {
  const t = translations[language];
  const today = getCurrentDate();
  
  // Calculate today's statistics
  const todaysCollections = collections.filter(c => c.collection_date === today);
  const activeFarmers = farmers.filter(f => f.status === 'active').length;
  const todaysMilk = todaysCollections.reduce((sum, c) => sum + c.quantity, 0);
  const todaysRevenue = todaysCollections.reduce((sum, c) => sum + c.total_amount, 0);
  
  // Recent collections (last 10)
  const recentCollections = [...collections]
    .sort((a, b) => new Date(b.collection_date) - new Date(a.collection_date))
    .slice(0, 10);

  return React.createElement('div', { className: 'space-y-6' },
    React.createElement('div', { className: 'flex flex-col md:flex-row md:items-center md:justify-between' },
      React.createElement('div', null,
        React.createElement('h1', { className: 'page-title' }, t.dashboard),
        React.createElement('p', { className: 'welcome-message' }, formatDate(new Date()))
      ),
      React.createElement('div', { className: 'flex items-center space-x-4' },
        React.createElement(LanguageToggle, {
          currentLang: language,
          onLanguageChange: (lang) => window.setLanguage(lang)
        }),
        React.createElement(Clock, null)
      )
    ),
    
    React.createElement('div', { className: 'stats-grid grid gap-6' },
      React.createElement(StatsCard, {
        title: t.totalFarmers,
        value: farmers.length,
        subtitle: `${activeFarmers} ${t.active.toLowerCase()}`
      }),
      React.createElement(StatsCard, {
        title: t.todaysCollections,
        value: todaysCollections.length,
        subtitle: 'sessions'
      }),
      React.createElement(StatsCard, {
        title: t.milkCollected,
        value: `${todaysMilk.toFixed(1)}L`,
        subtitle: t.liters
      }),
      React.createElement(StatsCard, {
        title: t.revenueToday,
        value: formatCurrency(todaysRevenue),
        subtitle: 'total earnings'
      })
    ),
    
    React.createElement('div', { className: 'recent-collections' },
      React.createElement('h2', { className: 'section-title' }, t.recentCollections),
      React.createElement('div', { className: 'space-y-2' },
        recentCollections.map(collection =>
          React.createElement('div', { 
            key: collection.id, 
            className: 'collection-item' 
          },
            React.createElement('div', null,
              React.createElement('div', { className: 'font-medium' }, collection.farmer_name),
              React.createElement('div', { className: 'text-sm text-gray-500' }, 
                `${collection.collection_date} - ${t[collection.session]}`
              )
            ),
            React.createElement('div', { className: 'text-right' },
              React.createElement('div', { className: 'font-medium' }, `${collection.quantity}L`),
              React.createElement('div', { className: 'text-sm text-gray-500' }, 
                formatCurrency(collection.total_amount)
              )
            )
          )
        )
      )
    )
  );
};

// Farmers Page Component
const FarmersPage = ({ farmers, setFarmers, translations, language }) => {
  const t = translations[language];
  const [showForm, setShowForm] = useState(false);
  const [editingFarmer, setEditingFarmer] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFarmers = farmers.filter(farmer =>
    farmer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    farmer.phone.includes(searchTerm)
  );

  const handleSaveFarmer = (farmerData) => {
    if (editingFarmer) {
      setFarmers(farmers.map(f => f.id === editingFarmer.id ? farmerData : f));
    } else {
      setFarmers([...farmers, farmerData]);
    }
    setShowForm(false);
    setEditingFarmer(null);
  };

  const handleEditFarmer = (farmer) => {
    setEditingFarmer(farmer);
    setShowForm(true);
  };

  const handleToggleStatus = (farmerId) => {
    setFarmers(farmers.map(f => 
      f.id === farmerId ? { ...f, status: f.status === 'active' ? 'inactive' : 'active' } : f
    ));
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingFarmer(null);
  };

  return React.createElement('div', { className: 'space-y-6' },
    React.createElement('div', { className: 'flex flex-col md:flex-row md:items-center md:justify-between' },
      React.createElement('h1', { className: 'page-title' }, t.farmers),
      React.createElement('button', {
        className: 'btn btn--primary mt-4 md:mt-0',
        onClick: () => setShowForm(true)
      },
        React.createElement(Icons.Plus, null),
        ' ', t.addNewFarmer
      )
    ),
    
    showForm && React.createElement(FarmerForm, {
      farmer: editingFarmer,
      onSave: handleSaveFarmer,
      onCancel: handleCancelForm,
      translations,
      language
    }),
    
    React.createElement('div', { className: 'flex items-center space-x-4' },
      React.createElement('div', { className: 'relative flex-1' },
        React.createElement('input', {
          type: 'text',
          className: 'form-control pl-10',
          placeholder: t.search,
          value: searchTerm,
          onChange: (e) => setSearchTerm(e.target.value)
        }),
        React.createElement('div', { 
          className: 'absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' 
        }, React.createElement(Icons.Search, null))
      )
    ),
    
    React.createElement('div', { className: 'farmer-grid grid gap-6' },
      filteredFarmers.map(farmer =>
        React.createElement(FarmerCard, {
          key: farmer.id,
          farmer,
          onEdit: handleEditFarmer,
          onToggleStatus: handleToggleStatus,
          translations,
          language
        })
      )
    )
  );
};

// Collection Form Component
const CollectionForm = ({ farmers, collections, setCollections, rateChart, translations, language }) => {
  const t = translations[language];
  const [formData, setFormData] = useState({
    farmer_id: '',
    farmer_name: '',
    collection_date: getCurrentDate(),
    session: 'morning',
    quantity: '',
    fat_percentage: '',
    snf_percentage: '',
    notes: ''
  });
  const [calculatedData, setCalculatedData] = useState({
    rate: 0,
    total_amount: 0
  });

  const activeFarmers = farmers.filter(f => f.status === 'active');

  // Calculate rate and total amount in real-time
  useEffect(() => {
    if (formData.quantity && formData.fat_percentage && formData.snf_percentage) {
      const rate = findRate(
        parseFloat(formData.fat_percentage), 
        parseFloat(formData.snf_percentage), 
        rateChart
      );
      const totalAmount = rate * parseFloat(formData.quantity);
      setCalculatedData({ rate, total_amount: totalAmount });
    } else {
      setCalculatedData({ rate: 0, total_amount: 0 });
    }
  }, [formData.quantity, formData.fat_percentage, formData.snf_percentage, rateChart]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.farmer_id && formData.quantity && formData.fat_percentage && formData.snf_percentage) {
      const selectedFarmer = farmers.find(f => f.id === formData.farmer_id);
      const newCollection = {
        id: Date.now().toString(),
        ...formData,
        farmer_name: selectedFarmer.name,
        quantity: parseFloat(formData.quantity),
        fat_percentage: parseFloat(formData.fat_percentage),
        snf_percentage: parseFloat(formData.snf_percentage),
        rate: calculatedData.rate,
        total_amount: calculatedData.total_amount
      };
      
      setCollections([...collections, newCollection]);
      
      // Reset form
      setFormData({
        farmer_id: '',
        farmer_name: '',
        collection_date: getCurrentDate(),
        session: 'morning',
        quantity: '',
        fat_percentage: '',
        snf_percentage: '',
        notes: ''
      });
    }
  };

  return React.createElement('div', { className: 'space-y-6' },
    React.createElement('h1', { className: 'page-title' }, t.dailyCollection),
    
    React.createElement('div', { className: 'card' },
      React.createElement('div', { className: 'card__body' },
        React.createElement('form', { onSubmit: handleSubmit, className: 'space-y-6' },
          React.createElement('div', { className: 'form-grid' },
            React.createElement('div', { className: 'form-group' },
              React.createElement('label', { className: 'form-label' }, t.farmer),
              React.createElement('select', {
                className: 'form-control',
                value: formData.farmer_id,
                onChange: (e) => setFormData({ ...formData, farmer_id: e.target.value }),
                required: true
              },
                React.createElement('option', { value: '' }, t.selectFarmer),
                activeFarmers.map(farmer =>
                  React.createElement('option', { key: farmer.id, value: farmer.id }, farmer.name)
                )
              )
            ),
            React.createElement('div', { className: 'form-group' },
              React.createElement('label', { className: 'form-label' }, t.session),
              React.createElement('select', {
                className: 'form-control',
                value: formData.session,
                onChange: (e) => setFormData({ ...formData, session: e.target.value })
              },
                React.createElement('option', { value: 'morning' }, t.morning),
                React.createElement('option', { value: 'evening' }, t.evening)
              )
            )
          ),
          
          React.createElement('div', { className: 'form-grid' },
            React.createElement('div', { className: 'form-group' },
              React.createElement('label', { className: 'form-label' }, t.quantity),
              React.createElement('input', {
                type: 'number',
                step: '0.1',
                className: 'form-control',
                value: formData.quantity,
                onChange: (e) => setFormData({ ...formData, quantity: e.target.value }),
                required: true
              })
            ),
            React.createElement('div', { className: 'form-group' },
              React.createElement('label', { className: 'form-label' }, t.collectionDate),
              React.createElement('input', {
                type: 'date',
                className: 'form-control',
                value: formData.collection_date,
                readOnly: true
              })
            )
          ),
          
          React.createElement('div', { className: 'form-grid' },
            React.createElement('div', { className: 'form-group' },
              React.createElement('label', { className: 'form-label' }, t.fatPercentage),
              React.createElement('input', {
                type: 'number',
                step: '0.1',
                className: 'form-control',
                value: formData.fat_percentage,
                onChange: (e) => setFormData({ ...formData, fat_percentage: e.target.value }),
                required: true
              })
            ),
            React.createElement('div', { className: 'form-group' },
              React.createElement('label', { className: 'form-label' }, t.snfPercentage),
              React.createElement('input', {
                type: 'number',
                step: '0.1',
                className: 'form-control',
                value: formData.snf_percentage,
                onChange: (e) => setFormData({ ...formData, snf_percentage: e.target.value }),
                required: true
              })
            )
          ),
          
          React.createElement('div', { className: 'form-group' },
            React.createElement('label', { className: 'form-label' }, t.notes),
            React.createElement('textarea', {
              className: 'form-control',
              value: formData.notes,
              onChange: (e) => setFormData({ ...formData, notes: e.target.value }),
              rows: 3
            })
          ),
          
          // Real-time calculation display
          (formData.quantity && formData.fat_percentage && formData.snf_percentage) &&
          React.createElement('div', { className: 'calculation-display' },
            React.createElement('h3', { className: 'text-lg font-semibold mb-4' }, 'Calculation'),
            React.createElement('div', { className: 'calculation-row' },
              React.createElement('span', null, t.rate + ':'),
              React.createElement('span', null, formatCurrency(calculatedData.rate))
            ),
            React.createElement('div', { className: 'calculation-row' },
              React.createElement('span', null, t.totalAmount + ':'),
              React.createElement('span', null, formatCurrency(calculatedData.total_amount))
            )
          ),
          
          React.createElement('button', {
            type: 'submit',
            className: 'btn btn--primary btn--full-width',
            disabled: !formData.farmer_id || !formData.quantity || !formData.fat_percentage || !formData.snf_percentage
          }, t.save)
        )
      )
    ),
    
    // Recent collections sidebar
    React.createElement('div', { className: 'recent-collections' },
      React.createElement('h2', { className: 'section-title' }, t.recentCollections),
      React.createElement('div', { className: 'space-y-2' },
        collections.slice(-5).reverse().map(collection =>
          React.createElement('div', { 
            key: collection.id, 
            className: 'collection-item' 
          },
            React.createElement('div', null,
              React.createElement('div', { className: 'font-medium' }, collection.farmer_name),
              React.createElement('div', { className: 'text-sm text-gray-500' }, 
                `${collection.quantity}L - ${t[collection.session]}`
              )
            ),
            React.createElement('div', { className: 'text-right font-medium' },
              formatCurrency(collection.total_amount)
            )
          )
        )
      )
    )
  );
};

// Balance Page Component
const BalancePage = ({ farmers, collections, translations, language }) => {
  const t = translations[language];
  const [selectedFarmer, setSelectedFarmer] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [balanceReport, setBalanceReport] = useState(null);

  const handleCheckBalance = () => {
    if (selectedFarmer && startDate && endDate) {
      const farmerCollections = collections.filter(c => 
        c.farmer_id === selectedFarmer &&
        c.collection_date >= startDate &&
        c.collection_date <= endDate
      );

      const totalMilk = farmerCollections.reduce((sum, c) => sum + c.quantity, 0);
      const totalEarnings = farmerCollections.reduce((sum, c) => sum + c.total_amount, 0);
      const averageRate = totalMilk > 0 ? totalEarnings / totalMilk : 0;

      setBalanceReport({
        farmer: farmers.find(f => f.id === selectedFarmer),
        collections: farmerCollections,
        summary: {
          totalMilk,
          totalEarnings,
          averageRate
        }
      });
    }
  };

  return React.createElement('div', { className: 'space-y-6' },
    React.createElement('h1', { className: 'page-title' }, t.balance),
    
    React.createElement('div', { className: 'card' },
      React.createElement('div', { className: 'card__body' },
        React.createElement('div', { className: 'form-grid' },
          React.createElement('div', { className: 'form-group' },
            React.createElement('label', { className: 'form-label' }, t.farmer),
            React.createElement('select', {
              className: 'form-control',
              value: selectedFarmer,
              onChange: (e) => setSelectedFarmer(e.target.value)
            },
              React.createElement('option', { value: '' }, t.selectFarmer),
              farmers.map(farmer =>
                React.createElement('option', { key: farmer.id, value: farmer.id }, farmer.name)
              )
            )
          ),
          React.createElement('div', { className: 'form-group' },
            React.createElement('label', { className: 'form-label' }, t.startDate),
            React.createElement('input', {
              type: 'date',
              className: 'form-control',
              value: startDate,
              onChange: (e) => setStartDate(e.target.value)
            })
          )
        ),
        React.createElement('div', { className: 'form-grid' },
          React.createElement('div', { className: 'form-group' },
            React.createElement('label', { className: 'form-label' }, t.endDate),
            React.createElement('input', {
              type: 'date',
              className: 'form-control',
              value: endDate,
              onChange: (e) => setEndDate(e.target.value)
            })
          ),
          React.createElement('div', { className: 'form-group flex items-end' },
            React.createElement('button', {
              className: 'btn btn--primary btn--full-width',
              onClick: handleCheckBalance,
              disabled: !selectedFarmer || !startDate || !endDate
            }, t.checkBalance)
          )
        )
      )
    ),
    
    balanceReport && React.createElement('div', { className: 'balance-report' },
      React.createElement('h2', { className: 'section-title' }, 
        `${t.balance} - ${balanceReport.farmer.name}`
      ),
      
      React.createElement('div', { className: 'stats-grid grid gap-6 mb-6' },
        React.createElement(StatsCard, {
          title: t.totalMilk,
          value: `${balanceReport.summary.totalMilk.toFixed(1)}L`
        }),
        React.createElement(StatsCard, {
          title: t.totalEarnings,
          value: formatCurrency(balanceReport.summary.totalEarnings)
        }),
        React.createElement(StatsCard, {
          title: t.averageRate,
          value: formatCurrency(balanceReport.summary.averageRate)
        })
      ),
      
      React.createElement('div', { className: 'overflow-x-auto' },
        React.createElement('table', { className: 'collections-table' },
          React.createElement('thead', null,
            React.createElement('tr', null,
              React.createElement('th', null, 'Date'),
              React.createElement('th', null, t.session),
              React.createElement('th', null, 'Quantity (L)'),
              React.createElement('th', null, 'Rate'),
              React.createElement('th', null, 'Amount')
            )
          ),
          React.createElement('tbody', null,
            balanceReport.collections.map(collection =>
              React.createElement('tr', { key: collection.id },
                React.createElement('td', null, collection.collection_date),
                React.createElement('td', null, t[collection.session]),
                React.createElement('td', null, collection.quantity.toFixed(1)),
                React.createElement('td', null, formatCurrency(collection.rate)),
                React.createElement('td', null, formatCurrency(collection.total_amount))
              )
            )
          )
        )
      )
    )
  );
};

// Reports Page Component
const ReportsPage = ({ translations, language }) => {
  const t = translations[language];
  
  return React.createElement('div', { className: 'coming-soon' },
    React.createElement('h2', null, t.comingSoon),
    React.createElement('p', { className: 'text-gray-500' }, 
      'Advanced reporting features will be available in the next update.'
    )
  );
};

// Main App Component
const App = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [language, setLanguage] = useState('en');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [farmers, setFarmers] = useState(initialData.farmers);
  const [collections, setCollections] = useState(initialData.collections);
  const [rateChart] = useState(initialData.rateChart);
  const translations = initialData.translations;

  // Make setLanguage available globally for language toggle
  window.setLanguage = setLanguage;

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return React.createElement(Dashboard, {
          farmers,
          collections,
          translations,
          language
        });
      case 'farmers':
        return React.createElement(FarmersPage, {
          farmers,
          setFarmers,
          translations,
          language
        });
      case 'collection':
        return React.createElement(CollectionForm, {
          farmers,
          collections,
          setCollections,
          rateChart,
          translations,
          language
        });
      case 'balance':
        return React.createElement(BalancePage, {
          farmers,
          collections,
          translations,
          language
        });
      case 'reports':
        return React.createElement(ReportsPage, {
          translations,
          language
        });
      default:
        return React.createElement(Dashboard, {
          farmers,
          collections,
          translations,
          language
        });
    }
  };

  return React.createElement('div', { className: 'flex h-screen bg-gray-50' },
    // Mobile overlay
    React.createElement('div', {
      className: `mobile-menu-overlay ${sidebarOpen ? 'open' : ''}`,
      onClick: () => setSidebarOpen(false)
    }),
    
    // Sidebar
    React.createElement(Sidebar, {
      currentPage,
      onPageChange: setCurrentPage,
      language,
      translations,
      isOpen: sidebarOpen,
      onClose: () => setSidebarOpen(false)
    }),
    
    // Main content
    React.createElement('div', { className: 'flex-1 flex flex-col overflow-hidden ml-0 md:ml-64' },
      // Mobile header
      React.createElement('div', { className: 'mobile-header md:hidden' },
        React.createElement('button', {
          className: 'p-2',
          onClick: () => setSidebarOpen(true)
        }, React.createElement(Icons.Menu, null)),
        React.createElement('h1', { className: 'text-lg font-semibold' }, 'DairyCoop')
      ),
      
      // Page content
      React.createElement('main', { className: 'flex-1 overflow-auto p-6' },
        renderPage()
      )
    )
  );
};

// Render the app
ReactDOM.render(React.createElement(App), document.getElementById('root'));
