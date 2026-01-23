// Theme utility functions for consistent styling across the admin panel

/**
 * Get card classes based on theme
 */
export const getCardClasses = (isDark) => `
  rounded-xl p-6 transition-all duration-300
  ${isDark 
    ? 'bg-slate-800 border border-slate-700' 
    : 'bg-white border border-gray-200 shadow-sm'
  }
`;

/**
 * Get table classes based on theme
 */
export const getTableClasses = (isDark) => ({
  wrapper: `rounded-xl overflow-hidden ${isDark ? 'bg-slate-800 border border-slate-700' : 'bg-white border border-gray-200 shadow-sm'}`,
  table: 'w-full',
  thead: isDark ? 'bg-slate-900' : 'bg-gray-50',
  th: `px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-gray-500'}`,
  tbody: isDark ? 'divide-y divide-slate-700' : 'divide-y divide-gray-200',
  tr: `transition-colors ${isDark ? 'hover:bg-slate-700/50' : 'hover:bg-gray-50'}`,
  td: `px-4 py-4 ${isDark ? 'text-slate-300' : 'text-gray-700'}`,
});

/**
 * Get input classes based on theme
 */
export const getInputClasses = (isDark) => `
  w-full px-4 py-2.5 rounded-lg border transition-all duration-200
  focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none
  ${isDark 
    ? 'bg-slate-900 border-slate-600 text-white placeholder-slate-400' 
    : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400'
  }
`;

/**
 * Get select classes based on theme
 */
export const getSelectClasses = (isDark) => `
  w-full px-4 py-2.5 rounded-lg border transition-all duration-200
  focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none
  ${isDark 
    ? 'bg-slate-900 border-slate-600 text-white' 
    : 'bg-gray-50 border-gray-300 text-gray-900'
  }
`;

/**
 * Get button classes based on variant and theme
 */
export const getButtonClasses = (variant = 'primary', isDark) => {
  const variants = {
    primary: 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-lg shadow-indigo-500/30',
    secondary: isDark 
      ? 'bg-slate-700 hover:bg-slate-600 text-white' 
      : 'bg-gray-200 hover:bg-gray-300 text-gray-800',
    success: 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white shadow-lg shadow-green-500/30',
    danger: 'bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-400 hover:to-rose-500 text-white shadow-lg shadow-red-500/30',
    warning: 'bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-400 hover:to-amber-500 text-white shadow-lg shadow-yellow-500/30',
    ghost: isDark 
      ? 'bg-transparent hover:bg-slate-700 text-slate-300' 
      : 'bg-transparent hover:bg-gray-100 text-gray-700',
  };

  return `px-4 py-2.5 rounded-lg font-medium transition-all duration-200 ${variants[variant] || variants.primary}`;
};

/**
 * Get badge classes based on status and theme
 */
export const getBadgeClasses = (status, isDark) => {
  const baseClasses = 'px-2.5 py-1 rounded-full text-xs font-medium';
  
  const statusClasses = {
    success: isDark ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-800',
    warning: isDark ? 'bg-yellow-900/30 text-yellow-400' : 'bg-yellow-100 text-yellow-800',
    danger: isDark ? 'bg-red-900/30 text-red-400' : 'bg-red-100 text-red-800',
    info: isDark ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-800',
    default: isDark ? 'bg-slate-700 text-slate-300' : 'bg-gray-100 text-gray-700',
  };

  return `${baseClasses} ${statusClasses[status] || statusClasses.default}`;
};

/**
 * Get text classes based on type and theme
 */
export const getTextClasses = (type = 'primary', isDark) => {
  const types = {
    primary: isDark ? 'text-white' : 'text-gray-900',
    secondary: isDark ? 'text-slate-300' : 'text-gray-700',
    muted: isDark ? 'text-slate-400' : 'text-gray-500',
    heading: isDark ? 'text-white' : 'text-gray-900',
  };

  return types[type] || types.primary;
};

/**
 * Get stat card classes based on color and theme
 */
export const getStatCardClasses = (color = 'indigo', isDark) => {
  const colorClasses = {
    indigo: 'from-indigo-500 to-purple-600',
    green: 'from-green-500 to-emerald-600',
    blue: 'from-blue-500 to-cyan-600',
    orange: 'from-orange-500 to-amber-600',
    red: 'from-red-500 to-rose-600',
    pink: 'from-pink-500 to-rose-600',
  };

  return {
    wrapper: `rounded-xl p-6 transition-all duration-300 hover:transform hover:-translate-y-1 ${
      isDark 
        ? 'bg-slate-800 border border-slate-700' 
        : 'bg-white border border-gray-200 shadow-sm hover:shadow-md'
    }`,
    iconWrapper: `w-12 h-12 rounded-xl bg-gradient-to-br ${colorClasses[color] || colorClasses.indigo} flex items-center justify-center shadow-lg`,
    icon: 'text-white',
  };
};

/**
 * Get modal classes based on theme
 */
export const getModalClasses = (isDark) => ({
  overlay: 'fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50',
  content: `rounded-2xl p-6 max-w-md w-full mx-4 transition-all duration-300 ${
    isDark 
      ? 'bg-slate-800 border border-slate-700' 
      : 'bg-white border border-gray-200 shadow-xl'
  }`,
  header: `text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`,
  body: isDark ? 'text-slate-300' : 'text-gray-600',
  footer: 'mt-6 flex gap-3 justify-end',
});

/**
 * Get page header classes
 */
export const getPageHeaderClasses = (isDark) => ({
  wrapper: 'mb-8',
  title: `text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`,
  subtitle: `mt-1 ${isDark ? 'text-slate-400' : 'text-gray-500'}`,
});

/**
 * Get search input classes
 */
export const getSearchInputClasses = (isDark) => `
  pl-10 pr-4 py-2.5 rounded-xl border transition-all duration-200 w-full max-w-xs
  focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none
  ${isDark 
    ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-400' 
    : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'
  }
`;

/**
 * Get dropdown/menu classes
 */
export const getDropdownClasses = (isDark) => ({
  wrapper: `absolute right-0 mt-2 w-48 rounded-xl overflow-hidden shadow-lg z-50 ${
    isDark 
      ? 'bg-slate-800 border border-slate-700' 
      : 'bg-white border border-gray-200'
  }`,
  item: `px-4 py-2.5 transition-colors cursor-pointer ${
    isDark 
      ? 'text-slate-300 hover:bg-slate-700' 
      : 'text-gray-700 hover:bg-gray-50'
  }`,
  divider: isDark ? 'border-t border-slate-700' : 'border-t border-gray-200',
});
