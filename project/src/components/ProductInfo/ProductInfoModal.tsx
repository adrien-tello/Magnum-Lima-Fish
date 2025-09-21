import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Fish, Egg, Leaf, PiggyBank, Shield, Info, CheckCircle } from 'lucide-react';

type TabKey = 'volaille' | 'aquaculture' | 'ruminants' | 'porcs' | 'transversaux';

const tabs: { key: TabKey; label: string; Icon: React.ComponentType<{ className?: string }> }[] = [
  { key: 'volaille', label: 'Volaille', Icon: Egg },
  { key: 'aquaculture', label: 'Aquaculture', Icon: Fish },
  { key: 'ruminants', label: 'Ruminants', Icon: Leaf },
  { key: 'porcs', label: 'Porcs', Icon: PiggyBank },
  { key: 'transversaux', label: 'Transversaux', Icon: Shield },
];

export interface ProductInfoModalProps {
  open: boolean;
  onClose: () => void;
  defaultTab?: TabKey;
}

const logoUrl = 'https://raw.githubusercontent.com/adrien-tello/Magnum-Lima-Fish/main/project/src/logo/MOCK1.png';

const ProductInfoModal: React.FC<ProductInfoModalProps> = ({ open, onClose, defaultTab = 'aquaculture' }) => {
  const [tab, setTab] = React.useState<TabKey>(defaultTab);
  React.useEffect(() => setTab(defaultTab), [defaultTab]);

  const content = useMemo(() => ({
    volaille: (
      <div className="space-y-6">
        <Section title="Broilers Growth Booster">
          <Bullet text="Rôle : favoriser la croissance, réduire les diarrhées, améliorer l’absorption." />
          <Bullet text="Formule basée sur probiotiques, acides aminés, protéines, vitamines et minéraux." />
        </Section>
        <Section title="Layers Egg/Day">
          <Bullet text="Rôle : protéger la santé intestinale et améliorer la ponte." />
          <Bullet text="Approche probiotique + vitamines/minéraux." />
        </Section>
        <Section title="Anticoccidials">
          <Bullet text="Rôle : éliminer 100 % des coccidies sans résistance." />
          <Bullet text="Complexe phytogénique/antiprotozoaire (sans antibiotique)." />
        </Section>
      </div>
    ),
    aquaculture: (
      <div className="space-y-6">
        <Section title="Aquatic Animal Growth Promoter">
          <Bullet text="Probiotiques : équilibre de la flore intestinale." />
          <Bullet text="Acides aminés & protéines : croissance, immunité." />
          <Bullet text="Vitamines / minéraux : statut nutritionnel optimal." />
          <Bullet text="Poudre végétale fermentée : enzymes & métabolites (poudre noire)." />
        </Section>
        <Section title="Fish Growth Booster">
          <Bullet text="Fonction : santé du foie/vésicule biliaire, appétit, performance." />
        </Section>
      </div>
    ),
    ruminants: (
      <div className="space-y-6">
        <Section title="Ruminants Growth Booster">
          <Bullet text="Bacillus coagulans (1.0×10⁵ CFU/g)" />
          <Bullet text="Écorce de mandarine (15 %), Magnolia officinalis (25 %)" />
          <Bullet text="Malt (30 %), Levure de brasseur (15 %)" />
          <Bullet text="Usage : 1 kg pour 500 kg d’aliment." />
        </Section>
      </div>
    ),
    porcs: (
      <div className="space-y-6">
        <Section title="Pigs Growth Promoter (global)">
          <Bullet text="Probiotiques pour l’équilibre intestinal." />
          <Bullet text="Acides aminés & protéines, vitamines & minéraux." />
          <Bullet text="Poudre noire. Effets : digestion, croissance, reproduction, ↓ diarrhées." />
        </Section>
        <Section title="Pig Growth Booster (spécifique)">
          <Bullet text="Clostridium butyricum ≥ 2.0×10⁵ CFU/g" />
          <Bullet text="Peptide de trèfle (30 %), Extrait d’astragale (30 %)" />
          <Bullet text="Usage : 1 kg pour 500 kg d’aliment." />
        </Section>
      </div>
    ),
    transversaux: (
      <div className="space-y-6">
        <Section title="Mycotoxin Remover">
          <Bullet text="Fonction : absorber les mycotoxines, réparer les organes, améliorer l’immunité." />
        </Section>
        <Section title="Anti-Heat Stress">
          <Bullet text="Ingrédients : borneol, menthe, réglisse, acide citrique, vitamine C, etc." />
          <Bullet text="Usage : eau de boisson ou pulvérisation." />
        </Section>
      </div>
    ),
  }), []);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 40, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3 border-b bg-gradient-to-r from-green-50 to-blue-50">
              <div className="flex items-center gap-3">
                <img src={logoUrl} alt="Magnum-Lima Fish" className="w-8 h-8 rounded" />
                <div>
                  <div className="text-sm text-gray-600">Fiches produits par espèce</div>
                  <div className="font-semibold text-gray-900">Informations & usages</div>
                </div>
              </div>
              <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100">
                <X className="w-5 h-5 text-gray-700" />
              </button>
            </div>

            {/* Tabs */}
            <div className="px-5 pt-4">
              <div className="flex flex-wrap gap-2">
                {tabs.map(({ key, label, Icon }) => (
                  <button
                    key={key}
                    onClick={() => setTab(key)}
                    className={`px-3 py-1.5 rounded-full text-sm flex items-center gap-2 border transition-colors ${
                      tab === key ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white border-transparent' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-4 h-4" /> {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Body */}
            <div className="px-5 py-4 max-h-[65vh] overflow-y-auto">
              {content[tab]}
              <div className="mt-6 p-4 rounded-xl bg-gray-50 border border-gray-200 text-sm text-gray-700 flex items-center gap-2">
                <Info className="w-4 h-4 text-green-600" />
                <span>
                  Base commune : probiotiques + acides aminés/protéines + vitamines/minéraux. Spécificités selon l’espèce.
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="bg-white/70 border border-gray-200 rounded-xl p-4">
    <div className="flex items-center gap-2 mb-2">
      <CheckCircle className="w-4 h-4 text-green-600" />
      <h3 className="font-semibold text-gray-900">{title}</h3>
    </div>
    <div className="space-y-1.5">
      {children}
    </div>
  </div>
);

const Bullet: React.FC<{ text: string }> = ({ text }) => (
  <div className="flex items-start gap-2 text-gray-700">
    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-green-500" />
    <span className="whitespace-pre-line">{text}</span>
  </div>
);

export default ProductInfoModal;
