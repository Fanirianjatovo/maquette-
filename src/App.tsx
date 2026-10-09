/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Search,
  User,
  UserPlus,
  Play,
  X,
  Menu,
  Home,
  Film,
  Calendar,
  MessageSquare,
  Headphones,
  FileText,
  Clock,
  CreditCard,
  Gift,
  Award,
  Radio,
  Tv,
  ChevronRight,
  TrendingUp,
  ShieldCheck,
  Check,
  Sparkles,
  Download,
  HelpCircle,
} from 'lucide-react';

// Sport definitions with distinctive colors and theme tokens
interface SportItem {
  id: string;
  name: string;
  iconType: 'foot' | 'basket' | 'tennis' | 'rugby' | 'hockey';
  bg: string;
  fg: string;
}

const SPORTS: SportItem[] = [
  { id: 'foot', name: 'Foot', iconType: 'foot', bg: '#1FA85A', fg: '#0B3B6E' },
  { id: 'basket', name: 'Basket', iconType: 'basket', bg: '#FFD23F', fg: '#0B3B6E' },
  { id: 'tennis', name: 'Tennis', iconType: 'tennis', bg: '#8ED1F5', fg: '#0B3B6E' },
  { id: 'rugby', name: 'Rugby', iconType: 'rugby', bg: '#0B3B6E', fg: '#FFFFFF' },
  { id: 'usfoot', name: 'Football américain', iconType: 'rugby', bg: '#0E7A3E', fg: '#FFFFFF' },
  { id: 'hockey', name: 'Hockey', iconType: 'hockey', bg: '#BDE4FB', fg: '#0B3B6E' },
];

interface ContentTypeItem {
  id: string;
  name: string;
  color: string;
}

const CONTENT_TYPES: ContentTypeItem[] = [
  { id: 'all', name: 'Tout', color: '#0B3B6E' },
  { id: 'highlights', name: 'Highlights', color: '#8ED1F5' },
  { id: 'chansons', name: 'Chansons', color: '#FFD23F' },
  { id: 'telefilms', name: 'Téléfilms', color: '#1FA85A' },
  { id: 'gags', name: 'Gags', color: '#FFFFFF' },
];

const VIDEO_TITLES: Record<string, string[]> = {
  foot: [
    'Foot en vidéos : les plus beaux buts',
    'Foot en chansons : le chant des supporters',
    'Foot en téléfilm : la dernière chance',
    'Foot en gags : le gardien fait le show',
  ],
  basket: [
    'Basket en vidéos : les dunks de la saison',
    'Basket en chansons : le rythme du parquet',
    'Basket en téléfilm : la finale d’une vie',
    'Basket en gags : le ballon qui refuse d’entrer',
  ],
  tennis: [
    'Tennis en vidéos : smash et revers au ralenti',
    'Tennis en chansons : la balade du court central',
    'Tennis en téléfilm : le tournoi des outsiders',
    'Tennis en gags : le ramasseur de balles au micro',
  ],
  rugby: [
    'Rugby en vidéos : les essais les plus fous',
    'Rugby en chansons : le haka en musique',
    'Rugby en téléfilm : les héros du terrain boueux',
    'Rugby en gags : la mêlée qui tourne mal',
  ],
  usfoot: [
    'Foot US en vidéos : touchdown, le top 10',
    'Foot US en chansons : l’hymne du stade',
    'Foot US en téléfilm : le quarterback de rêve',
    'Foot US en gags : le coach perd son sifflet',
  ],
  hockey: [
    'Hockey en vidéos : les arrêts impossibles',
    'Hockey en chansons : la chanson de la patinoire',
    'Hockey en téléfilm : duel sur la glace',
    'Hockey en gags : le palet qui rebondit partout',
  ],
};

const DURATIONS = ['03:12', '02:48', '12:30', '01:05'];

// Navigation items for the requested left sidebar ("la file de gauche")
interface SidebarTabItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  category?: string;
  modalTarget?: string;
}

const SIDEBAR_TABS: {
  category?: string;
  items: SidebarTabItem[];
}[] = [
  {
    items: [
      { id: 'accueil', label: 'Accueil', icon: <Home className="w-5 h-5" /> },
      { id: 'videos', label: 'Vidéos', icon: <Film className="w-5 h-5" /> },
      { id: 'programme', label: 'Programme & résultats', icon: <Calendar className="w-5 h-5" /> },
      { id: 'forum', label: 'Forum du club', icon: <MessageSquare className="w-5 h-5" /> },
      { id: 'service-client', label: 'Service client', icon: <Headphones className="w-5 h-5" /> },
    ],
  },
  {
    category: 'MON COMPTE',
    items: [
      { id: 'inscription-connexion', label: 'Inscription / connexion', icon: <UserPlus className="w-5 h-5" />, modalTarget: 'login' },
      { id: 'mes-coordonnees', label: 'Mes coordonnées', icon: <User className="w-5 h-5" /> },
      { id: 'mon-historique', label: 'Mon historique', icon: <Clock className="w-5 h-5" /> },
      { id: 'mes-retraits', label: 'Mes retraits', icon: <CreditCard className="w-5 h-5" /> },
      { id: 'parrainage', label: 'Parrainage', icon: <Gift className="w-5 h-5" /> },
    ],
  },
  {
    category: 'DANS LES COULISSES',
    items: [
      { id: 'formation-paris', label: 'Formation paris sportifs', icon: <Award className="w-5 h-5" /> },
      { id: 'devenir-journaliste', label: 'Devenir journaliste', icon: <Radio className="w-5 h-5" /> },
      { id: 'pika-shoot-tv', label: 'Pika Shoot TV', icon: <Tv className="w-5 h-5" /> },
    ],
  },
];

// SVG Sport Icons
function SportIcon({ type, className = "w-6 h-6" }: { type: SportItem['iconType']; className?: string }) {
  if (type === 'foot') {
    return (
      <svg className={className} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round">
        <circle cx="32" cy="32" r="26" />
        <path d="M32 22l10 7-4 12H26l-4-12zM32 22V6M42 29l15-5M38 41l9 12M26 41l-9 12M22 29L7 24" />
      </svg>
    );
  }
  if (type === 'basket') {
    return (
      <svg className={className} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
        <circle cx="32" cy="32" r="26" />
        <path d="M6 32h52M32 6v52M14 13c10 10 10 28 0 38M50 13c-10 10-10 28 0 38" />
      </svg>
    );
  }
  if (type === 'tennis') {
    return (
      <svg className={className} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
        <ellipse cx="32" cy="25" rx="16" ry="19" />
        <path d="M16 25h32M32 6v38M20 12l24 26M44 12L20 38M32 44v16" />
      </svg>
    );
  }
  if (type === 'rugby') {
    return (
      <svg className={className} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
        <ellipse cx="32" cy="32" rx="27" ry="15" transform="rotate(-40 32 32)" />
        <path d="M22 42l20-20M29 35l-3-3M34 30l-3-3M39 25l-3-3" />
      </svg>
    );
  }
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round">
      <path d="M14 6l16 40h16M50 6L34 46H20M40 56h16" />
    </svg>
  );
}

export default function App() {
  // Navigation & filtering state
  const [activeSidebarTab, setActiveSidebarTab] = useState<string>('accueil');
  const [selectedSport, setSelectedSport] = useState<string | null>(null);
  const [selectedContentType, setSelectedContentType] = useState<string>('all');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Modals state
  const [activeModal, setActiveModal] = useState<
    | { type: 'video'; sportIndex: number; contentIndex: number }
    | { type: 'login' }
    | { type: 'signup' }
    | { type: 'search' }
    | { type: 'download' }
    | { type: 'generic'; title: string; content?: string }
    | null
  >(null);

  const [searchQuery, setSearchQuery] = useState('');

  // Handle sidebar tab clicks
  const handleSidebarTabClick = (item: SidebarTabItem) => {
    setActiveSidebarTab(item.id);
    setMobileMenuOpen(false);

    if (item.modalTarget === 'login') {
      setActiveModal({ type: 'login' });
      return;
    }

    if (item.id === 'accueil') {
      setSelectedSport(null);
      setSelectedContentType('all');
      return;
    }

    if (item.id === 'videos') {
      setSelectedContentType('all');
      const el = document.getElementById('catalogue-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    // Show clean mockup informational modal for secondary pages
    setActiveModal({
      type: 'generic',
      title: item.label,
      content: `Vous naviguez vers l’onglet « ${item.label} » de PikaSport. Retrouvez ici tous les contenus exclusifs et fonctionnalités associées.`,
    });
  };

  const openVideoModal = (sportIndex: number, contentIndex: number) => {
    setActiveModal({ type: 'video', sportIndex, contentIndex });
  };

  // Filtered sports list
  const displayedSports = selectedSport
    ? SPORTS.filter((s) => s.id === selectedSport)
    : SPORTS;

  return (
    <div className="min-h-screen bg-[#CFEBFB] text-[#0B3B6E] flex flex-col selection:bg-[#FFD23F] selection:text-[#0B3B6E]">
      {/* Top Ticker Marquee */}
      <div
        className="relative h-10 overflow-hidden bg-[#FFD23F] text-[#0B3B6E] border-b-[3px] border-[#0B3B6E] font-bold text-sm tracking-wide z-20 flex items-center shadow-xs"
        role="marquee"
        aria-label="Présentation du site"
      >
        <span className="animate-marquee font-extrabold text-[14px]">
          🔥 PikaSport, le site 100 % sport : retrouve tous les highlights, chansons, téléfilms et gags de foot, basket, tennis, rugby, football américain et hockey. Toutes les vidéos sont créées par intelligence artificielle. • Rejoins dès maintenant la communauté de passionnés !
        </span>
      </div>

      <div className="flex-1 flex w-full">
        {/* ========================================================= */}
        {/* LEFT SIDEBAR ("la file de gauche")                       */}
        {/* Spec: onglets en Arial Black 16 gras avec fond mis en valeur */}
        {/* ========================================================= */}
        <aside
          className={`
            fixed inset-y-0 left-0 z-40 w-72 lg:w-76 xl:w-80 bg-white border-r-[3px] border-[#0B3B6E]
            flex flex-col p-4 shadow-xl transition-transform duration-300 ease-out
            lg:translate-x-0 lg:static lg:h-auto lg:min-h-screen lg:shadow-none
            ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
          `}
        >
          {/* Mobile Sidebar Close Button */}
          <div className="flex items-center justify-between lg:hidden mb-4 pb-2 border-b-2 border-[#9FD3F2]">
            <span className="font-extrabold text-lg text-[#0B3B6E] tracking-tight">MENU PIKASPORT</span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-1.5 rounded-full bg-[#FFD23F] text-[#0B3B6E] border-2 border-[#0B3B6E] hover:bg-yellow-400"
              aria-label="Fermer le menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Sidebar Header Brand / Status */}
          <div className="mb-4 hidden lg:flex items-center justify-between px-2 pb-3 border-b-2 border-[#9FD3F2]/60">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#1FA85A] border border-[#0B3B6E] animate-pulse"></span>
              <span className="text-xs font-black tracking-wider uppercase text-[#0B3B6E]/80">
                PLATEFORME 100% SPORT
              </span>
            </div>
            <span className="text-[11px] font-black bg-[#FFD23F] text-[#0B3B6E] px-2 py-0.5 rounded border border-[#0B3B6E]">
              IA SPORT
            </span>
          </div>

          {/* Navigation Items container */}
          <div className="flex-1 overflow-y-auto pr-1 space-y-4 no-scrollbar">
            {SIDEBAR_TABS.map((group, groupIndex) => (
              <div key={groupIndex} className="space-y-1.5">
                {group.category && (
                  <div className="pt-2 pb-1 px-2">
                    <span className="inline-block text-[11px] font-black tracking-widest text-[#0B3B6E]/70 uppercase border-b-2 border-[#FFD23F]">
                      {group.category}
                    </span>
                  </div>
                )}

                <div className="space-y-2">
                  {group.items.map((tab) => {
                    const isActive = activeSidebarTab === tab.id;

                    return (
                      <button
                        key={tab.id}
                        onClick={() => handleSidebarTabClick(tab)}
                        className={`
                          sidebar-tab
                          w-full flex items-center justify-between gap-3 px-3.5 py-3 rounded-xl
                          border-[2.5px] cursor-pointer text-left
                          ${
                            isActive
                              ? 'bg-[#FFD23F] text-[#0B3B6E] border-[#0B3B6E] shadow-[0_4px_0_#0B3B6E] translate-x-1'
                              : 'bg-[#EAF6FD] text-[#0B3B6E] border-[#0B3B6E]/75 hover:bg-[#D7EFFF] hover:border-[#0B3B6E] hover:shadow-[0_2px_0_#0B3B6E]'
                          }
                        `}
                        style={{
                          fontFamily: "'Arial Black', 'Impact', sans-serif",
                          fontSize: '16px',
                          fontWeight: 900,
                        }}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <span
                            className={`
                              flex items-center justify-center w-8 h-8 rounded-lg border-2 border-[#0B3B6E] shrink-0
                              ${isActive ? 'bg-white text-[#0B3B6E]' : 'bg-[#FFD23F] text-[#0B3B6E]'}
                            `}
                          >
                            {tab.icon}
                          </span>
                          <span
                            className="truncate text-[#0B3B6E]"
                            style={{
                              fontFamily: "'Arial Black', 'Impact', sans-serif",
                              fontSize: '16px',
                              fontWeight: 900,
                            }}
                          >
                            {tab.label}
                          </span>
                        </div>

                        {isActive && (
                          <span className="w-2.5 h-2.5 rounded-full bg-[#0B3B6E] shrink-0 shadow-xs" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Club Community Join Card */}
            <div className="mt-5 p-3.5 bg-[#FFD23F] text-[#0B3B6E] rounded-2xl border-[3px] border-[#0B3B6E] shadow-[0_4px_0_#0B3B6E]">
              <div className="flex items-center gap-1.5 mb-1.5">
                <Sparkles className="w-4 h-4 text-[#0E7A3E]" />
                <span className="text-[12px] font-black uppercase tracking-wider text-[#0E7A3E]">
                  COMMUNAUTÉ VIP
                </span>
              </div>
              <h4
                className="leading-tight mb-1 text-[#0B3B6E]"
                style={{
                  fontFamily: "'Arial Black', 'Impact', sans-serif",
                  fontSize: '15px',
                  fontWeight: 900,
                }}
              >
                Votre sport.<br />Votre communauté.
              </h4>
              <p className="text-xs font-semibold text-[#0B3B6E]/80 leading-relaxed mb-3">
                Retrouvez vos analyses vidéo et échangez avec des milliers de passionnés.
              </p>
              <button
                onClick={() => setActiveModal({ type: 'signup' })}
                className="w-full py-2.5 px-3 bg-[#0E7A3E] hover:bg-[#1FA85A] text-white font-extrabold text-sm rounded-xl border-2 border-[#0B3B6E] shadow-[0_2px_0_#0B3B6E] active:translate-y-0.5 transition-all text-center"
              >
                Rejoindre le club
              </button>
            </div>

            {/* Téléchargement immédiat de la maquette */}
            <div className="p-3 bg-white text-[#0B3B6E] rounded-2xl border-[2.5px] border-[#0B3B6E] shadow-[0_3px_0_#0B3B6E]">
              <div className="flex items-center gap-1.5 mb-1 text-[#0B3B6E]">
                <Download className="w-4 h-4 text-[#0E7A3E]" />
                <span className="text-[11px] font-black uppercase tracking-wider text-[#0E7A3E]">
                  TÉLÉCHARGER LA MAQUETTE
                </span>
              </div>
              <p className="text-[11px] font-bold text-[#0B3B6E]/80 mb-2 leading-tight">
                Téléchargez le fichier HTML autonome complet pour l'ouvrir sur votre ordinateur.
              </p>
              <div className="flex gap-1.5">
                <a
                  href="/pikasport_maquette.html"
                  download="pikasport_maquette.html"
                  className="flex-1 py-2 px-2 bg-[#0E7A3E] hover:bg-[#1FA85A] text-white font-black text-xs rounded-xl border-2 border-[#0B3B6E] flex items-center justify-center gap-1.5 shadow-xs transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Fichier .HTML</span>
                </a>
                <button
                  onClick={() => setActiveModal({ type: 'download' })}
                  className="py-2 px-2.5 bg-[#FFD23F] hover:bg-yellow-400 text-[#0B3B6E] font-black text-xs rounded-xl border-2 border-[#0B3B6E] flex items-center justify-center shadow-xs transition-colors"
                  title="Comment télécharger ?"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Responsible Gaming Notice */}
            <div className="p-3 bg-[#1FA85A]/15 text-[#0B3B6E] rounded-xl border-2 border-[#1FA85A] text-[11px] leading-tight">
              <div className="flex items-center gap-1 font-black text-[#0E7A3E] mb-1">
                <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                <span>18+ • GARDEZ LE CONTRÔLE</span>
              </div>
              <p className="text-[10px] text-[#0B3B6E]/90 font-medium">
                Le sport se partage. Les paris comportent des risques : endettement, dépendance, isolement.
              </p>
              <p className="font-extrabold text-[10px] mt-1 text-[#0E7A3E]">
                Joueurs Info Service : 09 74 75 13 13
              </p>
            </div>
          </div>
        </aside>

        {/* Mobile Sidebar Backdrop Overlay */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 bg-[#051628]/60 z-30 lg:hidden backdrop-blur-xs"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}

        {/* ========================================================= */}
        {/* MAIN CONTENT AREA                                         */}
        {/* ========================================================= */}
        <main className="flex-1 flex flex-col min-w-0">
          {/* Main Top Header */}
          <header className="bg-white border-b-4 border-[#FFD23F] sticky top-0 z-10 shadow-xs">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-3">
              {/* Left group: Mobile toggle & Logo */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setMobileMenuOpen(true)}
                  className="lg:hidden p-2 rounded-xl bg-[#E6F5FD] border-2 border-[#0B3B6E] text-[#0B3B6E] hover:bg-[#FFD23F]"
                  aria-label="Ouvrir le menu"
                >
                  <Menu className="w-5 h-5" />
                </button>

                <a href="#" className="flex items-center gap-2.5 group">
                  <div className="w-10 h-10 rounded-full bg-[#FFD23F] border-[3px] border-[#0B3B6E] flex items-center justify-center shadow-xs group-hover:rotate-6 transition-transform">
                    <SportIcon type="foot" className="w-6 h-6 text-[#0B3B6E]" />
                  </div>
                  <div className="flex flex-col">
                    <span
                      className="text-2xl sm:text-3xl text-[#0B3B6E] tracking-tight leading-none"
                      style={{
                        fontFamily: "'Arial Black', 'Impact', sans-serif",
                        fontWeight: 900,
                      }}
                    >
                      PIKASPORT<span className="text-[#0E7A3E]">.COM</span>
                    </span>
                    <span className="text-[10px] font-bold tracking-widest text-[#1572C8] uppercase -mt-0.5">
                      QUE DU SPORT EN VIDÉOS
                    </span>
                  </div>
                </a>
              </div>

              {/* Center Search Bar */}
              <button
                onClick={() => setActiveModal({ type: 'search' })}
                className="flex-1 min-w-[200px] max-w-md h-11 rounded-full bg-[#E6F5FD] border-2 border-[#9FD3F2] px-4 flex items-center gap-2.5 text-sm font-semibold text-[#0B3B6E]/70 hover:border-[#0B3B6E] hover:bg-white transition-all text-left shadow-2xs"
              >
                <Search className="w-4 h-4 text-[#1572C8]" />
                <span className="truncate">Rechercher un match, un sport, une chanson...</span>
              </button>

              {/* Right Action Buttons */}
              <div className="flex items-center gap-2">
                <a
                  href="/pikasport_maquette.html"
                  download="pikasport_maquette.html"
                  className="h-10 px-3.5 rounded-full font-black text-xs sm:text-sm border-2 border-[#0B3B6E] bg-[#FFD23F] text-[#0B3B6E] hover:bg-yellow-300 active:translate-y-0.5 transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
                  title="Télécharger la maquette HTML modifiée"
                >
                  <Download className="w-4 h-4" />
                  <span>Télécharger</span>
                </a>
                <button
                  onClick={() => setActiveModal({ type: 'download' })}
                  className="h-10 w-10 rounded-full font-bold text-sm border-2 border-[#0B3B6E] bg-white text-[#0B3B6E] hover:bg-[#E6F5FD] active:translate-y-0.5 transition-all shadow-xs flex items-center justify-center cursor-pointer"
                  title="Guide de téléchargement"
                >
                  <HelpCircle className="w-4 h-4 text-[#1572C8]" />
                </button>
                <button
                  onClick={() => setActiveModal({ type: 'login' })}
                  className="h-10 px-3.5 sm:px-4 rounded-full font-bold text-xs sm:text-sm border-2 border-[#0B3B6E] bg-white text-[#0B3B6E] hover:bg-[#E6F5FD] active:translate-y-0.5 transition-all shadow-xs hidden sm:flex items-center gap-1.5"
                >
                  <User className="w-4 h-4" />
                  <span>Connexion</span>
                </button>
                <button
                  onClick={() => setActiveModal({ type: 'signup' })}
                  className="h-10 px-3.5 sm:px-4 rounded-full font-bold text-xs sm:text-sm border-2 border-[#0B3B6E] bg-[#0E7A3E] text-white hover:bg-[#1FA85A] active:translate-y-0.5 transition-all shadow-xs flex items-center gap-1.5"
                >
                  <UserPlus className="w-4 h-4" />
                  <span className="hidden sm:inline">Créer un compte</span>
                  <span className="sm:hidden">S'inscrire</span>
                </button>
              </div>
            </div>

            {/* Content Type Filter Pills Bar */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-3 pt-1 flex items-center gap-2 overflow-x-auto no-scrollbar">
              <span className="text-xs font-black uppercase text-[#0B3B6E]/60 tracking-wider mr-1 hidden sm:inline">
                Formats :
              </span>
              {CONTENT_TYPES.map((type) => {
                const isActive = selectedContentType === type.id;
                return (
                  <button
                    key={type.id}
                    onClick={() => setSelectedContentType(type.id)}
                    className={`
                      px-4 py-1.5 rounded-lg text-xs sm:text-sm font-extrabold border-2 transition-all shrink-0 cursor-pointer
                      ${
                        isActive
                          ? 'bg-[#0B3B6E] text-white border-[#0B3B6E] shadow-xs'
                          : 'bg-white text-[#0B3B6E] border-[#0B3B6E]/30 hover:border-[#0B3B6E] hover:bg-[#E6F5FD]'
                      }
                    `}
                  >
                    {type.name}
                  </button>
                );
              })}
            </div>
          </header>

          {/* Sports Selector Row */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 py-4 w-full">
            <div className="flex gap-2.5 overflow-x-auto pb-1 no-scrollbar items-center">
              <button
                onClick={() => setSelectedSport(null)}
                className={`
                  flex items-center gap-2 px-4 py-2.5 rounded-full font-bold text-sm shrink-0 border-2 transition-all
                  ${
                    selectedSport === null
                      ? 'bg-[#FFD23F] text-[#0B3B6E] border-[#0B3B6E] shadow-xs'
                      : 'bg-white text-[#0B3B6E] border-[#9FD3F2] hover:border-[#0B3B6E]'
                  }
                `}
              >
                <Sparkles className="w-4 h-4 text-[#0B3B6E]" />
                <span>Tous les sports</span>
              </button>

              {SPORTS.map((sport) => {
                const isSelected = selectedSport === sport.id;
                return (
                  <button
                    key={sport.id}
                    onClick={() => setSelectedSport(isSelected ? null : sport.id)}
                    className={`
                      flex items-center gap-2 px-4 py-2.5 rounded-full font-bold text-sm shrink-0 border-2 transition-all
                      ${
                        isSelected
                          ? 'bg-[#0B3B6E] text-white border-[#0B3B6E] shadow-sm'
                          : 'bg-white text-[#0B3B6E] border-[#9FD3F2] hover:border-[#0B3B6E] hover:bg-[#E6F5FD]'
                      }
                    `}
                  >
                    <SportIcon type={sport.iconType} className="w-5 h-5 shrink-0" />
                    <span>{sport.name}</span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Hero Section + Trending Sidebar */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 py-2 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              {/* Featured Big Card */}
              <div className="lg:col-span-8">
                <button
                  onClick={() => openVideoModal(0, 0)}
                  className="w-full text-left bg-[#0A2F5C] rounded-2xl p-6 sm:p-8 min-h-[360px] sm:min-h-[400px] relative text-white flex flex-col justify-end gap-3.5 overflow-hidden border-[3px] border-[#0B3B6E] shadow-md group cursor-pointer"
                >
                  {/* Subtle background sport icon watermark */}
                  <div className="absolute right-[-20px] top-[-20px] text-[#1B4B84]/40 w-64 h-64 pointer-events-none group-hover:scale-105 transition-transform">
                    <SportIcon type="foot" className="w-full h-full" />
                  </div>

                  <div className="relative z-10 flex items-center gap-2">
                    <span className="bg-[#FFD23F] text-[#0B3B6E] font-black text-xs px-2.5 py-1 rounded-md border border-[#0B3B6E]">
                      À LA UNE
                    </span>
                    <span className="bg-[#1FA85A] text-white font-black text-xs px-2 py-0.5 rounded-md">
                      VIDÉO IA DU JOUR
                    </span>
                  </div>

                  <h2
                    className="relative z-10 text-2xl sm:text-4xl lg:text-5xl font-black leading-tight max-w-2xl text-white drop-shadow-sm"
                    style={{
                      fontFamily: "'Arial Black', 'Impact', sans-serif",
                    }}
                  >
                    Tous les sports en vidéos, en chansons, en téléfilms et en gags
                  </h2>

                  <p className="relative z-10 text-white/90 text-sm sm:text-base max-w-xl font-medium">
                    Les plus beaux moments du foot, du basket, du tennis, du rugby, du football américain et du hockey propulsés par intelligence artificielle.
                  </p>

                  <div className="relative z-10 pt-2">
                    <span className="inline-flex items-center gap-2 bg-[#FFD23F] text-[#0B3B6E] font-extrabold text-sm sm:text-base px-6 py-3 rounded-full border-2 border-[#0B3B6E] shadow-md group-hover:bg-yellow-300 transition-colors">
                      <Play className="w-5 h-5 fill-current" />
                      Regarder maintenant
                    </span>
                  </div>
                </button>
              </div>

              {/* Trending Column */}
              <div className="lg:col-span-4 flex flex-col">
                <div className="bg-white rounded-2xl p-5 border-2 border-[#9FD3F2] shadow-sm flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-3 pb-2 border-b-2 border-[#9FD3F2]">
                    <TrendingUp className="w-5 h-5 text-[#1572C8]" />
                    <h3
                      className="text-lg text-[#0B3B6E]"
                      style={{
                        fontFamily: "'Arial Black', 'Impact', sans-serif",
                        fontWeight: 900,
                      }}
                    >
                      Tendances
                    </h3>
                  </div>

                  <div className="space-y-2.5 flex-1 flex flex-col justify-between">
                    {[
                      { rank: 1, title: 'Tous les sports en vidéos', desc: 'Les meilleurs moments · Vidéos IA', s: 0, t: 0 },
                      { rank: 2, title: 'Tous les sports en chansons', desc: 'Hymnes et refrains · Chansons', s: 0, t: 1 },
                      { rank: 3, title: 'Tous les sports en téléfilms', desc: 'Histoires de champions · Téléfilms', s: 0, t: 2 },
                      { rank: 4, title: 'Tous les sports en gags', desc: 'Les fous rires du stade · Gags', s: 0, t: 3 },
                      { rank: 5, title: 'Tous les sports, un seul club', desc: 'Foot, basket, tennis, rugby, foot US, hockey', s: 3, t: 0 },
                    ].map((item) => (
                      <button
                        key={item.rank}
                        onClick={() => openVideoModal(item.s, item.t)}
                        className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-[#E6F5FD] transition-colors text-left group cursor-pointer border border-transparent hover:border-[#9FD3F2]"
                      >
                        <span className="w-7 h-7 rounded-full bg-[#FFD23F] text-[#0B3B6E] font-black text-xs flex items-center justify-center border-2 border-[#0B3B6E] shrink-0 group-hover:scale-110 transition-transform">
                          {item.rank}
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="font-extrabold text-xs text-[#0B3B6E] truncate group-hover:text-[#1572C8]">
                            {item.title}
                          </p>
                          <p className="text-[11px] text-[#0B3B6E]/70 font-semibold truncate">
                            {item.desc}
                          </p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-[#0B3B6E]/40 group-hover:text-[#0B3B6E] shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ========================================================= */}
          {/* CATALOGUE BY SPORT ROWS                                   */}
          {/* ========================================================= */}
          <div id="catalogue-section" className="max-w-7xl mx-auto px-4 sm:px-6 py-6 w-full space-y-9">
            {displayedSports.map((sport, sportIndex) => {
              const titles = VIDEO_TITLES[sport.id] || [];

              return (
                <section key={sport.id} className="space-y-3">
                  {/* Row Header */}
                  <div className="flex items-center justify-between pb-1 border-b-2 border-[#9FD3F2]">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-white border-2 border-[#0B3B6E] flex items-center justify-center shadow-2xs">
                        <SportIcon type={sport.iconType} className="w-5 h-5 text-[#0B3B6E]" />
                      </div>
                      <h2
                        className="text-xl sm:text-2xl text-[#0B3B6E] tracking-tight"
                        style={{
                          fontFamily: "'Arial Black', 'Impact', sans-serif",
                          fontWeight: 900,
                        }}
                      >
                        {sport.name}
                      </h2>
                    </div>

                    <button
                      onClick={() => setSelectedSport(sport.id)}
                      className="font-extrabold text-xs sm:text-sm text-[#1572C8] hover:text-[#0B3B6E] flex items-center gap-1 group"
                    >
                      <span>Tout voir</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>

                  {/* Horizontal Scrollable Row of Cards */}
                  <div className="flex gap-4 overflow-x-auto pb-3 pt-1 no-scrollbar snap-x snap-mandatory">
                    {[0, 1, 2, 3].map((contentIdx) => {
                      const typeMeta = [
                        { name: 'Highlight', color: '#8ED1F5' },
                        { name: 'Chanson', color: '#FFD23F' },
                        { name: 'Téléfilm', color: '#1FA85A' },
                        { name: 'Gag', color: '#FFFFFF' },
                      ][contentIdx];

                      const title = titles[contentIdx] || `${sport.name} en vidéo`;
                      const duration = DURATIONS[contentIdx] || '03:00';

                      // Check filter
                      if (
                        selectedContentType !== 'all' &&
                        ((selectedContentType === 'highlights' && contentIdx !== 0) ||
                          (selectedContentType === 'chansons' && contentIdx !== 1) ||
                          (selectedContentType === 'telefilms' && contentIdx !== 2) ||
                          (selectedContentType === 'gags' && contentIdx !== 3))
                      ) {
                        return null;
                      }

                      return (
                        <button
                          key={contentIdx}
                          onClick={() => openVideoModal(sportIndex, contentIdx)}
                          className="shrink-0 w-72 sm:w-80 bg-white rounded-2xl border-[2.5px] border-[#0B3B6E] overflow-hidden text-left snap-start hover:-translate-y-1 hover:shadow-lg transition-all group cursor-pointer flex flex-col"
                        >
                          {/* Card Thumbnail Box */}
                          <div
                            className="h-44 sm:h-48 relative flex items-center justify-center p-4 transition-colors"
                            style={{
                              backgroundColor: sport.bg,
                              color: sport.fg,
                            }}
                          >
                            <SportIcon type={sport.iconType} className="w-20 h-20 opacity-90 group-hover:scale-110 transition-transform" />

                            {/* Format Tag */}
                            <span
                              className="absolute top-3 left-3 px-2.5 py-0.5 rounded-md text-xs font-black border-2 border-[#0B3B6E]"
                              style={{
                                backgroundColor: typeMeta.color,
                                color: '#0B3B6E',
                              }}
                            >
                              {typeMeta.name}
                            </span>

                            {/* Play Circle Icon */}
                            <div className="absolute bottom-3 left-3 w-9 h-9 rounded-full bg-white border-2 border-[#0B3B6E] flex items-center justify-center shadow-xs group-hover:bg-[#FFD23F] transition-colors">
                              <Play className="w-4 h-4 fill-[#0B3B6E] text-[#0B3B6E] ml-0.5" />
                            </div>

                            {/* Duration Badge */}
                            <span className="absolute bottom-3 right-3 bg-[#0B3B6E] text-white text-[11px] font-extrabold px-2 py-0.5 rounded-md border border-white/20">
                              {duration}
                            </span>
                          </div>

                          {/* Card Body */}
                          <div className="p-3.5 flex-1 flex flex-col justify-between">
                            <h3 className="font-extrabold text-sm sm:text-[15px] leading-snug text-[#0B3B6E] group-hover:text-[#1572C8] line-clamp-2">
                              {title}
                            </h3>
                            <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#9FD3F2]/50 text-xs">
                              <span className="font-bold text-[#0B3B6E]/70">{sport.name}</span>
                              <span className="font-extrabold text-[#0E7A3E] bg-[#1FA85A]/15 px-2 py-0.5 rounded">
                                Vidéo IA
                              </span>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </section>
              );
            })}
          </div>

          {/* Call to Action Banner */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 my-6 w-full">
            <div className="bg-[#1FA85A] text-[#0B3B6E] rounded-3xl p-6 sm:p-8 border-[3px] border-[#0B3B6E] flex flex-wrap items-center justify-between gap-5 shadow-md">
              <div className="max-w-xl">
                <span className="bg-[#FFD23F] text-[#0B3B6E] text-xs font-black px-2.5 py-0.5 rounded border border-[#0B3B6E] uppercase">
                  Rejoins l’aventure
                </span>
                <h2
                  className="text-2xl sm:text-3xl text-white font-black mt-2 leading-tight"
                  style={{
                    fontFamily: "'Arial Black', 'Impact', sans-serif",
                  }}
                >
                  Rejoins la communauté PikaSport
                </h2>
                <p className="text-white/90 text-sm font-semibold mt-1">
                  Crée ton profil gratuitement, vote pour tes highlights IA préférés et participe aux pronostics communautaires.
                </p>
              </div>

              <button
                onClick={() => setActiveModal({ type: 'signup' })}
                className="px-6 py-3.5 bg-[#FFD23F] hover:bg-yellow-300 text-[#0B3B6E] font-black text-base rounded-full border-2 border-[#0B3B6E] shadow-md active:translate-y-0.5 transition-all cursor-pointer"
                style={{
                  fontFamily: "'Arial Black', 'Impact', sans-serif",
                }}
              >
                Créer mon compte gratuit
              </button>
            </div>
          </section>

          {/* Footer */}
          <footer className="mt-auto bg-[#0A2F5C] text-white py-8 px-4 sm:px-6 border-t-4 border-[#FFD23F]">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
              {/* Brand in Footer */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#FFD23F] border-2 border-white flex items-center justify-center text-[#0B3B6E]">
                  <SportIcon type="foot" className="w-5 h-5 text-[#0B3B6E]" />
                </div>
                <span
                  className="text-xl text-[#FFD23F] tracking-tight"
                  style={{
                    fontFamily: "'Arial Black', 'Impact', sans-serif",
                    fontWeight: 900,
                  }}
                >
                  PIKASPORT.COM
                </span>
              </div>

              {/* Social Media Links */}
              <div className="flex items-center gap-3">
                <span className="text-xs font-black uppercase text-[#FFD23F] mr-1">
                  Suivez-nous :
                </span>
                {['Facebook', 'X', 'TikTok', 'WhatsApp', 'Instagram', 'Snapchat'].map((network) => (
                  <button
                    key={network}
                    onClick={() =>
                      setActiveModal({
                        type: 'generic',
                        title: network,
                        content: `Retrouvez les dernières vidéos et gags PikaSport sur notre compte officiel ${network}.`,
                      })
                    }
                    className="w-9 h-9 rounded-full bg-[#FFD23F] hover:bg-yellow-300 text-[#0B3B6E] border-2 border-[#0B3B6E] flex items-center justify-center text-xs font-black shadow-xs transition-transform hover:scale-110"
                    title={network}
                  >
                    {network[0]}
                  </button>
                ))}
              </div>

              {/* Legal & Helper Links */}
              <div className="flex items-center gap-4 text-xs font-bold text-white/80">
                <button
                  onClick={() =>
                    setActiveModal({
                      type: 'generic',
                      title: 'Contact',
                      content: 'Service support PikaSport : contact@pikasport.com ou via l’onglet Service Client dans le menu de gauche.',
                    })
                  }
                  className="hover:text-[#FFD23F]"
                >
                  Contact
                </button>
                <span>•</span>
                <button
                  onClick={() =>
                    setActiveModal({
                      type: 'generic',
                      title: 'Mentions légales',
                      content: 'PikaSport est un projet de démonstration éditoriale et sportive avec génération de vidéos et médias par intelligence artificielle.',
                    })
                  }
                  className="hover:text-[#FFD23F]"
                >
                  Mentions légales
                </button>
                <span>•</span>
                <button
                  onClick={() =>
                    setActiveModal({
                      type: 'generic',
                      title: 'Aide & FAQ',
                      content: 'Des questions sur les vidéos IA, vos comptes ou les tournois ? Consultez notre guide en ligne ou rejoignez le forum.',
                    })
                  }
                  className="hover:text-[#FFD23F]"
                >
                  Aide
                </button>
              </div>
            </div>

            <div className="max-w-7xl mx-auto mt-6 pt-4 border-t border-white/10 text-center text-xs text-white/60 font-medium">
              Toutes les vidéos sont créées par intelligence artificielle. Maquette de présentation PikaSport.
            </div>
          </footer>
        </main>
      </div>

      {/* ========================================================= */}
      {/* INTERACTIVE MODALS                                        */}
      {/* ========================================================= */}
      {activeModal && (
        <div
          className="fixed inset-0 bg-[#051628]/70 z-50 flex items-center justify-center p-4 backdrop-blur-xs"
          onClick={() => setActiveModal(null)}
        >
          <div
            className="bg-white text-[#0B3B6E] rounded-3xl border-[3.5px] border-[#0B3B6E] w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative shadow-2xl animate-in fade-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            {/* Close Cross Button */}
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#FFD23F] text-[#0B3B6E] font-black text-xl flex items-center justify-center border-2 border-[#0B3B6E] hover:bg-yellow-400 transition-colors cursor-pointer"
              aria-label="Fermer"
            >
              ×
            </button>

            {/* Video Player Modal */}
            {activeModal.type === 'video' && (
              <div className="space-y-4">
                {/* Fake Video Player Screen */}
                <div className="bg-[#0A2F5C] rounded-2xl aspect-video w-full flex flex-col items-center justify-center text-white relative border-2 border-[#9FD3F2] overflow-hidden">
                  <div className="w-20 h-20 rounded-full bg-[#FFD23F] border-[3px] border-[#0B3B6E] flex items-center justify-center text-[#0B3B6E] shadow-xl hover:scale-105 cursor-pointer transition-transform">
                    <Play className="w-9 h-9 fill-[#0B3B6E] ml-1" />
                  </div>
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs font-bold text-white/90">
                    <span className="bg-[#0B3B6E]/80 px-2.5 py-1 rounded-md border border-white/20">
                      Lecteur de démonstration · Vidéo générée par IA
                    </span>
                    <span className="bg-[#FFD23F] text-[#0B3B6E] px-2 py-0.5 rounded font-black">
                      {DURATIONS[activeModal.contentIndex]}
                    </span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-black uppercase text-[#0E7A3E] bg-[#1FA85A]/15 px-2 py-0.5 rounded">
                      {SPORTS[activeModal.sportIndex].name}
                    </span>
                    <span className="text-xs font-bold text-[#0B3B6E]/70">
                      Format IA Sport • Haute définition
                    </span>
                  </div>
                  <h2
                    className="text-xl sm:text-2xl font-black text-[#0B3B6E]"
                    style={{
                      fontFamily: "'Arial Black', 'Impact', sans-serif",
                    }}
                  >
                    {VIDEO_TITLES[SPORTS[activeModal.sportIndex].id][activeModal.contentIndex]}
                  </h2>
                  <p className="text-sm text-[#0B3B6E]/80 mt-2 font-medium">
                    Ici s’affichera la vidéo interactive générée, avec ses analyses tactiques en temps réel, ses commentaires communautaires et la playlist des prochains gags ou highlights.
                  </p>
                </div>

                <div className="pt-3 border-t-2 border-[#9FD3F2] flex items-center justify-between">
                  <div className="text-xs font-bold text-[#0B3B6E]/70">
                    ❤️ 1 420 j’aimes • 💬 88 commentaires
                  </div>
                  <button
                    onClick={() => setActiveModal(null)}
                    className="px-5 py-2.5 bg-[#FFD23F] text-[#0B3B6E] font-black text-sm rounded-xl border-2 border-[#0B3B6E] hover:bg-yellow-400"
                  >
                    Fermer le lecteur
                  </button>
                </div>
              </div>
            )}

            {/* Login Modal */}
            {activeModal.type === 'login' && (
              <div className="space-y-4">
                <h2
                  className="text-2xl font-black text-[#0B3B6E]"
                  style={{
                    fontFamily: "'Arial Black', 'Impact', sans-serif",
                  }}
                >
                  Connexion à PikaSport
                </h2>
                <p className="text-sm text-[#0B3B6E]/80 font-medium">
                  Connectez-vous pour voter pour vos vidéos préférées et accéder aux salons privés.
                </p>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setActiveModal(null);
                  }}
                  className="space-y-3"
                >
                  <div>
                    <label className="block text-xs font-black uppercase mb-1">Adresse e-mail</label>
                    <input
                      type="email"
                      required
                      placeholder="nom@exemple.com"
                      className="w-full h-11 rounded-xl border-2 border-[#9FD3F2] bg-[#E6F5FD] px-3.5 font-medium text-sm focus:bg-white focus:border-[#0B3B6E] outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase mb-1">Mot de passe</label>
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      className="w-full h-11 rounded-xl border-2 border-[#9FD3F2] bg-[#E6F5FD] px-3.5 font-medium text-sm focus:bg-white focus:border-[#0B3B6E] outline-hidden"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full mt-4 py-3 bg-[#0E7A3E] hover:bg-[#1FA85A] text-white font-black text-sm rounded-xl border-2 border-[#0B3B6E] shadow-sm active:translate-y-0.5 transition-all"
                  >
                    Se connecter
                  </button>
                </form>
              </div>
            )}

            {/* Signup Modal */}
            {activeModal.type === 'signup' && (
              <div className="space-y-4">
                <h2
                  className="text-2xl font-black text-[#0B3B6E]"
                  style={{
                    fontFamily: "'Arial Black', 'Impact', sans-serif",
                  }}
                >
                  Créer mon compte gratuit
                </h2>
                <p className="text-sm text-[#0B3B6E]/80 font-medium">
                  Rejoignez la plus grande communauté de créations sportives par intelligence artificielle.
                </p>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setActiveModal(null);
                  }}
                  className="space-y-3"
                >
                  <div>
                    <label className="block text-xs font-black uppercase mb-1">Pseudo de supporter</label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Striker99"
                      className="w-full h-11 rounded-xl border-2 border-[#9FD3F2] bg-[#E6F5FD] px-3.5 font-medium text-sm focus:bg-white focus:border-[#0B3B6E] outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase mb-1">Adresse e-mail</label>
                    <input
                      type="email"
                      required
                      placeholder="nom@exemple.com"
                      className="w-full h-11 rounded-xl border-2 border-[#9FD3F2] bg-[#E6F5FD] px-3.5 font-medium text-sm focus:bg-white focus:border-[#0B3B6E] outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase mb-1">Mot de passe</label>
                    <input
                      type="password"
                      required
                      placeholder="Au moins 8 caractères"
                      className="w-full h-11 rounded-xl border-2 border-[#9FD3F2] bg-[#E6F5FD] px-3.5 font-medium text-sm focus:bg-white focus:border-[#0B3B6E] outline-hidden"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full mt-4 py-3 bg-[#0E7A3E] hover:bg-[#1FA85A] text-white font-black text-sm rounded-xl border-2 border-[#0B3B6E] shadow-sm active:translate-y-0.5 transition-all"
                  >
                    Rejoindre PikaSport
                  </button>
                </form>
              </div>
            )}

            {/* Search Modal */}
            {activeModal.type === 'search' && (
              <div className="space-y-4">
                <h2
                  className="text-2xl font-black text-[#0B3B6E]"
                  style={{
                    fontFamily: "'Arial Black', 'Impact', sans-serif",
                  }}
                >
                  Rechercher sur PikaSport
                </h2>
                <div className="relative">
                  <input
                    type="search"
                    autoFocus
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Ex: dunk, haka, smash, finale, gardien..."
                    className="w-full h-12 rounded-xl border-2 border-[#0B3B6E] bg-[#E6F5FD] px-4 font-semibold text-base focus:bg-white outline-hidden"
                  />
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-black uppercase text-[#0B3B6E]/70">
                    Suggestions populaires :
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {['Les plus beaux buts', 'Le haka des All Blacks', 'Touchdown top 10', 'Arrêt impossible hockey', 'Dunk anthologique'].map(
                      (item) => (
                        <button
                          key={item}
                          onClick={() => {
                            setSearchQuery(item);
                          }}
                          className="px-3 py-1.5 bg-[#E6F5FD] hover:bg-[#FFD23F] text-[#0B3B6E] border-2 border-[#9FD3F2] hover:border-[#0B3B6E] rounded-lg text-xs font-bold transition-colors cursor-pointer"
                        >
                          {item}
                        </button>
                      )
                    )}
                  </div>
                </div>

                <button
                  onClick={() => setActiveModal(null)}
                  className="mt-4 px-5 py-2.5 bg-[#FFD23F] text-[#0B3B6E] font-black text-sm rounded-xl border-2 border-[#0B3B6E] hover:bg-yellow-400"
                >
                  Valider
                </button>
              </div>
            )}

            {/* Download Modal */}
            {activeModal.type === 'download' && (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#0E7A3E] border border-[#0B3B6E]"></span>
                  <span className="text-xs font-black uppercase text-[#0E7A3E]">Options de téléchargement</span>
                </div>
                <h2
                  className="text-2xl sm:text-3xl font-black text-[#0B3B6E]"
                  style={{
                    fontFamily: "'Arial Black', 'Impact', sans-serif",
                  }}
                >
                  Télécharger votre projet PikaSport
                </h2>
                <p className="text-sm text-[#0B3B6E]/85 leading-relaxed font-medium">
                  Vous avez plusieurs manières simples d’exporter et de télécharger votre travail :
                </p>

                <div className="space-y-3 pt-1">
                  {/* Option 1: Direct HTML download */}
                  <div className="p-4 rounded-2xl bg-[#E6F5FD] border-2 border-[#0B3B6E] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-[#FFD23F] text-[#0B3B6E] text-xs font-black flex items-center justify-center border border-[#0B3B6E]">1</span>
                        <h4 className="font-extrabold text-[#0B3B6E] text-base">Fichier autonome HTML (.html)</h4>
                      </div>
                      <p className="text-xs text-[#0B3B6E]/80 mt-1 font-semibold">
                        Contient la maquette complète avec les onglets en Arial Black 16 et fonds mis en valeur. Ouvrable directement par double-clic dans n’importe quel navigateur sans installer de logiciel.
                      </p>
                    </div>
                    <a
                      href="/pikasport_maquette.html"
                      download="pikasport_maquette.html"
                      className="px-5 py-2.5 bg-[#0E7A3E] hover:bg-[#1FA85A] text-white font-black text-sm rounded-xl border-2 border-[#0B3B6E] flex items-center gap-2 shrink-0 shadow-xs"
                    >
                      <Download className="w-4 h-4" />
                      <span>Télécharger .HTML</span>
                    </a>
                  </div>

                  {/* Option 2: Project Export from AI Studio */}
                  <div className="p-4 rounded-2xl bg-white border-2 border-[#9FD3F2] shadow-2xs">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-[#FFD23F] text-[#0B3B6E] text-xs font-black flex items-center justify-center border border-[#0B3B6E]">2</span>
                      <h4 className="font-extrabold text-[#0B3B6E] text-base">Code source complet React + Vite (ZIP / GitHub)</h4>
                    </div>
                    <p className="text-xs text-[#0B3B6E]/80 mt-1 font-semibold">
                      Dans l’interface de <strong>Google AI Studio Build</strong> (en haut à droite de votre écran) :
                      cliquez sur le menu du projet (icône menu ou <strong>« ... »</strong>), puis choisissez <strong>« Download Code »</strong> ou <strong>« Export to GitHub »</strong> pour obtenir l'intégralité des fichiers sources (React, TypeScript, Tailwind).
                    </p>
                  </div>

                  {/* Option 3: Direct Link & Browser Save */}
                  <div className="p-4 rounded-2xl bg-white border-2 border-[#9FD3F2] shadow-2xs">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-[#FFD23F] text-[#0B3B6E] text-xs font-black flex items-center justify-center border border-[#0B3B6E]">3</span>
                      <h4 className="font-extrabold text-[#0B3B6E] text-base">Enregistrer la page web</h4>
                    </div>
                    <p className="text-xs text-[#0B3B6E]/80 mt-1 font-semibold">
                      Vous pouvez aussi appuyer sur <kbd className="px-1.5 py-0.5 rounded bg-slate-100 border text-[11px] font-mono">Ctrl + S</kbd> (ou <kbd className="px-1.5 py-0.5 rounded bg-slate-100 border text-[11px] font-mono">Cmd + S</kbd> sur Mac) dans votre navigateur pour enregistrer la page complète sur votre disque dur.
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t-2 border-[#9FD3F2] flex justify-end">
                  <button
                    onClick={() => setActiveModal(null)}
                    className="px-6 py-2.5 bg-[#FFD23F] hover:bg-yellow-400 text-[#0B3B6E] font-black text-sm rounded-xl border-2 border-[#0B3B6E] shadow-xs active:translate-y-0.5 transition-all"
                  >
                    Fermer
                  </button>
                </div>
              </div>
            )}

            {/* Generic Page Modal */}
            {activeModal.type === 'generic' && (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#1FA85A] border border-[#0B3B6E]"></span>
                  <span className="text-xs font-black uppercase text-[#1572C8]">Section PikaSport</span>
                </div>
                <h2
                  className="text-2xl sm:text-3xl font-black text-[#0B3B6E]"
                  style={{
                    fontFamily: "'Arial Black', 'Impact', sans-serif",
                  }}
                >
                  {activeModal.title}
                </h2>
                <p className="text-sm sm:text-base text-[#0B3B6E]/85 leading-relaxed font-medium">
                  {activeModal.content ||
                    `Bienvenue dans la rubrique « ${activeModal.title} » de PikaSport. Cette fenêtre est un exemple interactif pour la maquette.`}
                </p>

                <div className="pt-4 border-t-2 border-[#9FD3F2] flex justify-end">
                  <button
                    onClick={() => setActiveModal(null)}
                    className="px-6 py-2.5 bg-[#FFD23F] hover:bg-yellow-400 text-[#0B3B6E] font-black text-sm rounded-xl border-2 border-[#0B3B6E] shadow-xs active:translate-y-0.5 transition-all cursor-pointer"
                  >
                    D’accord
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
