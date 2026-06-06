"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@/utils/supabase/client";
import { Mail, Phone, Building2, Briefcase, Trash2, ChevronDown, ChevronUp, LayoutDashboard, UserPlus, PhoneCall, Clock, CheckCircle2, PauseCircle, LogOut, Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useTheme } from "@/lib/theme-provider";

export type ContactStatus = 'new' | 'contacted' | 'yet_to_serve' | 'live' | 'on_hold';

export interface Contact {
  id: string;
  created_at: string;
  name: string;
  business_name: string;
  email: string;
  phone: string;
  business_type: string;
  services_needed: string;
  status: ContactStatus | null;
}

const STATUS_TABS: { id: ContactStatus; label: string; icon: React.ElementType }[] = [
  { id: 'new', label: 'New Requests', icon: UserPlus },
  { id: 'contacted', label: 'Contacted', icon: PhoneCall },
  { id: 'yet_to_serve', label: 'Yet to Serve', icon: Clock },
  { id: 'live', label: 'Live Clients', icon: CheckCircle2 },
  { id: 'on_hold', label: 'On Hold', icon: PauseCircle },
];

export default function AdminCrmPage() {
  const router = useRouter();
  const supabase = createClient();
  const { theme, toggleTheme } = useTheme();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<ContactStatus>('new');
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    isDanger?: boolean;
  }>({
    isOpen: false,
    title: "",
    message: "",
    onConfirm: () => {},
  });

  const confirmAction = (title: string, message: string, onConfirm: () => void, isDanger = false) => {
    setConfirmModal({
      isOpen: true,
      title,
      message,
      onConfirm,
      isDanger
    });
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const { data, error } = await supabase
        .from('contacts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setContacts(data || []);
    } catch (err) {
      console.error("Error fetching contacts:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, newStatus: ContactStatus) => {
    if (id === undefined) {
      alert(`The contact ID is undefined! The database schema might be using a different column name. Available columns: ${Object.keys(contacts[0] || {}).join(', ')}`);
      return;
    }

    const actionText = {
      'new': 'move to New',
      'contacted': 'mark as Contacted',
      'yet_to_serve': 'move to Yet to Serve',
      'live': 'set as Live Client',
      'on_hold': 'place On Hold'
    }[newStatus];

    confirmAction(
      "Confirm Update",
      `Are you sure you want to ${actionText}?`,
      async () => {
        setConfirmModal(prev => ({ ...prev, isOpen: false }));
        
        // Optimistic update
        setContacts(prev => prev.map(c => c.id === id ? { ...c, status: newStatus } : c));
        setExpandedId(null); // Close expanded card when moving
        setActiveTab(newStatus); // Automatically switch to the new list
        
        try {
          const { error } = await supabase
            .from('contacts')
            .update({ status: newStatus })
            .eq('id', id);

          if (error) {
            console.error("Supabase Error updating status:", error);
            alert(`Failed to update status: ${error.message || String(error)}`);
            fetchContacts();
          }
        } catch (err: any) {
          console.error("Native Error updating status:", err);
          alert(`Failed to update status: ${err.message || String(err)}`);
        }
      }
    );
  };

  const deleteContact = async (id: string) => {
    confirmAction(
      "Delete Contact",
      "Are you sure you want to delete this lead? This cannot be undone.",
      async () => {
        setConfirmModal(prev => ({ ...prev, isOpen: false }));
        setContacts(prev => prev.filter(c => c.id !== id));
        
        try {
          const { error } = await supabase
            .from('contacts')
            .delete()
            .eq('id', id);

          if (error) {
            console.error("Error deleting contact:", error);
            alert(`Failed to delete contact: ${error.message || JSON.stringify(error)}`);
            fetchContacts();
          }
        } catch (err: any) {
          console.error("Error deleting contact:", err);
          alert(`Failed to delete contact: ${err.message || JSON.stringify(err)}`);
        }
      },
      true
    );
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/adminorgcrm/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-canvas flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      </div>
    );
  }

  const getNormalizedStatus = (status: ContactStatus | null): ContactStatus => {
    if (!status || !['new', 'contacted', 'yet_to_serve', 'live', 'on_hold'].includes(status)) return 'new';
    return status;
  };

  const activeContacts = contacts.filter(c => getNormalizedStatus(c.status) === activeTab);

  return (
    <main className="h-screen bg-canvas flex flex-col md:flex-row font-sans overflow-hidden">
      
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-[280px] bg-surface-1 border-r border-hairline flex flex-col shrink-0 md:h-screen z-10 shadow-sm md:shadow-none relative">
        <div className="p-6 border-b border-hairline relative">
          <div className="flex items-center gap-2 text-ink">
            <LayoutDashboard className="text-primary" />
            <h1 className="text-[20px] font-semibold tracking-tight">CRM Admin</h1>
          </div>
          <p className="text-[13px] text-ink-muted mt-2 pr-8">Manage all incoming requests and clients.</p>
          
          <button 
            onClick={toggleTheme}
            className="absolute top-6 right-6 w-8 h-8 rounded-full bg-surface-2 border border-hairline flex items-center justify-center text-ink-subtle hover:text-ink transition-colors hover:bg-surface-3"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
          </button>
        </div>
        
        <nav className="p-4 flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-y-auto custom-scrollbar">
          {STATUS_TABS.map(tab => {
            const count = contacts.filter(c => getNormalizedStatus(c.status) === tab.id).length;
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;
            
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setExpandedId(null);
                }}
                className={cn(
                  "flex items-center justify-between px-4 py-3 rounded-lg text-[14px] font-medium transition-all shrink-0 md:shrink",
                  isActive 
                    ? "bg-primary text-white shadow-md" 
                    : "text-ink-subtle hover:bg-surface-2 hover:text-ink"
                )}
              >
                <div className="flex items-center gap-3">
                  <Icon size={18} className={isActive ? "text-white/80" : "text-ink-muted"} />
                  <span className="whitespace-nowrap">{tab.label}</span>
                </div>
                <span className={cn(
                  "text-[12px] px-2 py-0.5 rounded-full ml-4",
                  isActive ? "bg-white/20 text-white" : "bg-surface-2 text-ink-muted group-hover:bg-surface-3"
                )}>
                  {count}
                </span>
              </button>
            );
          })}
        </nav>

        <div className="mt-auto p-4 border-t border-hairline hidden md:block">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-ink-subtle hover:text-red-500 hover:bg-red-500/10 transition-colors text-[14px] font-medium"
          >
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <section className="flex-1 p-6 md:p-10 lg:p-12 h-full overflow-y-auto">
        <div className="max-w-[1000px] mx-auto pb-24">
          
          <div className="mb-8">
            <h2 className="text-display-sm text-ink mb-2">
              {STATUS_TABS.find(t => t.id === activeTab)?.label}
            </h2>
            <p className="text-ink-muted">
              You have {activeContacts.length} {activeContacts.length === 1 ? 'record' : 'records'} in this list.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <AnimatePresence mode="popLayout">
              {activeContacts.map(contact => {
                const isExpanded = expandedId === contact.id;

                return (
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    key={contact.id}
                    className="bg-surface-1 border border-hairline hover:border-hairline-strong rounded-xl shadow-sm overflow-hidden transition-colors"
                  >
                    {/* Collapsed Header */}
                    <div 
                      className="p-5 md:p-6 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4"
                      onClick={() => setExpandedId(isExpanded ? null : contact.id)}
                    >
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1">
                        <div>
                          <p className="text-[12px] text-ink-muted uppercase tracking-wider font-semibold mb-1">Business</p>
                          <h3 className="font-semibold text-ink text-[16px] truncate">
                            {contact.business_name || contact.name}
                          </h3>
                        </div>
                        <div>
                          <p className="text-[12px] text-ink-muted uppercase tracking-wider font-semibold mb-1">Contact Name</p>
                          <p className="text-ink text-[15px] truncate">{contact.name}</p>
                        </div>
                        <div>
                          <p className="text-[12px] text-ink-muted uppercase tracking-wider font-semibold mb-1">Date</p>
                          <p className="text-ink text-[15px]">
                            {new Date(contact.created_at).toLocaleDateString(undefined, {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </p>
                        </div>
                      </div>
                      
                      <div className="text-primary hidden md:block shrink-0">
                        <motion.div animate={{ rotate: isExpanded ? 180 : 0 }}>
                          <ChevronDown size={20} />
                        </motion.div>
                      </div>
                    </div>

                    {/* Expanded Details */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="border-t border-hairline bg-surface-2"
                        >
                          <div className="p-5 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                            
                            {/* Left Col Details */}
                            <div className="flex flex-col gap-5">
                              <div>
                                <p className="text-[12px] text-ink-muted uppercase tracking-wider font-semibold mb-2">Contact Details</p>
                                <div className="flex flex-col gap-3">
                                  <div className="flex items-center gap-3 text-ink">
                                    <Mail size={16} className="text-ink-subtle" />
                                    <a href={`mailto:${contact.email}`} className="hover:text-primary transition-colors text-[15px]">{contact.email}</a>
                                  </div>
                                  <div className="flex items-center gap-3 text-ink">
                                    <Phone size={16} className="text-ink-subtle" />
                                    <span className="text-[15px]">{contact.phone}</span>
                                  </div>
                                </div>
                              </div>
                              
                              <div>
                                <p className="text-[12px] text-ink-muted uppercase tracking-wider font-semibold mb-2">Business Type</p>
                                <div className="flex items-center gap-3 text-ink">
                                  <Building2 size={16} className="text-ink-subtle" />
                                  <span className="text-[15px]">{contact.business_type}</span>
                                </div>
                              </div>
                            </div>

                            {/* Right Col Details */}
                            <div className="flex flex-col gap-5">
                              <div className="flex-1">
                                <p className="text-[12px] text-ink-muted uppercase tracking-wider font-semibold mb-2">Services Needed</p>
                                <div className="flex gap-3 text-ink items-start">
                                  <Briefcase size={16} className="text-ink-subtle shrink-0 mt-0.5" />
                                  <p className="text-[15px] leading-relaxed whitespace-pre-wrap">{contact.services_needed}</p>
                                </div>
                              </div>

                              {/* Actions Container */}
                              <div className="pt-4 border-t border-hairline flex flex-wrap gap-3">
                                {activeTab === 'new' && (
                                  <>
                                    <button onClick={() => updateStatus(contact.id, 'contacted')} className="px-5 py-2.5 bg-primary text-white rounded-lg text-[14px] font-medium hover:bg-primary/90 transition-colors shadow-sm">
                                      Mark as Contacted
                                    </button>
                                    <button onClick={() => deleteContact(contact.id)} className="px-4 py-2.5 bg-red-500/10 text-red-600 rounded-lg text-[14px] font-medium hover:bg-red-500/20 transition-colors flex items-center gap-2">
                                      <Trash2 size={16} /> Delete
                                    </button>
                                  </>
                                )}

                                {activeTab === 'contacted' && (
                                  <>
                                    <button onClick={() => updateStatus(contact.id, 'yet_to_serve')} className="px-5 py-2.5 bg-primary text-white rounded-lg text-[14px] font-medium hover:bg-primary/90 transition-colors shadow-sm">
                                      Move to Yet to Serve
                                    </button>
                                    <button onClick={() => updateStatus(contact.id, 'on_hold')} className="px-5 py-2.5 bg-surface-3 text-ink rounded-lg text-[14px] font-medium hover:bg-surface-4 transition-colors">
                                      Place On Hold
                                    </button>
                                  </>
                                )}

                                {activeTab === 'yet_to_serve' && (
                                  <>
                                    <button onClick={() => updateStatus(contact.id, 'live')} className="px-5 py-2.5 bg-green-600 text-white rounded-lg text-[14px] font-medium hover:bg-green-700 transition-colors shadow-sm">
                                      Set as Live Client
                                    </button>
                                    <button onClick={() => updateStatus(contact.id, 'on_hold')} className="px-5 py-2.5 bg-surface-3 text-ink rounded-lg text-[14px] font-medium hover:bg-surface-4 transition-colors">
                                      Place On Hold
                                    </button>
                                  </>
                                )}

                                {activeTab === 'live' && (
                                  <button onClick={() => updateStatus(contact.id, 'yet_to_serve')} className="px-5 py-2.5 border border-hairline text-ink rounded-lg text-[14px] font-medium hover:bg-surface-3 transition-colors">
                                    Revert to Yet to Serve
                                  </button>
                                )}

                                {activeTab === 'on_hold' && (
                                  <>
                                    <button onClick={() => updateStatus(contact.id, 'yet_to_serve')} className="px-5 py-2.5 bg-primary text-white rounded-lg text-[14px] font-medium hover:bg-primary/90 transition-colors shadow-sm">
                                      Resume (Yet to Serve)
                                    </button>
                                    <button onClick={() => deleteContact(contact.id)} className="px-4 py-2.5 bg-red-500/10 text-red-600 rounded-lg text-[14px] font-medium hover:bg-red-500/20 transition-colors flex items-center gap-2">
                                      <Trash2 size={16} /> Delete
                                    </button>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {activeContacts.length === 0 && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-20 text-center border-2 border-dashed border-hairline rounded-2xl bg-surface-1/50"
              >
                <div className="w-16 h-16 rounded-full bg-surface-2 flex items-center justify-center mx-auto mb-4 text-ink-subtle">
                  <LayoutDashboard size={24} />
                </div>
                <h3 className="text-ink font-medium text-[16px]">No records found</h3>
                <p className="text-ink-muted text-[14px] mt-1">This list is currently empty.</p>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {confirmModal.isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
              className="bg-surface-1 border border-hairline shadow-2xl rounded-[20px] w-full max-w-[400px] p-6 relative overflow-hidden"
            >
              <h3 className="text-[18px] font-semibold text-ink mb-2">{confirmModal.title}</h3>
              <p className="text-[14px] text-ink-muted mb-8 leading-relaxed">
                {confirmModal.message}
              </p>
              
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setConfirmModal(prev => ({ ...prev, isOpen: false }))}
                  className="px-4 py-2.5 rounded-lg text-[14px] font-medium text-ink-subtle hover:bg-surface-2 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmModal.onConfirm}
                  className={cn(
                    "px-5 py-2.5 rounded-lg text-[14px] font-medium text-white transition-colors shadow-sm",
                    confirmModal.isDanger ? "bg-red-500 hover:bg-red-600" : "bg-primary hover:bg-primary/90"
                  )}
                >
                  Confirm
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
          height: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: var(--color-hairline-strong);
          border-radius: 4px;
        }
      `}} />
    </main>
  );
}
